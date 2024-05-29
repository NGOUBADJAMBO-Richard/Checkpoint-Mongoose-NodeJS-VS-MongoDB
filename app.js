
const express = require('express');
var mongoose = require('mongoose');
var app = express();

//environment variables
require(dotenv).config();

//database connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true});
const connection = mongoose.connection;
connection.once(open, () => {

    console.log('Connected Database Successfully');

    });
    app.listen(3000,function(req,res){
    console.log('Server is started on port 3000');
    });

