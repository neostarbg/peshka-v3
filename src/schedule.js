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

const getClass = (date, schedule) => {

    let group = 3;
    let lsgroup = window.localStorage.getItem("uni-group");

    if(lsgroup) {
        group = lsgroup;
    }

    scheudle
    let counter = 0;
    let day = date.getDay() % 7;

    const hour = date.getHours();

    const hourEven = hour - hour%2; // ex. 2PM: 14 - 0 = 14 ; 3PM: 15 - 1 = 14 

    let found = false;
    let data = undefined;
    while(!found) {

        const classes = schedule[day];    

        // Remove irrelevant to the group classes
        for(let i = 0; i < classes.length; i++) {
            let subject = classes[i];

            let subjectGroup = subject["Група"];
            // If a group is specified in the schedule and it's different from the user's group,
            // remove it
            if(subjectGroup > 0 && subjectGroup != group) {
                classes.splice(i, 1);
            }
        }

        // If this is true, then there are no (more) classes for the current day
        // Loop through future days and get the first class
        if(day != date.getDay()) { 
            if(classes.length > 0) {
                data = classes[0];
                data.day = day;
                found = true;
                break;
            }
        }

        for(let entry in classes) {            
            if (classes[entry].time >= hourEven) { 
                data = classes[entry];
                data.day = day;
                found = true;
                break;
            }
        }

        day = (day + 1) % 7;
        counter++;

        if (counter > 10) break;
    }

    return data;
}

module.exports.getCurrent = schedule => {

    const date = new Date();
    

    return getClass(date, schedule);
}

module.exports.getNext = (current, schedule) => {
    const date = new Date();

    let diff = current.day - date.getDay();

    if(diff < 0) {
        diff += 7;
    }

    date.setHours(current.time + 2 + 24*diff);
    date.setMinutes(0, 0, 0);
    
    return getClass(date, schedule);
}


// Format the time and day of current and next class in the Hero section in the home page
module.exports.localize = (current, next) => {
    // In case the days of the week are different (e.g. last class for the day), display the days of the week
    if (current.day != next.day) {
        
        format(current);
        format(next);
        
    }
}


// Private helper function to format current and next class individually
let format = cl => {
    let daysOfWeek = ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота"];
    let date = new Date();

    // Class is today
    if(cl.day == date.getDay()) {
        cl.time = `Днес в ${cl.time}`;
    }

    // Class is tomorrow
    else if(cl.day == date.getDay() + 1) {
        cl.time = `Утре в ${cl.time}`;
    }

    else {
        cl.time = `${daysOfWeek[cl.day]} в ${cl.time}`
    }
}

