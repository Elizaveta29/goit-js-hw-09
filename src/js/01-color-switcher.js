const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

body.style.display = "flex";
body.style.flexDirection = "column";
body.style.justifyContent = "center";
body.style.alignItems = "center";
startBtn.style.marginBottom = "20px";

let timerId = null;
startBtn.addEventListener('click', changeBgColor);
stopBtn.addEventListener('click', stopBgColorChange);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBgColor() { 
    timerId = setInterval(() => body.style.backgroundColor = getRandomHexColor(), 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
}

function stopBgColorChange() { 
    clearInterval(timerId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
}
