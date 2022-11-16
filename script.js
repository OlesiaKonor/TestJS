let clicks = 0;

let currentRectX = 0;
let currentRectY = 0;
let currentRectWidth = 0;
let currentRectHeight = 0;

const TIMEOUT = 5000;

const display = document.querySelector('#time-header');
const button = document.getElementById('start');
const counter = document.querySelector('#counter');
const canvas = document.getElementById("game");

button.onclick = start;
canvas.onclick = null; 

function start () { 
    const startTime = Date.now();

    display.textContent = formatTime (TIMEOUT);
    button.style.display = 'none';
    clicks = 0;

    clearCanvas();
    drawRectangle();

    canvas.onclick = canvasClick; 
    
    const interval = setInterval(() => { 
        const delta = Date.now () - startTime
        display.textContent = formatTime (TIMEOUT - delta); 
    } , 100) ; 

    const timeout = setTimeout(() => {
        button.onclick = start;
        canvas.onclick = null; 
        button.style.display = 'block';
        display.textContent = 'Game Over';

        clearCanvas();
        clearInterval (interval);
        clearTimeout (timeout);

    }, TIMEOUT);

     
}

function canvasClick(event)
{
    
    const x = event.clientX - canvas.offsetLeft - canvas.offsetParent.offsetLeft;
    const y = event.clientY - canvas.offsetParent.offsetTop;

    //alert("Click on x:" + x + " y: " + y);

    if (x > currentRectX && x < currentRectX + currentRectWidth &&
        y > currentRectY && y < currentRectY + currentRectHeight)   
    {
        clicks++;
        counter.textContent = clicks;
        clearCanvas();
        drawRectangle();
    }
}

function drawRectangle() {
    const ctx = canvas.getContext("2d");

    // Math.random() выдает случайное число [0; 1]
    // Math.floor() округляет число вниз (например, 10.8 округлится до 10)
    

    const halfOfMaxRectangleSize = 50;

    const randomX = Math.floor(Math.random() * (canvas.width - halfOfMaxRectangleSize * 2));
    const randomY = Math.floor(Math.random() * (canvas.height - halfOfMaxRectangleSize * 2));

    const randomWidth = Math.floor(Math.random() * halfOfMaxRectangleSize) + halfOfMaxRectangleSize; //случайное число от 50 до 99
    const randomHeight = Math.floor(Math.random() * halfOfMaxRectangleSize) + halfOfMaxRectangleSize;

    
    const randomColor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);

    ctx.fillStyle = randomColor;
    ctx.fillRect(randomX, randomY, randomWidth, randomHeight);

    currentRectX = randomX;
    currentRectY = randomY;
    currentRectWidth = randomWidth;
    currentRectHeight = randomHeight;
}

function clearCanvas() {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function formatTime (ms) { 
    return Number.parseFloat(ms/1000).toFixed(2);
}