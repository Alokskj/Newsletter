const express = require("express");
const request = require("request");
const path = require("path");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, '/public')));
// app.use(express.static("public/css"));
// app.use(express.static("public/images"));


app.listen( process.env.PORT  || 3000, function(){
    console.log("server is running at port 3000");
})


app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/public/signup.html"));
})

app.post("/", function(req , res){
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;
    res.sendFile(path.join(__dirname, "/public/success.html"));
    console.log(firstName, lastName, email);

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    }

   const JsonData = JSON.stringify(data);

   const url = " https://us21.api.mailchimp.com/3.0/lists/72d30bcbec"
   const options = {
    method: "POST",
    auth: "alokskj:3a9411dcb080d76cc3e70e584de087e8-us21",
   }

   const request = https.request(url , options, function(response){
    response.on("data", function(data){
        console.log(JSON.parse(data));
    })

    
})

request.write(JsonData);
request.end();

    
})



// 02eb1db4976985834b22027e80112e0a-us21
// 72d30bcbec