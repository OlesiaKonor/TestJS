let clicks = 0;
let currentRectX = 0;
let currentRectY = 0;
let currentRectWidth = 0;
let currentRectHeight = 0;

let button = document.getElementById('start');

const display = document.getElementById('time-header');
const counter = document.getElementById('counter');
const canvas = document.getElementById("game");

button.addEventListener('click', start);

function start () {
    canvas.addEventListener('click', canvasClick);
    let gt = document.getElementById('game-time'); //время игры
    let TIMEOUT = gt.value * 1000;
    const startTime = Date.now();

    display.textContent = formatTime (TIMEOUT);
    button.style.display = 'none';
    clicks = 0;

    clearCanvas();
    drawRectangle();

    const interval = setInterval(() => { //отображение времени
        const delta = Date.now () - startTime
        display.textContent = formatTime (TIMEOUT- delta); 
    } , 10) ; 

    const timeout = setTimeout(() => {//Конец Игры
        button.style.display = 'block';
        display.textContent = 'Game Over';

        clearCanvas();
        canvas.removeEventListener('click', canvasClick)
        clearInterval (interval);
        clearTimeout (timeout);

    }, TIMEOUT);
}

function canvasClick(event)
{
    const x = event.clientX - canvas.offsetLeft - canvas.offsetParent.offsetLeft;
    const y = event.clientY - canvas.offsetTop - canvas.offsetParent.offsetTop;
    //alert("Click on x:" + x + " y: " + y);

    if (x > currentRectX && x < currentRectX + currentRectWidth && y > currentRectY && y < currentRectY + currentRectHeight*2)
    {
        clicks++;
        counter.textContent = clicks;
        clearCanvas();
        drawRectangle();
    }
}

function drawRectangle() {
    const ctx = canvas.getContext("2d");
    const MaxRectangleSize = 100;
    const randomColor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);

    currentRectX = Math.floor(Math.random() * (canvas.width - MaxRectangleSize))
    currentRectY = Math.floor(Math.random() * (canvas.height - MaxRectangleSize));
    currentRectWidth = Math.floor(Math.random() * MaxRectangleSize/2) + MaxRectangleSize/2;
    currentRectHeight = Math.floor(Math.random() * MaxRectangleSize/2) + MaxRectangleSize/2;

    ctx.fillStyle = randomColor;
    ctx.fillRect(currentRectX, currentRectY, currentRectWidth, currentRectHeight);
}





function clearCanvas() {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function formatTime (ms) { // отображение времени
    return Number.parseFloat(ms/1000).toFixed(2);
}