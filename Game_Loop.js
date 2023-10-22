// loop
function gameLoop() {
    if (gameIsRunning) {
        drawStuff();
        moveStuff();
        setTimeout(gameLoop, 1000 / fps);
    }
}

resetFood();
gameLoop();