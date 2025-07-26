const form = document.getElementById("timer-form");
const durationInput = document.getElementById("duration");
const repeatsInput = document.getElementById("repeats");
const output = document.getElementById("output");

let currentRepeat = 0;
let timerInterval;
let repeatTimeout;

function timeStringToSeconds(timestring) {
    const [minutes, seconds] = timestring.split(":").map(Number);
    return (minutes * 60) + seconds;
}

function startLoopTimer(duration, totalRepeats) {
    currentRepeat = 1;
    runTimer(duration, totalRepeats);
}

function runTimer



