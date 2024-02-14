const semicicles = document.querySelectorAll('.semicircle');
const timer = document.querySelector('.timer');

//input
const min = 0;
const sec = 15;

const minutes = min * 60000;
const seconds = sec * 1000;
const setTime = minutes + seconds;
const startTime = Date.now();
const futureTime = startTime + setTime;

const timerLoop = setInterval(countDownTimer);
countDownTimer();

function countDownTimer() {
    const currentTime = Date.now();
    const remainingTime = futureTime - currentTime;
    const angle = (remainingTime / setTime) * 360;


    //progress indicator
    if(angle > 180) {
        semicicles[2].style.display = 'none';
        semicicles[0].style.transform = 'rotate(180deg)';
        semicicles[1].style.transform = `rotate(${angle}deg)`;
    } else {
        semicicles[2].style.display = 'block';
        semicicles[0].style.transform = `rotate(${angle}deg)`;
        semicicles[1].style.transform = `rotate(${angle}deg)`;
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
        semicicles[0].style.backgroundColor = "red";
        semicicles[1].style.backgroundColor = "red";
        timer.style.color = "red";

    }

    //end
    if(remainingTime < 0) {
        clearInterval(timerLoop);
        semicicles[0].style.display = 'none';
        semicicles[1].style.display = 'none';
        semicicles[2].style.display = 'none';

        timer.innerHTML = `
        <div>00</div>
        <div class="colon">:</div>
        <div>00</div>
        `;

        timer.style.color = "lightgray";
    }
}