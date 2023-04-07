const Habit = require('../model/habit');

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


module.exports.home = async function(req, res){
    let habits = await Habit.find({}); 
    return res.render('home', {
        title : "Habit Tracker",
        habits : habits,
        weeklyDates : await getOneWeekDate()
        // userName : "Praduman"

    })
}