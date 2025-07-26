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

function runTimer



