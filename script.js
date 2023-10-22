// listeners
document.addEventListener("keydown", keyPush);

// canvas
const canvas = document.querySelector("canvas");
const title = document.querySelector("h1");
const ctx = canvas.getContext("2d");

// game
let gameIsRunning = true;

const fps = 15;
const tileSize = 50;
const tileCountX = canvas.width / tileSize;
const tileCountY = canvas.height / tileSize;

let score = 0;

// player
let snakeSpeed = tileSize;
let snakePosX = 0;
let snakePosY = canvas.height / 2;

let velocityX = 1;
let velocityY = 0;

let tail = [];
let snakeLength = 4;

// food
let foodPosX = 0;
let foodPosY = 0;

//Main movmed function
function moveStuff() {
    snakePosX += snakeSpeed * velocityX;
    snakePosY += snakeSpeed * velocityY;

    // Going true walls
    if (snakePosX > canvas.width - tileSize) {
        snakePosX = 0;
    }
    if (snakePosX < 0) {
        snakePosX = canvas.width;
    }
    if (snakePosY > canvas.height - tileSize) {
        snakePosY = 0;
    }
    if (snakePosY < 0) {
        snakePosY = canvas.height;
    }

    // Hitting tail = gameOver
    tail.forEach((snakePart) => {
        if (snakePosX === snakePart.x && snakePosY === snakePart.y) {
            gameOver();
        }
    });

    // Create snake tail
    tail.push({ x: snakePosX, y: snakePosY });

    // Snake tail stays on normal length
    tail = tail.slice(-1 * snakeLength);

    // food collision = increase length
    if (snakePosX === foodPosX && snakePosY === foodPosY) {
        title.textContent = ++score;
        snakeLength++;
        resetFood();
    }
}

//Drawing board
function drawStuff() {
    // background
    rectangle("#ffbf00", 0, 0, canvas.width, canvas.height);

    // grid
    drawGrid();

    // food
    rectangle("#00bfff", foodPosX, foodPosY, tileSize, tileSize);

    // tail
    tail.forEach((snakePart) =>
        rectangle("#555", snakePart.x, snakePart.y, tileSize, tileSize)
    );

    // snake
    rectangle("black", snakePosX, snakePosY, tileSize, tileSize);
}

// draw rectangle
function rectangle(color, x, y, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

// Random food position
function resetFood() {
    // Full map = gameOver
    if (snakeLength === tileCountX * tileCountY) {
        gameOver();
    }

    foodPosX = Math.floor(Math.random() * tileCountX) * tileSize;
    foodPosY = Math.floor(Math.random() * tileCountY) * tileSize;

    // Food cant be spawn on snake head
    if (foodPosX === snakePosX && foodPosY === snakePosY) {
        resetFood();
    }

    // Food cant be spawn on snake tail
    if (
        tail.some(
            (snakePart) => snakePart.x === foodPosX && snakePart.y === foodPosY
        )
    ) {
        resetFood();
    }
}

// GAME OVER
function gameOver() {
    title.innerHTML = `☠️ <strong> ${score} </strong> ☠️`;
    gameIsRunning = false;
}

//Snake control
function keyPush(event) {
    switch (event.key) {
        case "ArrowLeft":
            if (velocityX !== 1) {
                velocityX = -1;
                velocityY = 0;
            }
            break;
        case "ArrowUp":
            if (velocityY !== 1) {
                velocityX = 0;
                velocityY = -1;
            }
            break;
        case "ArrowRight":
            if (velocityX !== -1) {
                velocityX = 1;
                velocityY = 0;
            }
            break;
        case "ArrowDown":
            if (velocityY !== -1) {
                velocityX = 0;
                velocityY = 1;
            }
            break;
        default:
            // restart game
            if (!gameIsRunning) location.reload();
            break;
    }
}

// Map grid
function drawGrid() {
    for (let i = 0; i < tileCountX; i++) {
        for (let j = 0; j < tileCountY; j++) {
            rectangle(
                "#fff",
                tileSize * i,
                tileSize * j,
                tileSize - 1,
                tileSize - 1
            );
        }
    }
}