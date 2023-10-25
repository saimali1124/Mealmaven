const mongoose = require('mongoose');
const express = require('express')
const app = express();

//const uri= "mongodb+srv://saimali:brotherhood@cluster0.etcwjlk.mongodb.net/MealMaven?retryWrites=true&w=majority";
const uri = "mongodb://127.0.0.1:27017/local";

mongoose.connect(uri, {
    
}).then(()=> {
    console.log("Connection successful");
}).catch((err)=> console.log("No conn"));

