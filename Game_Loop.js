// loop
function gameLoop() {
    if (gameIsRunning) {
        drawStuff();
        moveStuff();
        if(score >=startofNFood){
            Nfood();
        }; 
        setTimeout(gameLoop, 1000 / fps);
    }
}

resetFood();
gameLoop();