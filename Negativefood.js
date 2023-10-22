let NfoodPosX = 0;
let NfoodPosY = 0;

function randomNFood(){
    NfoodPosX = Math.floor(Math.random() * tileCountX) * tileSize;
    NfoodPosY = Math.floor(Math.random() * tileCountY) * tileSize; 
}

randomNFood();

function Nfood(){
    
    rectangle("#01c742", NfoodPosX, NfoodPosY, tileSize, tileSize);
    // randomNFood();
    
    if(score >= startofNFood){
        if (snakePosX === NfoodPosX && snakePosY === NfoodPosY){
        Ntitle.textContent = ++Nscore;
            if(snakeLength >=5){
                snakeLength--;
            }         
            randomNFood();
            }
    }    

    if (
        tail.some(
            (snakePart) => snakePart.x === NfoodPosX && snakePart.y === NfoodPosY
        )
    ) {
        randomNFood();
    }

    if (foodPosX === NfoodPosX && foodPosY === NfoodPosY) {
        randomNFood();
    }    
}