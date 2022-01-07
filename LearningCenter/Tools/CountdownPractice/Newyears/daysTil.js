const day = document.querySelector('.days');
const hour = document.querySelector('.hours');
const minute = document.querySelector('.minutes');
const second = document.querySelector('.seconds');

function count() {

    const nYe = new Date("1/1/2022");
    const dayToday = new Date();
    const secondsBetween = (nYe - dayToday) / 1000;

    const days = Math.floor(secondsBetween / 3600 / 24); 
    const hours = Math.floor((secondsBetween / 3600) % 24); 
    const minutes = Math.floor((secondsBetween / 60) % 60); 
    const seconds = Math.floor(secondsBetween % 60);

    day.innerText = days;
    hour.innerText = hours;
    minute.innerText = minutes;
    second.innerText = seconds;

    console.log(days, hours, minutes, seconds)
}

count()

setInterval(count, 1000);











// LOGIC 





// const millisBetween = nYe - dayToday;
// const secondsBetween = (nYe - new Date()) / 1000;
// const minutesBetween = secondsBetween / 60;
// const hoursBetween1 = minutesBetween / 60;
// const daysBetween1 = hoursBetween/ 24;

// const millisInnaDay = 1000 * 60 * 60 * 24; /* 86,400,000 */ 
// const secondsInnaDay = 60 * 60 * 24; /* 86,400 */
// const minutesInnaDay = 60 * 24; /* 1,440 */
// const hoursInnaDay = 24;

// const secondsInnaHour = 60 * 60; /* 3600 */ 

/*
    seconds in a hour
    divide by hours in a day 
    floor it to shave any hours remaining
*/


/*
    seconds in a hour to get hours until 
    then divide by hours in a day
    modulus operater returns remainder = the final hours
*/

/* seconds until zero hour...
   divide by 60(seconds in a minute) to get minutes until zero hour;
   divide by 60(minutes in a hour) to get hours until zero hour..
   take the remainder of all hours leading to it and that is minutes until zero hour
*/ 



// console.log(nYe);
// console.log(dayToday);
// console.log(millisBetween);
// console.log(secondsBetween);
// console.log(minutesBetween);