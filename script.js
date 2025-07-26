const form = document.getElementById("timer-form");
const durationInput = document.getElementById("duration");
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

    const hrsStr = hrs > 0 ? String(hrs).padStart(2, '0') + ":" : "";
    const minStr = String(mins).padStart(2, '0');
    const secStr = String(secs).padStart(2, '0');

    return `${hrsStr}${mins}:${secs}`;
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    clearInterval(timerInterval);
    clearTimeout(repeatTimeout);

    const timeValue = durationInput.value;
    const repeatCount = parseInt(repeatsInput.value);

    if (!timeValue || isNaN(repeatCount) || repeatCount < 1) {
        output.innerHTML = `<p>Please enter valid time and repeat count.</p>`;
        return;
    }

    const durationInSeconds = timeStringToSeconds(timeValue);
    startLoopTimer(durationInSeconds, repeatCount);
}); 