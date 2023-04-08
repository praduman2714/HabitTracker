const http = require('http');
const express = require('express'); // requeiring express
const bodyParser = require('body-parser');
const port =  8000; // assigning the port, for running in local computer
const expressLayout=require('express-ejs-layouts');
const app = express();
// require the connect flash, to show the notification in flash msgs
// they are used for showing action notifications
const flash = require('connect-flash'); 
const flashMiddleWare = require('./config/flashMiddleware');

const db = require('./config/moongoose'); // require the database

// used for session cookies
const session = require("express-session");
const passport = require('passport');
const passportLocal = require('./config/passport_local');

// Setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(expressLayout);
app.use(bodyParser.urlencoded({extended:false})); // since express does not have bodyPaser with it, so we have to download , and use it as middle ware

app.use(express.static('./assets'));

//mongo store is used to store the session cookie
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: "habitTracker",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

// Using passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Using Connect flash
app.use(flash());
app.use(flashMiddleWare.setFlash);

app.use('/' , require('./routes/index')); // middleware for router

// directing the app in the given port
app.listen(port, function(err){
    if(err){
        console.log(err );
        return ;
    }
    
    console.log(`Server is up and running in port ${port}`);
})