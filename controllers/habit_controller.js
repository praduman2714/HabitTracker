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
     //console.log(req.user._id);
    

    try{
        //let user = await User.findById(req.user._id).populate();
        let habit = await Habit.findOne({content : req.body.habit, userRef : req.user._id}).populate();

        if(habit){
            //console.log("Habit exist");
            req.flash('error' , "Habit Exist!");
            return res.redirect('/');
        }else{
            let habit = await Habit.create({
                content : req.body.habit,
                userRef : req.user._id,
                dates : {date : await getTodayDate() , completed : "none"}
            });
            req.flash('success' , 'New Habit Created');
            return res.redirect('/');
        }

    }catch(err){
        console.log("Error in habit_controller** " + err);
    }
} 


// Status update for the habit, and the particular date also.

module.exports.toogleStatus = async function(req, res){
    //req.flash('success',  'Status of habit changed');
    let message ; // This variable is there for displayin the action explictly 
    try{
        let id = req.query.id;
        let date = req.query.date;
        // find the habit, with help of id;
        const habit = await Habit.findById(id);
        // if habit is not present then return, although this is very rear case. i.e bug in database.
        if(!habit){
            console.log("Habit is not present");
            return res.redirect('/');
        }else{
            let dates = habit.dates; // take out the date array of the habit.
            let found = false;
            // changes the complete argument accodingly.
            dates.find((item, index) =>{
                if(item.date == date){
                    if(item.complete === 'yes'){
                        item.complete = 'no';
                        message = 'Changed from done to undone'
                    }else if(item.complete === 'no'){
                        item.complete = 'none';
                        message = 'Not Done ---> Not Marked'
                    }else if(item.complete === 'none'){
                        item.complete = 'yes';
                        message = "You have completed your task"
                    }
                    found = true;
                }
            });
            req.flash('success' , message);
            // if the date is not found then we have to insert it into the dates array of habit,
            // this case will also not come , but still I took care of.
            if(!found) {
                dates.push({date : date, complete : 'yes'});
            }
            // at last save the dates.
            habit.dates = dates;
            const updateHabit = await habit.save();
            return res.redirect('/');
        }
    }catch(err){
        // If any error happesn then, this block will execute

        console.log("Error in toggling Status of the habit, " + err);
        return res.redirect('/');
    }

}

// Togglin Favourites
module.exports.toggleFavourite = async function(req, res){
   // req.flash('success', 'yeah favorite habit');
   let message;
    try{
        // find the habit with the help of id;
        let id = req.query.id;
        let habit = await Habit.findById(id);
        // if habit is not present, then we have to return back, although this will not occur
        if(!habit){
            console.log("Habit is not present");
            return res.redirect('/');
        }
        // if habit is presnet , then we have to toogle its favourite which is presnet in the schema of habit.
        let favourite = habit.favorite;
        if(favourite == true){
            message = "Habit removed from favourites"
            favourite = false;
        }else{
            message = "Habit added to favourites"
            favourite = true;
        }
        req.flash('success', message);
        habit.favorite = favourite;

        // After that we will save the chages made to the  habit 
        await habit.save();
        return res.redirect('/');
    }catch(err){
        console.log("Error in favourites toggleing " + err);
        return res.redirect('/');
    }
}
// This is for deleting the habit 
module.exports.removeHabit = async (req, res) => {
    try {
        // the controller will come to try block, and execute
        req.flash('success', 'Deleted habit successfully!');
        const id = req.query.id;
        const userId = req.user._id;
        // deleting the user, with the help of the id of habit, and user. 
        await Habit.deleteOne({
            _id: {
                $in: [id]
            },
            userRef: userId
        });
        return res.redirect('/');
    } catch (err) {
        // The controller will be in else block if some error is found.
        console.log("Error in deleting record(s)!", err);
        return res.redirect('/');
    }
}