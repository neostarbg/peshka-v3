const getFromJson = () => {
    return new Promise(async (resolve, reject) => {
        await fetch("/schedule4.json").then(res => res.json()).then(json => {
            schedule = json;
        })

        resolve();
    })
}

let schedule = undefined;

const getClass = async (date) => {

    if(!schedule) {
        await getFromJson();
    }
    
    let counter = 0;
    let day = date.getDay() % 7;

    const hour = date.getHours();

    const hourEven = hour - hour%2; // ex. 2PM: 14 - 0 = 14 ; 3PM: 15 - 1 = 14 

    let found = false;
    let data = undefined;
    while(!found) {

        const classes = schedule[day];    

        console.log(classes);

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

        day++;
        counter++;

        if (counter > 10) break;
    }

    return data;
}

module.exports.getCurrent = () => {

    const date = new Date();
    

    return getClass(date);
}

module.exports.getNext = (current) => {

    const date = new Date();
    if (date.getDay() !== current.day) {
        // Current class is today
        
        let diff = current.day - date.getDay();

        if(diff < 0) {
            diff += 7;
        }

        date.setHours(current.time + 2 + 24*diff);
    } else {
        date.setHours(current.time + 2);
    }
    

    console.log(date);

    return getClass(date);
}


// Localize (format) the time and day of current and next class in the Hero section in the home page
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

