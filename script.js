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

function setDefaultTimer() {
    for (let i = 0; i < semicircles.length; i++) {
        semicircles[i].style.display = 'none';
    }
    timer.innerHTML =  `
        <div>00</div>
        <div class="colon">:</div>
        <div>00</div>
        `;

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
        isPaused = true;

        if (futureTime !== 0) {
            btn_pause.textContent = 'Resume';
        }
        for (let i = 0; i < semicircles.length; i++) {
            semicircles[i].style.animationPlayState = 'paused'; // Pause the progress ring animation
        }
    } else {
        timerLoop = setInterval(countDownTimer); // Restart the timer interval
        isPaused = false;
        btn_pause.textContent = 'Pause';
        for (let i = 0; i < semicircles.length; i++) {
            semicircles[i].style.animationPlayState = 'running'; // Resume the progress ring animation
        }
    }
}
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
    const mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});;
    const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});;

    timer.innerHTML = `
    <div>${mins}</div>
    <div class="colon">:</div>
    <div>${secs}</div>
    `;

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

