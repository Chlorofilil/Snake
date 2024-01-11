// canvas
const canvas = document.querySelector("canvas");
const canvasCSS = document.querySelector("#mainCanvas");
const title = document.querySelector(".Total-score");
const Ntitle = document.querySelector(".Total-Nscore");
const ctx = canvas.getContext("2d");

// SPEED OF GAME-SIZE OF SNAKE
const fps = 15;
const tileSize = 50;
const tileCountX = canvas.width / tileSize;
const tileCountY = canvas.height / tileSize;



// DRAW RECTANGLE
function rectangle(color, x, y, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
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

function DrawingPlayGround(){
    // background
    rectangle("#ffbf00", 0, 0, canvas.width, canvas.height);

    // grid
    drawGrid();

};