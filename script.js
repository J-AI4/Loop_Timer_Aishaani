//script.js for Loop Timer

//getting elements from index.html file

const form = document.getElementById("timer-form");
const output = document.getElementById("output");

const hoursSelect = document.getElementById("duration-hours");
const minutesSelect = document.getElementById("duration-minutes");
const secondsSelect = document.getElementById("duration-seconds");

//this is where I created the dropdowns for hours, minutes, and seconds

for (let i = 0; i < 24; i++) {
    hoursSelect.innerHTML += `<option value="${i}">${i.toString().padStart(2, '0')}h</option>`;
}
for (let i = 0; i < 60; i++) {
    minutesSelect.innerHTML += `<option value="${i}">${i.toString().padStart(2, '0')}m</option>`;
    secondsSelect.innerHTML += `<option value="${i}">${i.toString().padStart(2, '0')}s</option>`;
}

let interval;
let totalRepeats = 0;
let currentRepeat = 0;

//this is the submit button, stops any running timers and sends error message if space is left blank

form.addEventListener("submit", function (e) {
    e.preventDefault();

    clearInterval(interval);
    output.innerHTML = "";

    const hours = parseInt(hoursSelect.value);
    const minutes = parseInt(minutesSelect.value);
    const seconds = parseInt(secondsSelect.value);
    totalRepeats = parseInt(document.getElementById("repeats").value);
    currentRepeat = 1;

    const totalTime = (hours * 3600 + minutes * 60 + seconds) * 1000;

    if (totalTime <= 0 || totalRepeats <= 0) {
        output.textContent = "Oops! Please select a valid time and repeat count.";
        return;
    }

    startLoop(totalTime);
});

//starts the loop, until it reaches total repeat count

function startLoop(duration) {
    runTimer(duration);

    interval = setInterval(() => {
        currentRepeat++;
        if (currentRepeat > totalRepeats) {
            clearInterval(interval);
            output.innerHTML = "<h2>All loops complete!</h2>";
            playSound();
        } else {
            runTimer(duration);
            playSound();
        }
    }, duration);
}

//this is the "Time Left:" part, updates screen every second to show how much time is left

function runTimer(duration) {
    let timeLeft = duration / 1000;

    output.innerHTML = `<h2>Loop ${currentRepeat} of ${totalRepeats}</h2><p id="timer-display"></p>`;
    const display = document.getElementById("timer-display");

    const tick = setInterval(() => {
        const hrs = Math.floor(timeLeft / 3600);
        const mins = Math.floor((timeLeft % 3600) / 60);
        const secs = Math.floor(timeLeft % 60);
        const hrsStr = hrs > 0 ? hrs.toString().padStart(2, '0') + ':' : '';
        display.textContent = `Time Left: ${hrsStr}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;


        if (timeLeft <= 0) {
            clearInterval(tick);
        }

        timeLeft--;
    }, 1000);
}

//play a little tune at the end of each loop

function playSound() {
    const beep = new Audio("audio.mp3");
    beep.play();
}
