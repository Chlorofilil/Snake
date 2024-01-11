function gameLoop() {
    if (gameIsRunning) {
        //PAUSING GAME
        if (isPaused) {
            // Hra je pozastavena
            return;
        }
        drawStuff();        
        moveStuff();     
        setTimeout(gameLoop, 1000 / fps);
    }
}
setInterval(testtime, 15 * 1000);
resetFood();
gameLoop();