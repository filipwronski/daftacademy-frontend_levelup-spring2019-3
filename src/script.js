function* timeGenerator(start, initValue = 0, max = 60) {
    let time = initValue;
    while(time < max) {
        yield time++;
        if(time === max) {
            time = start;
        }
    }
}

const format = (val) => val.toString().padStart(2, '0');

const renderClock = (val) => {
    document.getElementById('clock').innerText = val
}

const startClock = (second = 55, minute = 59, hour = 11) => {
    const secondGenerator = timeGenerator(0, second, 60);
    const minuteGenerator = timeGenerator(0, minute, 60);
    const hourGenerator = timeGenerator(1, hour, 13);

    second = secondGenerator.next().value;
    minute = minuteGenerator.next().value;
    hour = hourGenerator.next().value;
    
    setInterval (() => {
        if (minute === 59 && second === 59) {
            hour = hourGenerator.next().value;
        }

        if (second === 59) {
            minute = minuteGenerator.next().value;
        }
        
        second = secondGenerator.next().value;
        
        renderClock(`${ format(hour) }:${ format(minute) }:${ format(second) }`);
    },1000);
}

const getCurrentTime = () => {
    const now = new Date();
    const hour = (now.getHours() + 24) % 12 || 12;
    const minute = now.getMinutes();
    const second = now.getSeconds();
    return {hour, minute, second};
}

const currentTime = getCurrentTime();
startClock(currentTime.second, currentTime.minute, currentTime.hour);
