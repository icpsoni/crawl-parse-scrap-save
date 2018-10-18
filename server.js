//requiring all required npm modules
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
//importing Model
const ListingModel = require('./models/listing');

//Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Defining routes

//Route for GET - search by name
app.get("/search/name/:name", (req, res) => {
    ListingModel.find({ "name" : { $regex: req.params.name, $options: 'i' } }, (err, result) => {
        if (err) {
          throw err;
        } else {
            console.log(result);
        res.json(result);
        }
    });
});

//Route for GET - search by rating
app.get("/search/rating/:rating", (req, res) => {
ListingModel.find({ "rating" : req.params.rating }, (err, result) => {
    if (err) {
        throw err;
    } else {
        console.log(result);
    res.json(result);
    }
    });
});

//Route for GET - search by authorization
app.get("/search/authorized/:authorized", (req, res) => {
ListingModel.find({ "authorized" : { $regex: req.params.authorized, $options: 'i' } }, (err, result) => {
    if (err) {
        throw err;
    } else {
        console.log(result);
    res.json(result);
    }
    });
});

//Route for GET - search by years of experience
app.get("/search/yearexp/:yearExp", (req, res) => {
ListingModel.find({ "yearExp" : { $regex: req.params.yearExp, $options: 'i' } }, (err, result) => {
    if (err) {
        throw err;
    } else {
        console.log(result);
    res.json(result);
    }
    });
});

//Route for GET - search by location
app.get("/search/location/:location", (req, res) => {
ListingModel.find({ "location" : { $regex: req.params.location, $options: 'i' } }, (err, result) => {
    if (err) {
        throw err;
    } else {
        console.log(result);
    res.json(result);
    }
    });
});

//Route for GET - search by services
app.get("/search/services/:services", (req, res) => {
ListingModel.find({ "services" : { $regex: req.params.services, $options: 'i' } }, (err, result) => {
    if (err) {
        throw err;
    } else {
        console.log(result);
    res.json(result);
    }
    });
});

//Route for Search my multiple optional values
app.post("/search", (req, res) => {
    //Condition if name is there or not
    if(req.body.name){
        name = req.body.name;
    }
    else{
        name = "";
    }

    //Condition if authorization is there or not
    if(req.body.authorized){
        authorized = req.body.authorized;
    }
    else{
        authorized = "";
    }

    //Condition if year of experience is there or not
    if(req.body.yearExp){
        yearExp = req.body.yearExp;
    }
    else{
        yearExp = "";
    }

    //Condition if location is there or not
    if(req.body.location){
        location = req.body.location;
    }
    else{
        location = "";
    }

    //Condition if services is there or not
    if(req.body.services){
        services = req.body.services;
    }
    else{
        services = "";
    }

    //Condition if rating is there or not
    if(req.body.rating){
        rating = req.body.rating;
        ListingModel.find({ "name" : { $regex: name, $options: 'i' }, 
            rating: rating, 
            "authorized" : { $regex: authorized, $options: 'i' },
            "yearExp" : { $regex: yearExp, $options: 'i' }, 
            "location" : { $regex: location, $options: 'i' },
            "services" : { $regex: services, $options: 'i' }}, (err, result) => {
            if (err) {
                throw err;
            } else {
                // console.log(result);
            res.json(result);
            }
        });
    }
    else{
        ListingModel.find({ "name" : { $regex: name, $options: 'i' },
            "authorized" : { $regex: authorized, $options: 'i' },
            "yearExp" : { $regex: yearExp, $options: 'i' }, 
            "location" : { $regex: location, $options: 'i' },
            "services" : { $regex: services, $options: 'i' }}, (err, result) => {
            if (err) {
                throw err;
            } else {
                // console.log(result);
            res.json(result);
            }
        });
    }     
})

//Connecting to Database which is hosted ion mlabs
mongoose.connect(
    "mongodb://chandraprakash:welcome99@ds135653.mlab.com:35653/carworkz-assignment",
    err => {
      if (err) {
        return console.log("mongo err", err);
      }
      console.log("Connected to Database carworkz-assignment");
    }
  );

//Starting Server on port 3000
var port = 3000;
app.listen(port, (err, res) => {
  if (err) throw err;
  console.log("Listening at port:", port);
});
