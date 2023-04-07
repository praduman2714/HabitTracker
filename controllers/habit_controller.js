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

        const habit = await Habit.findById(id);
        if(!habit){
            console.log("Habit is not present");
            return res.redirect('back');
        }else{
            let dates = habit.dates;
            let found = false;
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
            if(!found) {
                dates.push({date : date, complete : 'yes'});
            }
            habit.dates = dates;
            const updateHabit = await habit.save();
            return res.redirect('back');
        }
    }catch(err){
        console.log("Error in toggling Status of the habit, " + err);
        return 
    }

}