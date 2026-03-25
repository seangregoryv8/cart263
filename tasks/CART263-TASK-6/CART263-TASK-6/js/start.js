window.onload = go_all_stuff;

function go_all_stuff(){
console.log("go");

/* for loading the video */
let videoEl = document.getElementById("video-birds");
window.addEventListener("click", function(){
    if(videoEl.currentTime ===0){
        videoEl.play()
    }
})

videoEl.loop = true;

let theCanvases = document.querySelectorAll(".canvases");
let theContexts =[];
//add a context for each canvas and put into an array

for(let i =0; i<theCanvases.length; i++){
    let context = theCanvases[i].getContext("2d");
    theContexts.push(context);
}

let drawingBoardA = new DrawingBoard(theCanvases[0],theContexts[0],theCanvases[0].id);
//add a circular object to canvas A

drawingBoardA.addObj(new CircularObj(100,100,20,"#FFC300","#E6E6FA", drawingBoardA.context))
drawingBoardA.display();



let drawingBoardB = new DrawingBoard(theCanvases[1],theContexts[1],theCanvases[1].id);
//add a rectangular object to canvas B
drawingBoardB.addObj(new RectangularObj(100,100,50,70,"#FF5733","#E6E6FA",drawingBoardB.context))
drawingBoardB.display();

let drawingBoardC = new DrawingBoard(theCanvases[2],theContexts[2],theCanvases[2].id);
//add a freestyle object to canvas C
drawingBoardC.addObj(new FreeStyleObj(-100,100,500,"#CF9FFF","#CF9FFF", drawingBoardC.context))
drawingBoardC.display();

let drawingBoardD = new DrawingBoard(theCanvases[3],theContexts[3],theCanvases[3].id);
drawingBoardD.addObj(new VideoObj(0,0,400,300,videoEl,drawingBoardD.context))
drawingBoardD.display();


/*** RUN THE ANIMATION LOOP  */
window.requestAnimationFrame(animationLoop);

function animationLoop(){
    /*** CALL THE EACH CANVAS TO ANIMATE INSIDE  */
    drawingBoardA.animate();
    drawingBoardB.animate();
    drawingBoardC.animate();
    drawingBoardD.run(videoEl)
    window.requestAnimationFrame(animationLoop);
}

window.AudioContext = window.AudioContext || window.webkitAudioContext;

/** TASK 4:(Video - recorded - )
 * 2: Next: apply the same logic to enable the other 3 possible filters (adding the event listeners etc)
 * -> make sure to look at the input/output ranges for the values
 * 3: -> apply the context filters  to the video for the three filter options (and activate the blur as well)
 * 4: ->  using the mousemove event listener (already applied in the drawing board) - 
 * make the rectangle (over the video) - follow the mouse ... AND change color when you click on the canvas
 * USE & FILL IN THE METHODS ALREADY set out in the VideoObj class...
 * 
 * 
 * PLEASE NOTE: there will be marks taken off if you ignore the instructions ;)
 *  
 */




}