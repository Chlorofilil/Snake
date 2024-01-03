let intervalID;
let isRunning = true;
let isPaused = false; 
let interval;
let timesave;

function timer(){
    let seconds = 15;
    const showTimer = document.getElementById("TimerFor_Blockwall");

    function startCountdown() {
      showTimer.textContent = `${seconds}`;
      interval = setInterval(function() {
        seconds--;
        showTimer.textContent = `${seconds}`;
        if (seconds === 0) {
          clearInterval(interval);
          if (blockWallStatus) {
            seconds = 5;           
            startCountdown();
          } else {
            seconds = 10;
            startCountdown();
          }
        }
      }, 1000);
    }
    timesave = seconds;
    startCountdown();      
}

window.addEventListener("load", timer);

function testtime() {
  blockWallStatus = true;
    setTimeout(function() {
      blockWallStatus = false;
    }, 5 * 1000);
  }

function canvasBlinking(condition) {
  if (condition) {
    canvasCSS.style.animationPlayState = "running";
  } else if (!condition) {
    canvasCSS.style.animationPlayState = "paused";
    // Nastavíme barvu rámečku zpět na černou, když podmínka není splněna
    canvasCSS.style.borderColor = "black";
  }
}


// btn pause
document.addEventListener("keydown", function(e) {
  if (e.key === "p" || e.key ==="P") {
    if (isPaused) {
      // Pokud byla hra pozastavena, znovu ji spustíme
      isPaused = false;
      seconds = timesave;
      gameLoop(); // Znovu spustit herní smyčku
      
    } else {
      // Pokud hra běží, pozastavíme ji
      isPaused = true;
      clearInterval(interval);
    }
  }
})