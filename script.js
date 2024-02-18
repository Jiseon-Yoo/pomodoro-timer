const semicircles = document.querySelectorAll('.semicircle');
const timer = document.querySelector('.timer');
const input = document.getElementById('minute-input');
const btn_start = document.querySelector('.btn-start');
const btn_pause = document.querySelector('.btn-pause');
const btn_reset = document.querySelector('.btn-reset');

let setTime = 0;
let futureTime = 0;
let timerLoop = null;
let isPaused = false;

setDefaultTimer();

//format number to display 00:00
function formatNumber(num) {
    return num.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
}

function displayTime(mins, secs) {
    const formattedMins = formatNumber(mins);
    const formattedSecs = formatNumber(secs);
    timer.innerHTML =  `
        <div>${formattedMins}</div>
        <div class="colon">:</div>
        <div>${formattedSecs}</div>
        `;
}

function setDefaultTimer() {
    for (let i = 0; i < semicircles.length; i++) {
        semicircles[i].style.display = 'none';
    }
    displayTime(0,0);

    timer.style.color = "lightgray";
}

// start timer
function startTimer(event) {
    event.preventDefault();
    //input
    const min = parseInt(input.value);
    if (isNaN(min) || min < 1 || min > 60) {
        alert('Input must be a number between 1 and 60');
        setDefaultTimer();
        return;
    }
    const sec = 0;

    const minutes = min * 60000;
    const seconds = sec * 1000;
    setTime = minutes + seconds;
    const startTime = Date.now();
    futureTime = startTime + setTime;
    
    timerLoop = setInterval(countDownTimer);

    btn_pause.textContent = 'Pause';

    if(isPaused) {
        btn_start.disabled = 'true';
    } else {
        btn_start.disabled = 'false';
    }
    input.value = '';
    
    countDownTimer();
}

// Pause timer
function pauseTimer(event) {
    event.preventDefault();
    if (!isPaused) {
        clearInterval(timerLoop); // Stop the timer interval
        const currentTime = Date.now();
        const remainingTime = futureTime - currentTime;
        timeDifference = remainingTime;
        isPaused = true;
        btn_pause.textContent = 'Resume';
    } else {
        isPaused = false;
        btn_pause.textContent = 'Pause';
        const currentTime = Date.now();
        futureTime = currentTime + timeDifference;
        timerLoop = setInterval(countDownTimer, 1000); //Resume the timer

    }
}


// Reset the timer
function resetTimer() {
    setDefaultTimer();
}

function countDownTimer() {
    const currentTime = Date.now();
    const remainingTime = futureTime - currentTime;
    const angle = (remainingTime / setTime) * 360;

    timer.style.color = "#048243";

    // Show semicircles when the timer starts
    for (let i = 0; i < semicircles.length; i++) {
    semicircles[i].style.display = 'block';
    }

    //progress indicator
    if(angle > 180) {
        semicircles[2].style.display = 'none';
        semicircles[0].style.transform = 'rotate(180deg)';
        semicircles[1].style.transform = `rotate(${angle}deg)`;
    } else {
        semicircles[2].style.display = 'block';
        semicircles[0].style.transform = `rotate(${angle}deg)`;
        semicircles[1].style.transform = `rotate(${angle}deg)`;
    }
    //timer
    const mins = Math.floor((remainingTime / (1000 * 60)) % 60);
    const secs = Math.floor((remainingTime / 1000) % 60);

    displayTime(mins, secs);

    //5sec-condition
    if(remainingTime <= 6000) {
        semicircles[0].style.backgroundColor = "red";
        semicircles[1].style.backgroundColor = "red";
        timer.style.color = "red";
    }

    //end
    if(remainingTime < 0) {
        clearInterval(timerLoop);
        setDefaultTimer();
    }
}

