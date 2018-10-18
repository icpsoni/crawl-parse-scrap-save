//Importing required npm modules
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const request = require('request');
const mongoose = require('mongoose');
const ListingModel = require('./models/listing');

//loop to go through all 27 pages of listings
for (let i = 1; i <=27; i++) {
    //Dynamic URL generation for each page and parsing data from html using request
    request.get('https://www.carworkz.com/mumbai/regular-service?format=json&page=' + i, function(err, res){
        let apiRes = JSON.parse(res.body);
        // API listings are in ul tag
        let dom = new JSDOM("<ul>" + apiRes.listing + "</ul>");
        let listDoms = dom.window.document.querySelector("ul")
        
        //FOR EACH LISTING ON A PAGE
        listDoms.childNodes.forEach((node)=> {
            let name = node.querySelector('.head_title').innerHTML;
            let rating = node.querySelector('.number_rating').innerHTML;
            let authorized = node.querySelector('.authorized li').innerHTML;
            let yearExp = node.querySelector('.yrs_exp').innerHTML;
            let location = node.querySelector('.location_distance div span').innerHTML;
            
            //for all services for a listing
            let services = [];
            let jobsDom = node.querySelector('.list_jobs');
            jobsDom = new JSDOM("<div class='test'>"+ jobsDom.innerHTML + "</div>");
            jobsDom = jobsDom.window.document.querySelector('.test');
            jobsDom = new JSDOM ("<div class='test'>" + jobsDom.childNodes[2].innerHTML + "</div>");
            jobsDom = jobsDom.window.document.querySelector('.test');
            
            // loop for each service in a listing
            jobsDom.childNodes.forEach((sp)=> {
                if (sp.innerHTML){
                    let serv = sp.innerHTML;
                    serv = serv.replace(/\,/g,"");
                    //Pushing services on by one in array
                    services.push(serv);
                }
            });
            let data = {name: name, rating: rating, authorized: authorized, yearExp: yearExp, location: location, services: services}
            
            //Making new instance of model and saving data to it for each listing on page
            var myData = new ListingModel(data);
            myData.save((err, data) => {
                if (err) {
                  throw err;
                }
              });
        });
    })
}

//Connecting to mongodb which hosted on mlab
mongoose.connect(
    "mongodb://chandraprakash:welcome99@ds135653.mlab.com:35653/carworkz-assignment",
    err => {
      if (err) {
        return console.log("mongo err", err);
      }
      console.log("Connected to Database carworkz-assignment");
    }
);