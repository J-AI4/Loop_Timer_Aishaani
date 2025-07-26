const form = document.getElementById("timer-form");
const durationHours = document.getElementById("duration-hours");
const durationMinutes = document.getElementById("duration-minutes");
const durationSeconds = document.getElementById("duration-seconds");
const repeatsInput = document.getElementById("repeats");
const output = document.getElementById("output");

let currentRepeat = 0;
let timerInterval;
let repeatTimeout;

function timeStringToSeconds(timestring) {
    const [hours, minutes, seconds] = timestring.split(":").map(Number);
    return (hours * 3600) + (minutes * 60) + (seconds || 0);
}

function startLoopTimer(duration, totalRepeats) {
    currentRepeat = 1;
    runTimer(duration, totalRepeats);
}

function runTimer(duration, totalRepeats) {
    let timeLeft = duration;

    output.innerHTML = `<h2>Loop ${currentRepeat} of ${totalRepeats}</h2>
                        <p>Time Left: ${formatTime(timeLeft)}</p>`;

    timerInterval = setInterval(() => {
        timeLeft--;
        output.innerHTML = `<h2>Loop ${currentRepeat} of ${totalRepeats}</h2>
                            <p>Time Left: ${formatTime(timeLeft)}</p>`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            output.innerHTML = `<h2>Loop ${currentRepeat} Complete!</h2>`;

            if (currentRepeat < totalRepeats) {
                currentRepeat++; 
                repeatTimeout = setTimeout(() => {
                    runTimer(duration, totalRepeats);
                }, 1000);
            } else {
                output.innerHTML = `<h2>All Loops Complete!</h2>`;
            }
        }
    }, 1000);
}

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const hrsStr = hrs > 0 ? String(hrs).padStart(2, '0') + ':' : '';
    const minStr = String(mins).padStart(2, '0');
    const secStr = String(secs).padStart(2, '0');

    return `${hrsStr}${minsStr}:${secsStr}`;
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    clearInterval(timerInterval);
    clearTimeout(repeatTimeout);

    const h = parseInt(durationHours.value) || 0;
    const m = parseInt(durationMinutes.value) || 0;
    const s = parseInt(durationSeconds.value) || 0;
    const repeatCount = parseInt(repeatsInput.value);

    if ((h === 0 && m === 0 && s === 0) || isNaN(repeatCount) || repeatCount < 1) {
        output.innerHTML = `<p>Please enter valid time and repeat count.</p>`;
        return;
    }

    const durationInSeconds = (h * 3600) + (m * 60) + s;
    startLoopTimer(durationInSeconds, repeatCount);

    
}); 

const fillDropdown = (selectId, max, unit) => {
  const sel = document.getElementById(selectId);
  for (let i = 0; i <= max; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.text = `${i}${unit}`;
    sel.appendChild(opt);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  fillDropdown('duration-hours', 23, 'h');
  fillDropdown('duration-minutes', 59, 'm');
  fillDropdown('duration-seconds', 59, 's');
}); 