// Main Server File. 

// Require the necessary stuff
const mongoose = require('mongoose')

const express = require('express')

const fileUpload = require('express-fileupload');

const expressSession = require('express-session');

const bodyParser = require('body-parser');

const flash = require('flash')
// Set up the app

const app = express()

// use middleware.
app.use(express.static('public'))

app.use(expressSession({
    secret:'binary',
    resave:true,
    saveUninitialized:true
}));

app.use(flash());//use flash

app.set('view engine','ejs');//set ejs as view engiene

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.use(fileUpload());

// Attach and use the logger middleware
const logger = require('./lib/logger')

app.use(logger)

// Set up port.

port = process.env.PORT || 3000

app.listen(port , ()=>{
    console.log(`app listening on port ${port}`)
})

// Attach the router
const router = require('./lib/router')
router(app)