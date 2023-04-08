const mongoose = require('mongoose');
const dbb = 'mongodb+srv://whiteWolf:praduman@cluster0.vji2hj2.mongodb.net/habitTracker?retryWrites=true&w=majority'
mongoose.connect(dbb).then(()=>{
    console.log('connection successful');
}).catch((err) => console.log("no connection " + err));

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open',  function(){
     console.log('Connected to Database :: MongoDB');
});


module.exports = db; 