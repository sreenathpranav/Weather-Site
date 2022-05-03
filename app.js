const { response } = require("express");
const express= require("express");
const https=require("https");

const app= express();

const bodyParser= require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

})

app.post("/",function(req,res){
    const query= req.body.cityName;
    const apiKey= "d617121dd3052cc6e3333eeb7f9f9233";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    
    https.get(url,function(response){
      
    
        response.on("data",function(data){
            const weatherData= JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription= weatherData.weather[0].description;
            const icon= weatherData.weather[0].icon;
            const imageURL= "http://openweathermap.org/img/wn/10d@2x.png";
    
            res.write("<h1>The temperature in "+query+ " is " + temp + " degree Celcius.</h1>");
            res.write("<p>The weather is currently "+weatherDescription+"</p>");
            res.write("<img src="+ imageURL+">");
            res.send();
        })
    })
    
})



app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000.");
})