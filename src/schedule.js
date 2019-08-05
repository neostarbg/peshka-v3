const getFromJson = () => {
    return new Promise(async (resolve, reject) => {
        await fetch("/schedule.json").then(res => res.json()).then(json => {
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
    const min = date.getMinutes();

    const hourEven = hour - hour%2; // ex. 2PM: 14 - 0 = 14 ; 3PM: 15 - 1 = 14


    let found = false;
    let data = undefined;
    while(!found) {
        const classes = schedule.data[day];    
        for(let entry in classes) {
            if (classes[entry].time >= hourEven) {
                data = classes[entry];
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

module.exports.getNext = () => {
    const date = new Date() 
    date.setHours(date.getHours() + 2);

    return getClass(date);
}

