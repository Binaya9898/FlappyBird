console.log("I am BInaya");
var canvas = document.getElementById("canvas");
console.log(canvas);
canvas.style.position = "fixed";
canvas.height = window.innerHeight;
// canvas.width = 2500;
canvas.width = window.innerWidth;
var x = 0;
var y = 0;
var velocity = 0;
var gravity = 0.1;
var hasCollided=false;
var score=0;
const drawer = canvas.getContext("2d");

var box = {
  top: canvas.height/2,
  left: 60,
  width: 50,
  height: 50,
};

const pipeVerticalGap = 400;
const pipeHorizontalGap = 300;
const pipeWidth = 50;

var pipes=[];
for(var i=0;i<10;i++){
    pipes.push(givePipe());
    if(!hasCollided){
        score++;
        console.log(score);
    }
}


function drawBox(box, color) {
  drawer.fillStyle = color;
  drawer.fillRect(box.left, box.top, box.width, box.height);
}

setInterval(() => {
    if(hasCollided){
        drawer.fillText("Game Over ",canvas.width/2,canvas.height/2);
       setTimeout(()=>location.reload(),1000);
       return;
    }

    
  drawer.clearRect(0, 0, canvas.width, canvas.height);
  velocity = velocity + gravity;

  if (box.top < 0) {
    box.top = 0;
    velocity = 0;
  }

  if (box.top > canvas.height - box.height) {
    box.top = canvas.height - box.height;
    // velocity=velocity+gravity;
    velocity = 0;
  }
  box.top = box.top + velocity;
  drawBox(box, "green");
  for(var i=0;i<pipes.length;i++){
      var pipe=pipes[i];
      pipe.topPipe.left=pipe.topPipe.left-1;
      pipe.bottomPipe.left--;

      drawBox(pipe.topPipe, "red");
      drawBox(pipe.bottomPipe, "red");
      if(pipe.topPipe.left<-50){
        // pipes.shift();
        pipes.push(givePipe());
      }
      checkCollision(pipe.topPipe,box);
      checkCollision(pipe.bottomPipe,box);
      drawBox(box,hasCollided? "pink":"green");

      

  }
}, 10);

window.addEventListener("keydown", function (e) {
  if (e.key == " ") velocity = velocity - 5;

  

  

});

function givePipe(){
    var topPipeHeight=giveRandomNmbr(20,canvas.height-pipeVerticalGap);
    var leftoffset=box.left+200;
    //pipes array empty xa vane
    if(pipes.length==0){

    }
    else{
        var lastPipe=pipes[pipes.length-1];
        leftoffset=lastPipe.topPipe.left+pipeHorizontalGap;

    }


    return {
         
            topPipe: {
              top: 0,
              left: leftoffset,
              width: pipeWidth,
              height: topPipeHeight,
            },
            bottomPipe: {
              top: topPipeHeight + pipeVerticalGap,
              left: leftoffset,
              width: 50,
              height: canvas.height - topPipeHeight - pipeVerticalGap,
            }
         
        
    }

}

function giveRandomNmbr(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;

}

function checkCollision(box1,box2){
    if(box1.left<box2.left+box2.width && 
        box1.left+box1.width>box2.left &&
        box1.top<box2.top+box2.height &&
        box1.height+box1.top>box2.top){
console.log("collided");
hasCollided=true;

return;

        }
}
