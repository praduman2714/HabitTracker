const Habit = require('../model/habit');
const User = require('../model/user');

// this fucntion will return the current data, which will helpful for getting the range of dates
function getTodayDate(){
    var today = new Date();
    let date = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    let fullDate = date + "/" + month + "/" + year;
    return fullDate;
}

// This function is for creating the new habit of the particular user/
// Since the habit is of user, so the router for this is made in the user.js 
// Habit is exclusive of user.
module.exports.createHabit = async function(req, res){
    // console.log(req.body);

    try{
        let user = await User.findById(req.user._id).populate();
        let habit = await Habit.findOne({content : req.body.habit, userRef : req.user._id}).populate();

        if(habit){
            console.log("Habit exist");
            return res.redirect('back');
        }else{
            let habit = await Habit.create({
                content : req.body.habit,
                userRef : req.user._id,
                dates : {date : await getTodayDate() , completed : "none"}
            });
            return res.redirect('back');
        }

    }catch(err){
        console.log("Error in habit_controller** " + err);
    }
} 


// Status update for the habit, and the particular date also.

module.exports.toogleStatus = async function(req, res){
    try{
        let id = req.query.id;
        let date = req.query.date;
        // find the habit, with help of id;
        const habit = await Habit.findById(id);
        // if habit is not present then return, although this is very rear case. i.e bug in database.
        if(!habit){
            console.log("Habit is not present");
            return res.redirect('back');
        }else{
            let dates = habit.dates; // take out the date array of the habit.
            let found = false;
            // changes the complete argument accodingly.
            dates.find((item, index) =>{
                if(item.date == date){
                    if(item.complete === 'yes'){
                        item.complete = 'no';
                    }else if(item.complete === 'no'){
                        item.complete = 'none';
                    }else{
                        item.complete = 'yes';
                    }
                    found = true;
                }
            });
            // if the date is not found then we have to insert it into the dates array of habit,
            // this case will also not come , but still I took care of.
            if(!found) {
                dates.push({date : date, complete : 'yes'});
            }
            // at last save the dates.
            habit.dates = dates;
            const updateHabit = await habit.save();
            return res.redirect('back');
        }
    }catch(err){
        // If any error happesn then, this block will execute

        console.log("Error in toggling Status of the habit, " + err);
        return res.redirect('back');
    }

}

// Togglin Favourites
module.exports.toggleFavourite = async function(req, res){
    try{
        // find the habit with the help of id;
        let id = req.query.id;
        let habit = await Habit.findById(id);
        // if habit is not present, then we have to return back, although this will not occur
        if(!habit){
            console.log("Habit is not present");
            return res.redirect('back');
        }
        // if habit is presnet , then we have to toogle its favourite which is presnet in the schema of habit.
        let favourite = habit.favorite;
        if(favourite == true){
            favourite = false;
        }else{
            favourite = true;
        }
        habit.favorite = favourite;

        // After that we will save the chages made to the  habit 
        await habit.save();
        return res.redirect('back');
    }catch(err){
        console.log("Error in favourites toggleing " + err);
        return res.redirect('back');
    }
}

module.exports.removeHabit = async function(req, res){
    try{
        let id = req.query._id;
        await Habit.deleteOne(id);
        return res.redirect('back');
    }catch(err){
        console.log("Error in deleiting the habit " + err);
        return res.redirect('back');
    }

}