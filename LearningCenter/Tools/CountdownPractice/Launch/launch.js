const day = document.querySelector('.day');
const hour = document.querySelector('.hour');
const minute = document.querySelector('.minute');
const second = document.querySelector('.second');

const launch = "02/22/22";

function getDaysTil(date) {
    const dayToday = new Date();
    const launchDay = new Date(date);

    const daysTilLaunch = launchDay - dayToday;
    const secondsTil = daysTilLaunch / 1000;

    const days = Math.floor(secondsTil / 3600 / 24);
    const hours = Math.floor((secondsTil / 3600) % 24);
    const minutes = Math.floor((secondsTil / 60) % 60);
    const seconds = Math.floor(secondsTil % 60);

    day.innerText = days;
    hour.innerText = hours;
    minute.innerText = minutes;
    second.innerText = seconds;

    countdown();
}

window.addEventListener("load", countdown);

function countdown() {
    setInterval(() => {
        getDaysTil(launch);
    }, 1000);
}




