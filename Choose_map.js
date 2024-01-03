// Chooseing your map.
let checkmap
let checkmapwarrning = true;
let checkname = false;
let checknamewarrning = true;


// Click for choose which mape you want to play set it = true.
document.querySelector("#Choose-map").addEventListener("change", function(e){  
    checkmap = e.target.checked ;       
})

document.addEventListener("change", function(){
    let pickMap = document.querySelector('.choose-pic_1');    
    if(checkmap === true){
        pickMap.style.border = '2px solid #fdb44b';
    } else if (checkmap === false) {
        pickMap.style.border = 'none';
    } 
})
   
// Click if you want to play with Blockwall mode.
let ChooseBlockwall = document.querySelector("#ChooseWallblock").addEventListener("change", function(e){
    let ChooseBlockwall = document.querySelector(".BlockWallTool");
    console.log(e.target.checked)
    if(e.target.checked === true){
        ChooseBlockwall.style.textDecoration = "underline #fdb44b";
    } else if (e.target.checked === false) {
        ChooseBlockwall.style.textDecoration = "none #fdb44b";
    }
})

// Click if you want to play with Negative Food.
let ChooseNegativeFood = document.querySelector("#ChooseNFood").addEventListener("change", function(e){
    let ChooseBlockwall = document.querySelector(".NFoodTool");
    console.log(e.target.checked)
    if(e.target.checked === true){
        ChooseBlockwall.style.textDecoration = "underline #fdb44b";
    } else if (e.target.checked === false) {
        ChooseBlockwall.style.textDecoration = "none #fdb44b";
    }
})

// Sending name to LocalStorage and change webpage to game : index.html.
// document.addEventListener("click", function(){

//     let playerNameInput = document.addEventListener("submit", function(e){
//         e.preventDefault()

//         let existingPlayers = localStorage.getItem("Player");
//         let myPlayers = existingPlayers ? JSON.parse(existingPlayers) : [];
        
//         let playerOriginalName = document.querySelector(".sayYourName").value;
//         const errorMessage = document.querySelector(".error-message-namecheck");
        
//         if(!playerOriginalName){
//             if(checknamewarrning){
//                 const errorMessageP = document.createElement("p");
//                 errorMessageP.textContent = "You did not say your name.";
//                 errorMessageP.classList.add("error-message-namecheck");
//                 const form = document.querySelector("form");
//                 form.appendChild(errorMessageP);
//                 checknamewarrning = false;
                
//             }  
//         } else if (errorMessage) {
//             errorMessage.parentNode.removeChild(errorMessage);
//             checknamewarrning = true;
//         }
        
//         let playerObjID = ({
//             id: uuidv4(),
//             name: playerOriginalName,
//             playerScore: 0,            
//         })

//         myPlayers.push(playerObjID);        
//         localStorage.setItem("Player", JSON.stringify(myPlayers));

//         // Cant click on a href in form, this fix the button for start of the game
//         if(checkmap && playerOriginalName){
//             window.location.href = `index.html#${playerObjID.id}`;
//         } else if(!checkmap) {
//             if(checkmapwarrning){
//                 const newDiv = document.createElement("div");
//                 const newSpan = document.createElement("span");
//                 newSpan.textContent = "You did not pick playgraund, please do so.";
//                 newSpan.classList.add("warnigForMap");
//                 newDiv.appendChild(newSpan);
//                 document.body.appendChild(newDiv);
//                 checkmapwarrning = false;                
//             }            
//         } else if(checkmap) {
//             const removenewDiv = document.querySelector('.warnigForMap');
//             if(removenewDiv){
//                 removenewDiv.parentNode.removeChild(removenewDiv);
//                 checkmapwarrning = true;
//             }            
//         }          
//     });  
// })

document.addEventListener("submit", function(e){
    

    e.preventDefault();

    let existingPlayers = localStorage.getItem("Player");
    let myPlayers = existingPlayers ? JSON.parse(existingPlayers) : [];
    
    let playerOriginalName = document.querySelector(".sayYourName").value;
    const errorMessage = document.querySelector(".error-message-namecheck");

    if(!playerOriginalName){
        if(checknamewarrning){
            const errorMessageP = document.createElement("p");
            errorMessageP.textContent = "You did not say your name.";
            errorMessageP.classList.add("error-message-namecheck");
            const form = document.querySelector("form");
            form.appendChild(errorMessageP);
            checknamewarrning = false;
            
        }  
    } else if (errorMessage) {
        errorMessage.parentNode.removeChild(errorMessage);
        checknamewarrning = true;
    }
    
    let playerObjID = ({
        id: uuidv4(),
        name: playerOriginalName,
        playerScore: 0,            
    })
    if(checkmap && playerOriginalName){
        myPlayers.push(playerObjID);        
        localStorage.setItem("Player", JSON.stringify(myPlayers));
    }
    
    // Cant click on a href in form, this fix the button for start of the game
    if(checkmap && playerOriginalName){
        window.location.href = `index.html#${playerObjID.id}`;
    } else if(!checkmap) {
        if(checkmapwarrning){
            const newDiv = document.createElement("div");
            const newSpan = document.createElement("span");
            newSpan.textContent = "You did not pick playgraund, please do so.";
            newSpan.classList.add("warnigForMap");
            newDiv.appendChild(newSpan);
            document.body.appendChild(newDiv);
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