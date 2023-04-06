const mongoose = require('mongoose');

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