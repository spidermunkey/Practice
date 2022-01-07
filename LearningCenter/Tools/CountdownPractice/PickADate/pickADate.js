// TODO 

    // ADD & STYLE BUTTON

    // ADD CLICK LISTENER TO BUTTON
    // ON CLICK CHECK FOR VALID FORMAT
    // IF VALID FORMAT PUSH DATE INTO COUNTDOWN
    // DISPLAY DATE 
    // SET INTERVAL

    // ADD ANIMATION FOR ZERO HOUR 
    // ON ZERO OUR ADD RESET BUTTON / CHOOSE ANOTHER DATE 

const btnDate = document.getElementById('date-btn');
const inpDate = document.getElementById('date-inp');

const day = document.querySelector('.day');
const hour = document.querySelector('.hour');
const minute = document.querySelector('.minute');
const second = document.querySelector('.second');

btnDate.addEventListener('click', () => {
    btnDate.classList.toggle('on');
    inpDate.classList.toggle('off');

})

inpDate.addEventListener('focus', () => {
    btnDate.innerText = 'Enter';
    btnDate.addEventListener('click', submitDate);
});
inpDate.addEventListener('blur', () => {
    btnDate.innerText = 'Choose date';
});

function updateUI() {
    
}
let intv;

function submitDate() {
    clearInterval(intv);
    const val = inpDate.value;
    console.log(val);
    function str() { countdown(val)};
    intv = setInterval(str, 1000);
    btnDate.removeEventListener('click', submitDate);
    updateUI();
    inpDate.value = '';
}

function countdown(date) {
    const dateEntered = new Date(date);
    const today = new Date();

    const secondsTil = (dateEntered - today) / 1000;
    
    const days = Math.floor(secondsTil / 3600 / 24);
    const hours = Math.floor((secondsTil / 3600) % 24);
    const minutes = Math.floor((secondsTil / 60) % 60);
    const seconds = Math.floor(secondsTil % 60);

    day.innerText = days;
    hour.innerText = hours;
    minute.innerText = minutes;
    second.innerText = seconds;
    
}

