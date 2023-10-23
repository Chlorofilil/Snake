// listeners
document.addEventListener("keydown", keyPush);

// canvas
const canvas = document.querySelector("canvas");
const title = document.querySelector(".Total-score");
const Ntitle = document.querySelector(".Total-Nscore");
const ctx = canvas.getContext("2d");

// Game size and speed
let gameIsRunning = true;

const fps = 15;
const tileSize = 50;
const tileCountX = canvas.width / tileSize;
const tileCountY = canvas.height / tileSize;

let score = 0;
let fakeScore = [1];
let startofNFood = 1;
let Nscore = 0;
let nfood = null;

// Player
let snakeSpeed = tileSize;
let snakePosX = 0;
let snakePosY = canvas.height / 2;

let velocityX = 1;
let velocityY = 0;

let tail = [];
let snakeLength = 4;

// Possitive Food
let foodPosX = 0;
let foodPosY = 0;

// NFood
let NfoodPosX = Math.floor(Math.random() * tileCountX) * tileSize;
let NfoodPosY = Math.floor(Math.random() * tileCountY) * tileSize;
let NfoodInGame = false;


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
        let newTimeForNFood = fakeScore[fakeScore.length - 1] + Math.floor(Math.random() * (7 - 5 + 1)) + 5;
        fakeScore.push(newTimeForNFood);
        console.log(fakeScore);
        resetFood();
        return fakeScore;
    }     
     
    // NFood collision = decrease length
    if (snakePosX === NfoodPosX && snakePosY === NfoodPosY && NfoodInGame === true) {
        Ntitle.textContent = ++Nscore;
        if(snakeLength >= 5) {
            snakeLength--;
        }                
        return NfoodInGame = false;  
    } 

}


//Drawing board
function drawStuff() {
    
    // background
    rectangle("#ffbf00", 0, 0, canvas.width, canvas.height);

    // grid
    drawGrid();

    // food
    rectangle("#db0000", foodPosX, foodPosY, tileSize, tileSize);

    // tail
    tail.forEach((snakePart) =>
        rectangle("#555", snakePart.x, snakePart.y, tileSize, tileSize)
    );

    // snake
    rectangle("black", snakePosX, snakePosY, tileSize, tileSize);
    
    // Spawn of NFood
    fakeScore.forEach(function(Num){
        if(score === Num){
            NfoodInGame = true;
        }
    })
    // Drawing NFood
    if(NfoodInGame === true){

        // Draw NFood
        rectangle("#01c742", NfoodPosX, NfoodPosY, tileSize, tileSize);

        // NFood cant spawn on NFood
        if (foodPosX === snakePosX && foodPosY === snakePosY) {
            randomNFood();
        }

        // NFood cant be spawn on snake tail
        if (
            tail.some(
                (snakePart) => snakePart.x === foodPosX && snakePart.y === foodPosY
            )
        ) {
            randomNFood();
        }        
    }
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

    // Normal food cant spawn on NFood
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

    // Food cant spawn on Nfood
    if (foodPosX === NfoodPosX && foodPosY === NfoodPosY) {
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

function randomNFood(){
    NfoodPosX = Math.floor(Math.random() * tileCountX) * tileSize;
    NfoodPosY = Math.floor(Math.random() * tileCountY) * tileSize;
}

// function firstNFood(){
//     if(score >= startofNFood){
//         NfoodInGame = true;
//         rectangle("#01c742", NfoodPosX, NfoodPosY, tileSize, tileSize);
//     }
// }
// function otherNFood(){
//     if(score === fakeScore){
//         NfoodInGame = true;
//         rectangle("#01c742", NfoodPosX, NfoodPosY, tileSize, tileSize);
//     }
// }