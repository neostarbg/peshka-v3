/**
 * Fetch the schedule json file. 
 * @return {Promise}     Upon resolve, returns the parsed JSON Object
 */
module.exports.getSchedule = () => {
    return new Promise(async (resolve, reject) => {
        let schedule;
        await fetch("/schedule7.json").then(res => res.json()).then(json => {
            schedule = json;
        })

        resolve(schedule); 
    })
}

/**
 * Get the number of the week in year
 * @param {Date} date  The date to get the week of
 */
const getWeekOfYear = date => {
    let onejan = new Date(date.getFullYear(), 0, 1);
    return Math.ceil((((date - onejan) / 86400000) + onejan.getDay()+1)/7);
}

const getWeek = () => {

    let date = new Date();

    // Offset to be manually tweaked to adjust week of term
    const weekOffset = 0;
    return (getWeekOfYear(date) + weekOffset) % 2 + 1;
}

module.exports.getWeekLocalized = () => {
    const week = getWeek();

    if(week === 1) {
        return "1, 3"
    } else if (week === 2) {
        return "2, 4"
    } else {
        return "Грешна";
    }
}

/**
 * Get the next two classes from the schedule
 * @param {Object} schedule The schedule object
 * @return {Object}         The current and next class in an object
 */
module.exports.getClasses = async schedule => {

    let date = new Date();
    const week = getWeek();

    let group = 3;
    let lsgroup = window.localStorage.getItem("uni-group");

    if(lsgroup) {
        group = lsgroup;
    }

    group = parseInt(group);

    let classes = [[]];

    // Filter out all the classes that are irrelevant to the group and week
    for(let i = 0; i < schedule.length; i++) {
        
        // For each day add an empty array to store the classes for that day
        classes.push([])
        for(let j = 0; j < schedule[i].length; j++) {
            if(schedule[i][j]["Група"] === 0 || schedule[i][j]["Група"] === group) {
                if(schedule[i][j]["Седмица"] === week || schedule[i][j]["Седмица"] === 0) {
                    classes[i].push(schedule[i][j]);
                }
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

/**
 * Format the time and day of current and next class in the Hero section in the home page
 * @param {Object} current The current class as an object
 * @param {Object} next    The next class as an object
 */
module.exports.localize = (current, next) => {
    // In case the days of the week are different from today, display the days of the week
    let daysOfWeek = ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота"];
    let date = new Date();

    current["daya"] = daysOfWeek.findIndex(el => el === current["Ден"]);
    next["daya"] = daysOfWeek.findIndex(el => el === next["Ден"]);
    
    if (current["daya"] != date.getDay() || next["daya"] != date.getDay()) {
        format(current, date);
        format(next, date);
    }
}

/**
 * Private helper function to format current and next class individually
 * @param {Object} cl the class object
 * @param {Date} date a date to check the day of week from
 */
let format = (cl, date) => {
    
    // Class is today
    if(cl["daya"] == date.getDay()) {
        cl.time = `Днес в ${cl.time}`;
    }

    // Class is tomorrow
    else if(cl["daya"] == date.getDay() + 1) {
        cl.time = `Утре в ${cl.time}`;
    }

    else {
        cl.time = `${cl["Ден"]} в ${cl.time}`
    }
}
