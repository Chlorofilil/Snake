// let canvas = document.querySelector("#ManualCanvas");
// let ctx = canvas.getContext("2d");

// // const scaleCanvas = 0.2;
// // canvas.width *= scaleCanvas;
// // canvas.height *= scaleCanvas;

// // ctx.scale(scaleCanvas, scaleCanvas);

//DRAWING MAP-CANVAS ON MANUAL PAGE
function gameLoop(){
    DrawingPlayGround();
    setTimeout(gameLoop, 1000 / fps);
};

gameLoop();
