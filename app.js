const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({path:'./config.env'});
require('./db/connect');
const User = require('./models/userSchema');


app.use(express.json());


// router files linked
app.use(require('./router/route'));
const POST = process.env.PORT || 4000;

app.get('/', (req, res)=>{
    res.send(`hello kuldeep`)
})

// app.get('/about', (req, res)=>{
//     res.cookie('mycookie', 'kuldeep')
//     res.send(`hello kuldeep its about page`)
    
// })

app.get('/contact', (req, res)=>{
    res.send(`hello kuldeep its contact page`)
})

app.get('/signin', (req, res)=>{
    res.send(`hello kuldeep its login page`)
})

app.get('/signup', (req, res)=>{
    res.send(`hello kuldeep registration page`)
})

if(process.env.NODE_ENV == 'production'){
    app.use(express.static('frontend/build'));
}

app.listen(PORT, ()=>{
    console.log("server running")
})