const getFromJson = () => {
    return new Promise(async (resolve, reject) => {
        let schedule;
        await fetch("/schedule5.json").then(res => res.json()).then(json => {
            schedule = json;
        })

        resolve(schedule); 
    })
}
module.exports.getSchedule = getFromJson;

module.exports.getClasses = async schedule => {
    
    let date = new Date();

    let group = 3;
    let lsgroup = window.localStorage.getItem("uni-group");

    if(lsgroup) {
        group = lsgroup;
    }

    group = parseInt(group);

    let classes = [[]];

    // Filter out all the classes that are irrelevant to the group
    for(let i = 0; i < schedule.length; i++) {
        
        // For each day add an empty array to store the classes for that day
        classes.push([])
        for(let j = 0; j < schedule[i].length; j++) {
            if(schedule[i][j]["Група"] === 0 || schedule[i][j]["Група"] === group) {
                classes[i].push(schedule[i][j]);
            }
        }
    }

    let current;
    let next;

    let hours = Math.floor(date.getHours()/2)*2; // Get hours rounded down to the nearest even number. E.g 13 -> 12;  10 -> 10

    // Loop for a week, starting at the given date's day
    for(let i = date.getDay(); i < date.getDay()+7; i++) {
        let day = i % 7;

        for(let j = 0; j < classes[day].length; j++) {
            if(date.getDay() === day && classes[day][j]["time"] < hours) continue; // The class is in the past

            if(!current) {
                current = classes[day][j];
                continue;
            }

            if(!next) {
                next = classes[day][j];
                continue;
            }

            break;
        }
    }

    return {current: current, next: next};
}

// Format the time and day of current and next class in the Hero section in the home page
module.exports.localize = (current, next) => {
    // In case the days of the week are different (e.g. last class for the day), display the days of the week

    if (current["Ден"] != next["Ден"]) {

        format(current);
        format(next);
        
    }
}

// Private helper function to format current and next class individually
let format = cl => {
    let daysOfWeek = ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота"];
    let date = new Date();

    let day = daysOfWeek.findIndex(el => el === cl["Ден"]);
    // Class is today
    if(day == date.getDay()) {
        cl.time = `Днес в ${cl.time}`;
    }

    // Class is tomorrow
    else if(day == date.getDay() + 1) {
        cl.time = `Утре в ${cl.time}`;
    }

    else {
        cl.time = `${cl["Ден"]} в ${cl.time}`
    }
}
