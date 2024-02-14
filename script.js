// document.addEventListener('DOMContentLoaded', function() {
    // document.addEventListener('DOMContentLoaded', (event) => {
    //     countDownTimer();
    // }  );


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

//countDownTimer();
function setDefaultTimer() {
    timer.innerHTML =  `
        <div>00</div>
        <div class="colon">:</div>
        <div>00</div>
        `;
}

// start timer
function startTimer(event) {
    event.preventDefault();
    //input
    const min = parseInt(input.value);
    if (isNaN(min) || min < 1 || min > 60) {
        alert('Input must be a number between 1 and 60');
        setDefaultTimer()
        return;
    }
    const sec = 0;

    const minutes = min * 60000;
    const seconds = sec * 1000;
    setTime = minutes + seconds;
    const startTime = Date.now();
    futureTime = startTime + setTime;
    

    timerLoop = setInterval(countDownTimer);
    // btn_start.disabled = 'true';
    //input.value = '';
    countDownTimer();
}

function pauseTimer() {
    if(!isPaused) {
        clearInterval(timerLoop);
        isPaused = true;
        btn_pause.textContent = 'Resume'
    }
}


function countDownTimer() {
    const currentTime = Date.now();
    const remainingTime = futureTime - currentTime;
    const angle = (remainingTime / setTime) * 360;

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
        semicircles[0].style.display = 'none';
        semicircles[1].style.display = 'none';
        semicircles[2].style.display = 'none';

        timer.innerHTML = `
        <div>00</div>
        <div class="colon">:</div>
        <div>00</div>
        `;

        timer.style.color = "lightgray";
    }
}

//});