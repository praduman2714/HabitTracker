// console.log('Hello');

let weeklyContainer = document.querySelectorAll(".weekly__container");

function showDailyData(){
    // console.log("Clicked in daily")
    for(let singleClass of weeklyContainer){
        singleClass.style.display = "none";
    }
}

function showWeeklyData(){
    // console.log("clisked on weekly")
    for(let singleClass of weeklyContainer){
        singleClass.style.display = "flex";
    }
}