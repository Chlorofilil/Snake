// Chooseing your map.
let checkmap
let checkmapwarrning = true;
let checkname = false;
let checknamewarrning = true;
let wallCheck = 0;
let NFoodCheck = 0;   

// Click for choose which mape you want to play set it = true.
document.querySelector("#Choose-map").addEventListener("change", function(e){  
    checkmap = e.target.checked;   
    //IN PLAYER PLAY ON GAME, THEN GO BACK TO MANEU, DONT USE ANY OF FEATURES THIS WILL SET IT ON 0 AUTOMATICLY 
    localStorage.setItem("blockWallCheck", "0");
    localStorage.setItem("NFoodCheck", "0");
});

//MAKE BORDER AROUND MAP THAT YOU CHOOSE 
document.addEventListener("change", function(){
    let pickMap = document.querySelector('.choose-pic_1');    
    if(checkmap === true){
        pickMap.style.border = '2px solid #fdb44b';
    } else if (checkmap === false) {
        pickMap.style.border = 'none';
    } 
});

// Click if you want to play with Blockwall mode.
let ChooseBlockwall = document.querySelector("#ChooseWallblock").addEventListener("change", function(e){
    let ChooseBlockwall = document.querySelector(".BlockWallTool");

    if(e.target.checked === true){
        ChooseBlockwall.style.textDecoration = "underline #fdb44b";
        //SETING WALLCHECK TO 1 SO PLAYER CAN PLAY WITH BLOCKWALL ON ANOTHER PAGE-SCRIPT.JS
        wallCheck = 1;
    } else if (e.target.checked === false) {
        ChooseBlockwall.style.textDecoration = "none #fdb44b";
        //SETING WALLCHECK TO 1 SO PLAYER CANT PLAY WITH BLOCKWALL ON ANOTHER PAGE-SCRIPT.JS
        wallCheck = 0;
    }
    let wallCheckJSON = JSON.stringify(wallCheck);
    localStorage.setItem("blockWallCheck", wallCheckJSON);
})

// Click if you want to play with Negative Food.
let ChooseNegativeFood = document.querySelector("#ChooseNFood").addEventListener("change", function(e){
    let ChooseNfood = document.querySelector(".NFoodTool");
    
    if(e.target.checked === true){
        ChooseNfood.style.textDecoration = "underline #fdb44b";
        //SETING WALLCHECK TO 1 SO PLAYER CAN PLAY WITH NFOOF ON ANOTHER PAGE-SCRIPT.JS
        NFoodCheck = 1;
    } else if (e.target.checked === false) {
        ChooseNfood.style.textDecoration = "none #fdb44b";
        //SETING WALLCHECK TO 1 SO PLAYER CANT PLAY WITH NFOOD ON ANOTHER PAGE-SCRIPT.JS
        NFoodCheck = 0;
    }
    let nFoodcheck = JSON.stringify(NFoodCheck);
    localStorage.setItem("NFoodCheck", nFoodcheck);
})

/*  SENDING NAME TO LOCALSTORAGE WITH ID
    CHECKING IF PLAYER ADD NAME AND CHOOSE MAPE
    SENDING ID OF PLAYER TO URL SO ANOTHER PAGE SCRIPT.JS CAN USE PLAYER ID
*/
document.addEventListener("submit", function(e){
    e.preventDefault();

    let existingPlayers = localStorage.getItem("Player");
    let myPlayers = existingPlayers ? JSON.parse(existingPlayers) : [];
    
    let playerOriginalName = document.querySelector(".sayYourName").value;
    const errorMessage = document.querySelector(".error-message-namecheck");

    //CHEKING IF PLAYRE ADD NAME
    if(!playerOriginalName){
        if(checknamewarrning){
            const errorMessageP = document.createElement("p");
            errorMessageP.textContent = "You did not say your name.";
            errorMessageP.classList.add("error-message-namecheck", "warningPos");
            const form = document.querySelector("#nameinput");
            form.appendChild(errorMessageP);
            checknamewarrning = false;            
        }  
    } else if (errorMessage) {
        errorMessage.parentNode.removeChild(errorMessage);
        checknamewarrning = true;
    }
    
    //CREATING PLAYER FIELD AND SENDING IT DO LS
    let playerObjID = ({
        id: uuidv4(),
        name: playerOriginalName,
        playerScore: 0,            
    })
    if(checkmap && playerOriginalName){
        myPlayers.push(playerObjID);        
        localStorage.setItem("Player", JSON.stringify(myPlayers));
    }
    
    // CANT START GAME IF U DONT ADD NAME AND CHOOSE MAP
    if(checkmap && playerOriginalName){

        window.location.href = `index.html#${playerObjID.id}`;
    } else if(!checkmap) {
        if(checkmapwarrning){
            //CHECK IF YOU DONT CHOOSE MAP
            const newDiv = document.createElement("div");
            newDiv.textContent = "You did not pick playgraund, please do so.";
            newDiv.classList.add("warnigForMap", "warningPos");
            const form = document.querySelector("#ChooseYourMap");
            form.appendChild(newDiv);
            checkmapwarrning = false;                
        }            
    } else if(checkmap) {
        const removenewDiv = document.querySelector('.warnigForMap');
        if(removenewDiv){
            removenewDiv.parentNode.removeChild(removenewDiv);
            checkmapwarrning = true;
        }            
    }    
});