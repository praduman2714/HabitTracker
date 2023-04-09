const mongoose = require('mongoose');


// UserSchema consist of the name, email, passowrd. 
// User has a relationship of one to many, with the habit. i.e one user can have multiple habits.

const userShema = new mongoose.Schema({
    name :{
        type : 'String',
        required : true
    },
    email : {
        type : 'String',
        require : true,
        unique : true
    },
    password : {
        type : 'String',
        require : true
    }
}, {
    timestamps: true
})

const User = mongoose.model("User" , userShema);
module.exports = User;