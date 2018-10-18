# Carworkz-assignment
## How to run
1. Clone the directory
2. Do "npm install" in it to install all the dependencies.
 ```sh
 npm install
 ```
3. run "node server.js" to run the application on port 3000 (link : http://localhost:3000/search)
```sh
 node server.js
 ```
4. Here are all the endpoints
  - To search by multiple filters on listings "http://localhost:3000/search" method is POST, and body is
    {
     "name" : "",
     "rating" : "",
     "authorized" : "",
     "yearExp" : "",
     "location" : "",
     "services" : ""
    }
    all are optional you can filter your search as you want.
   - To search by one field
   Example to search by name is like : 
    Fields are

| Search Field | Link  |
| ------ | ------ |
| Name | http://localhost:3000/search/name/*any_name_here* |
| Rating | http://localhost:3000/search/rating/*rating_here* |
| Authorized | http://localhost:3000/search/authorized/*any_authorizer_name_here* |
| Experience | http://localhost:3000/search/yearExp/*any_experience_here* |
| Location | http://localhost:3000/search/location/*any_name_here* |
| Services | http://localhost:3000/search/services/*any_service_here* 

#### Links to Postman Collection and screenshots for help
  https://drive.google.com/open?id=1cbcweYE1gT22Ll_SXp5ayf9QpMcrs1xr

##### Scraping, parsing and saving data to mongodb database (Already done)
- index.js file is to scrap, parse and save data to mongodb hosted on mlabs that we don't need to scrap again.
