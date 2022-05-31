const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d'); //detta gör att vi kan använda inbyggda canvas-metoder och vi kan anropa dem på ctx
canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angle = 0; //få fågeln att röra sig något upp och ner när den är inaktiv
let frame = 0; //hålla reda på antalet bildrutor i vår animation slinga så att vi kan lägga till eventuella periodiska triggers till vårt spel
let score = 0;
let gameSpeed = 2; //flytta hinder och bakgrund i samma hastighet

/* --------------------------- Bakgrundsbild ---------------------*/
const background = new Image();
background.src = './Image/realBackground.png' ;
const realBackground = { 
    x1:0,
    x2:canvas.width,
    y:0,
    width:canvas.width,
    height:canvas.height
}
function handlebackground(){
    if (realBackground.x1 <= -realBackground.width + gameSpeed) realBackground.x1 = realBackground.width;
    else (realBackground.x1 -= gameSpeed);
    if (realBackground.x2 <= -realBackground.width + gameSpeed)realBackground.x2 = realBackground.width;
    else(realBackground.x2 -= gameSpeed);
    ctx.drawImage(background, realBackground.x1, realBackground.y, realBackground.width, realBackground.height);
    ctx.drawImage(background, realBackground.x2, realBackground.y, realBackground.width, realBackground.height);

    /*
    om bakgrund bilden rullas hela vägen till vänster så att hela dess bredd är gömd bakom den vänstra kanten av duken, 
    flytta den snabbt och dölj den bakom den högra kanten av duken så att vi kan skjuta den till vänster igen. 
    */
     
}
/*---------------------------- Anropar funktionerna ------------------------------------*/
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
    if(handleCollisions()) return; // om fågeln kolliderar med något hinder så fryser spelet
    requestAnimationFrame(animate);
    angle+=0.12; // perioden för sin kurvan blir längre när det är mindre värde
    frame++; 

    /*
    requestAnimationFrame i funktionen animate kommer att skapa vår animations slinga genom 
    ett program som i princip kallas rekursion där funktion bara kör sin kod och sedan anropar sig själv inifrån sig själv om och om igen
    */
}
animate();
/*--------------------------------------- Eventlistner för space --------------------------------*/
window.addEventListener('keydown', function(e) {
    if (e.code === 'Space') spacePressed = true;
});

window.addEventListener('keyup', function(e) {
    if (e.code === 'Space') spacePressed = false;
    bird.frameX = 0;
});

/*----------------------------- Kollisionsdetektering ----------------------------*/

const bang = new Image();
bang.src = './Image/bang.png';
function handleCollisions(){
    for (let i = 0; i < obstaclesArray.length; i++){
        if (bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
            bird.x + bird.width > obstaclesArray[i].x &&
            ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) || 
            (bird.y > canvas.height - obstaclesArray[i].bottom && 
            bird.y + bird.height < canvas.height))){
                // kollision hittad
                playExplosion() 
                // Spelar ljudet explosion när kollision hittas (audio.js)
                ctx.drawImage(bang, bird.x, bird.y, 50, 50);
                ctx.font = "25px Georgia";
                ctx.fillStyle = 'red';
                ctx.fillText('Game Over', 250, canvas.height/2 - 10);
                ctx.fillText('Your score is: ' + score, 230, canvas.height/2 + 25)
                

                return true;
            }
    }
}

