const day = document.querySelector('.days');
const hour = document.querySelector('.hours');
const minute = document.querySelector('.minutes');
const second = document.querySelector('.seconds');

function countdown() {
    const date = new Date('02/08/22');
    const today = new Date();

    const secondsTil = (date - today) / 1000;
    
    const days = Math.floor(secondsTil / 3600 / 24);
    const hours = Math.floor((secondsTil / 3600) % 24);
    const minutes = Math.floor((secondsTil / 60) % 60);
    const seconds = Math.floor(secondsTil % 60);

    day.innerText = days;
    hour.innerText = hours;
    minute.innerText = minutes;
    second.innerText = seconds;
    console.log(days, hours, minutes, seconds);
}

setInterval(countdown, 1000);