let intervalID;
let isRunning = true;
let isPaused = false; 
let interval;
let savedSeconds =0;

let elapsedTime = 0;
let startTime;

let seconds = 15;
const showTimer = document.getElementById("TimerFor_Blockwall");

//INPORT FROM LS-DO PLAYER WANT TO PLAY WITH BLOCK WALL 1-YES 0-NO
let blockWallCheck = localStorage.getItem("blockWallCheck");
let blockWallCheckValue = JSON.parse(blockWallCheck);


//TIMER FOR BLOCKWALL - 15 TO START EVENT 5 SEC YOU PLAY WITH BLOCKWALL ON 10 WITH OUT AND 5 SEC WITH BLOCKWALL-REPEAT
function timer(){    
    startCountdown();        
}

function startCountdown() {
  showTimer.textContent = `${seconds}`;
  interval = setInterval(blockWallcyclone, 1000);  
}

function stopTimerFunction() {
  clearInterval(interval);
}

//TIMER ONLY WORK IF PLAYER WANT TO PLAY WITH BLOCKWALL
if(blockWallCheckValue === 1){
  window.addEventListener("load", timer);
}

//THIS IS USE IT GAME_LOOP.JS
function testtime() {
  // blockWallStatus = true;
  //   setTimeout(function() {      
  //   }, 5 * 1000);
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
      gameLoop();
      startCountdown();
    } else {
      // Pokud hra běží, pozastavíme ji
      isPaused = true;
      elapsedTime = Date.now() - startTime;
      clearInterval(interval);
      
    }
  }
})

document.addEventListener("keypress", function(e){
  if(e.key === "p" || e.key ==="P") {
  savedSeconds = seconds;
  }        
});

function blockWallcyclone(){
    seconds--;
    showTimer.textContent = `${seconds}`;
    if (seconds === 0) {
      blockWallStatus = !blockWallStatus;
      // blockWallStatus = true;
      // clearInterval(interval);
      if (blockWallStatus) {
        //BLOCKWALL ON
        seconds = 5;           
        // startCountdown();
        
      } else {
        blockWallStatus = false;
        //BLOCKWALL OFF
        seconds = 10;
        // startCountdown();
      }
    }
}
