// listeners
document.addEventListener("keydown", keyPush);

// Game size and speed
let gameIsRunning = true;
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
let rovnostScore = false;
let pouziteNum = [];
let bugFix = false;

// BlockWall
let blockWallStatus = false;
let running = false;
let isBlinking = false;

let playerName;

//LS inport
let nFoodCheck = localStorage.getItem("NFoodCheck");
let nFoodCheckValue = JSON.parse(nFoodCheck);

//Going true walls
function runtruewalls(){
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
}

//BlockWall colision
function hitwalls(){
    if (snakePosX > canvas.width - tileSize) {
        gameOver();
    }
    if (snakePosX < 0) {
        gameOver();
    }
    if (snakePosY > canvas.height - tileSize) {
        gameOver();
    }
    if (snakePosY < 0) {
        gameOver();
    }
}

//Main movmed function
function moveStuff() {
    snakePosX += snakeSpeed * velocityX;
    snakePosY += snakeSpeed * velocityY;

    //If player want to play with blockwall
    if(blockWallCheckValue === 1){            
        if(blockWallStatus === false){     
            //normalPlay       
            runtruewalls();
        } else if(blockWallStatus && blockWallCheck){
            //BlockWall On-cant hit walls
            hitwalls();
        }
    }
    //If player choose to play with out blockwall
    else if(blockWallCheckValue === 0){
        //normalPlay    
        runtruewalls();
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

    // food collision = increase length + score + spawn new food
    if (snakePosX === foodPosX && snakePosY === foodPosY) {
        title.textContent = `Total score : ${++score}`;
        snakeLength++;
        let newTimeForNFood = fakeScore[fakeScore.length - 1] + Math.floor(Math.random() * (7 - 5 + 1)) + 5;
        fakeScore.push(newTimeForNFood);
        
        resetFood();
        return fakeScore;
    }         

    // NFood collision = decrease length + NFood score
    if(nFoodCheckValue){
        if (snakePosX === NfoodPosX && snakePosY === NfoodPosY  && NfoodInGame === true) {
        Ntitle.textContent = `Total score of N-Food: ${++Nscore}`;
        if(snakeLength >= 5) {
            snakeLength--;
        }   
        //Dont respawn NFood
        NfoodInGame = false;                 
        } 
    }
    
}

//Drawing board
function drawStuff() {

    DrawingPlayGround();
    
     // Drawing rectangle food
     rectangle("#db0000", foodPosX, foodPosY, tileSize, tileSize);

     // Drawing rectangle tail
     tail.forEach((snakePart) =>
         rectangle("#555", snakePart.x, snakePart.y, tileSize, tileSize)
     );
 
     // Drawing rectangle snake-head
     rectangle("black", snakePosX, snakePosY, tileSize, tileSize);
        
    // Spawn of NFood
    fakeScore.forEach(function(Num){
        
        if(score === Num  && pouziteNum.indexOf(Num) === -1  ){   
            //Make sure that NFoddi is in the game           
            NfoodInGame = true;    
            //couting number, fakeScore so when fakescore is hit, it dont spawn it again        
            pouziteNum.push(Num);
        }                  
    })
    
    // Drawing NFood
    if(nFoodCheckValue && NfoodInGame === true){
        
        //Drawing rectangle NFood
        rectangle("#01c742", NfoodPosX, NfoodPosY, tileSize, tileSize);

        // NFood cant spawn on NFood
        if (NfoodPosX === snakePosX && NfoodPosY === snakePosY) {
            randomNFood();
        }

        // NFood cant be spawn on snake tail
        if (
            tail.some(
                (snakePart) => snakePart.x === NfoodPosX && snakePart.y === NfoodPosY
            )
        ) {
            randomNFood();
        }               
    }

    
    if(isPaused){

    }
    // Canvas blinking in blockWall = true
    if(blockWallCheckValue === 0){
        blockWallStatus = false;
        canvasBlinking(blockWallStatus); 
    } else if(blockWallCheckValue === 1){
        canvasBlinking(blockWallStatus);
    } 
}

// Random food position
function resetFood() {    
    // Full map = gameOver
    if (snakeLength === tileCountX * tileCountY) {
        gameOver();
    }

    //Random position
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
    //Show on score boeard
    title.innerHTML = `☠️ <strong> ${score} </strong> ☠️`;
    gameIsRunning = false;

    if(gameIsRunning === false){
        let myPlayers = JSON.parse(localStorage.getItem("Player"))
        //PlayerID
        const nameIDofPlayer = location.hash.substring(1)
        // Looking for player with same ID as webpage.
        const playerIndex = myPlayers.findIndex(oneObject => oneObject.id === nameIDofPlayer);

        // Checking if playerIndex is empty, if not (-1)then function will run.
        if (playerIndex !== -1) {
            if(myPlayers[playerIndex].playerScore < score){
                myPlayers[playerIndex].playerScore = score;
            localStorage.setItem("Player", JSON.stringify(myPlayers));
            }            
        }        
    }
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



function randomNFood(){
    NfoodPosX = Math.floor(Math.random() * tileCountX) * tileSize;
    NfoodPosY = Math.floor(Math.random() * tileCountY) * tileSize;
}

function randomNFoodminus(){
    NfoodPosX = Math.floor(Math.random() * tileCountX) * tileSize;
    NfoodPosY = Math.floor(Math.random() * tileCountY) * tileSize;
    NfoodPosX = -NfoodPosX;
    NfoodPosY = -NfoodPosY;
    
}

// Button on click back
let backToMainMenu = document.querySelector(".back-spat").addEventListener("click", function(){

})