const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angle = 0;
     
let frame = 0;
let score = 0;
let gameSpeed = 2;

const background = new Image();
background.src = './Image/realBackground.png' ;
const bakgrund = { 
    x1:0,
    x2:canvas.width,
    y:0,
    width:canvas.width,
    height:canvas.height
    
         }
function handlebackground(){
    if (bakgrund.x1 <= -bakgrund.width + gameSpeed / 2) bakgrund.x1 = bakgrund.width;
     else (bakgrund.x1 -= gameSpeed / 2);
     if (bakgrund.x2 <= -bakgrund.width + gameSpeed / 2)bakgrund.x2 = bakgrund.width;
     else(bakgrund.x2 -= gameSpeed / 2);
     ctx.drawImage(background, bakgrund.x1, bakgrund.y, bakgrund.width, bakgrund.height);
     ctx.drawImage(background, bakgrund.x2, bakgrund.y, bakgrund.width, bakgrund.height);
     
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillRect(10, canvas.height - 90, 50, 50);
    handlebackground();
    handleObstacles();
    bird.update();
    bird.draw();
    
    ctx.fillStyle = 'red';
    ctx.font = '90px Georgia';
    ctx.strokeText(score, 450, 70);
    ctx.fillText(score, 450, 70);
    handleCollisions();
    if(handleCollisions()) return;
    requestAnimationFrame(animate);
    angle+=0.12;
    frame++; 

}
animate();

window.addEventListener('keydown', function(e) {
    if (e.code === 'Space') spacePressed = true;
});

window.addEventListener('keyup', function(e) {
    if (e.code === 'Space') spacePressed = false;
    bird.frameX = 0;
});

const bang = new Image();
bang.src = './Image/bang.png'; //./Image/bang.png
function handleCollisions(){
    for (let i = 0; i < obstaclesArray.length; i++){
        if (bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
            bird.x + bird.width > obstaclesArray[i].x &&
            ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) || 
            (bird.y > canvas.height - obstaclesArray[i].bottom && 
            bird.y + bird.height < canvas.height))){
                // kollision hittad
                playExplosion()
                ctx.drawImage(bang, bird.x, bird.y, 50, 50);
                ctx.font = "25px Georgia";
                ctx.fillStyle = 'red';
                ctx.fillText('Game Over', 250, canvas.height/2 - 10);
                ctx.fillText('Your score is: ' + score, 230, canvas.height/2 + 25)
                ctx.fillText('Press ctrl+r to restart', 200, canvas.height/1.5 - 10)

                return true;
            }
    }
}

