const Habit = require('../model/habit');

// This function is for providing the 7days date, which will be displayed afte the habit is created.
function getOneWeekDate(){
    let dates = [];
    for(let i = 0; i<7 ; i++){
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + i);
        let mm = currentDate.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        let dd = currentDate.getDate();
        if (dd < 10) dd = '0' + dd;
        const yyyy = currentDate.getFullYear();
        dates.push(dd + '/' + mm + '/' + yyyy)
    }
    return dates
}

// This is what I had send to the home page, as variabe, habits are the list of habit, from the database,
// weeklyDates are the list of 7 dates, from the the day of habit creation.
module.exports.home = async function(req, res){
    //console.log(req.user);
    if(req.user){
        let habits = await Habit.find({userRef: req.user._id}); 
        return res.render('home', {
            title : "Habit Tracker",
            habits : habits,
            weeklyDates : await getOneWeekDate()
            // userName : "Praduman"

        })
    }else{
        return res.redirect('/users/sign-in');
    }
    
}