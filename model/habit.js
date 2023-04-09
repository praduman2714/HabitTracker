const mongoose = require('mongoose');

// This is the habit Schema, it constins the content of the habit, and habit is associated with user.
// It is forming the one to many relationship with the user.
// It also cnstainst date, on which the user created habit.
// It also cotainse, favorite , it will simply say wheter that Habit is users fav or not.
const HabitSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dates: [{
        date: String,
        complete: String
    }],
    favorite: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Habit = mongoose.model('Habit', HabitSchema);

module.exports = Habit;
