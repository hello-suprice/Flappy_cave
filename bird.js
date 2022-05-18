const birdSprite = new Image();
birdSprite.src='frame--1.png';

class Bird {
    constructor(){
        this.x = 150;
        this.y = 200;
        this.vy = 0;
        this.originalWidth = 717;
        this.originalHeight = 610;
        this.width = this.originalWidth/20;
        this.height = this.originalHeight/ 20;
        this.weight = 1;
    }
    update(){
        let curve = Math.sin(angle) * 20;
        if (this.y > canvas.height - (this.height * 2) + curve){
            this.y = canvas.height - (this.height * 2) + curve;
            this.vy = 0;
        } else {
            this.vy += this.weight;
            this.vy *= 0.8;
            this.y += this.vy;
        }
        if (this.y < 0 + this.height) {
            this.y = 0 + this.height;
            this.vy = 0;
        }
        if (spacePressed && this.y > this.height * 1) this.flap();
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(birdSprite, 0, 0, this.originalWidth, this.originalHeight, this.x, this.y, 
            this.width, this.height)
    }
    flap(){
        this.vy -=5;
    }
}
const bird = new Bird();


//let Bird1 = new Image ();
//Bird1.src = './Image/birdDown.png' ;
//const Bird1 = { 
//    x:150,
//    y:200,
//    width:20,
//    height:20,
//    weight:1,
//    
//         }
//ctx.drawImage(Bird1, birdx, birdy, 50, 50)
//while (gameOver = false) {
    // Byt mellan fågelbilderna i intervall på 2 sekunder


//}