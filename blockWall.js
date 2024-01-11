let intervalID;
let isRunning = true;
let isPaused = false; 
let interval;
let timesave;

//INPORT FROM LS-DO PLAYER WANT TO PLAY WITH BLOCK WALL 1-YES 0-NO
let blockWallCheck = localStorage.getItem("blockWallCheck");
let blockWallCheckValue = JSON.parse(blockWallCheck);

//TIMER FOR BLOCKWALL - 15 TO START EVENT 5 SEC YOU PLAY WITH BLOCKWALL ON 10 WITH OUT AND 5 SEC WITH BLOCKWALL-REPEAT
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
            //BLOCKWALL ON
            seconds = 5;           
            startCountdown();
          } else {
            //BLOCKWALL OFF
            seconds = 10;
            startCountdown();
          }
        }
      }, 1000);
    }
    timesave = seconds;
    startCountdown();      
}

//TIMER ONLY WORK IF PLAYER WANT TO PLAY WITH BLOCKWALL
if(blockWallCheckValue === 1){
  window.addEventListener("load", timer);
}

//THIS IS USE IT GAME_LOOP.JS
function testtime() {
  blockWallStatus = true;
    setTimeout(function() {
      blockWallStatus = false;
    }, 5 * 1000);
  }

//FUNCTION THAT SET EDGES OF CANVAS BLINKING IF BLOCKWALL IS ON 
function canvasBlinking(condition) {
  if(condition) {   
    canvasCSS.style.animationPlayState = "running";    
  } else if (!condition) {
    canvasCSS.style.animationPlayState = "paused";
    canvasCSS.style.borderColor = "black";
  }
}

// BTN POUSE - NOT WORKING WITH TIMER NEED TO FIX
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