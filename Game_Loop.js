// loop
function gameLoop() {
    if (gameIsRunning) {
        drawStuff();
        moveStuff();        
        // console.log(NfoodInGame);
        console.log(NfoodInGame);
        setTimeout(gameLoop, 1000 / fps);
    }
}

resetFood();
gameLoop();