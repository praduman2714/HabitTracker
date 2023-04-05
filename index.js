const http = require('http');
const express = require('express'); // requeiring express
const port = 8000; // assigning the port, for running in local computer
const expressLayout=require('express-ejs-layouts');
const app = express();
const db = require('./config/moongoose'); // require the database

// Setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(expressLayout);
// app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('./assets'));


app.use('/' , require('./routes/index')); // middleware for router

app.listen(port, function(err){
    if(err){
        console.log(err );
        return ;
    }
    
    console.log(`Server is up and running in port ${port}`);
})