const mongoose = require('mongoose');
const dbb = 'mongodb+srv://whiteWolff:praduman@cluster0.an8uy3k.mongodb.net/habittTracker?retryWrites=true&w=majority'
mongoose.connect(dbb).then(()=>{
    console.log('connection successful');
}).catch((err) => console.log("no connection " + err));

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open',  function(){
     console.log('Connected to Database :: MongoDB');
});

 
module.exports = db;  