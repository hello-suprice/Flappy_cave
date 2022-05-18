const birdSprite = new Image();
birdSprite.src='./Image/fågel2.png';

class Bird {
    constructor(){
        this.x = 150;
        this.y = 200;
        this.vy = 0;
        this.originalWidth = 700;
        this.originalHeight = 596;
        this.width = this.originalWidth/20;
        this.height = this.originalHeight/ 20;
        this.weight = 1;
        this.frameX = 0;
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
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(birdSprite, this.frameX * this.originalWidth, 0, this.originalWidth, this.originalHeight, this.x - 8, this.y - 16, 
            this.width * 1.7, this.height * 1.7)
    }
    flap(){
        this.vy -= 5;
        if (this.frameX >= 3) this.frameX = 0;
        else this.frameX ++;
    }
}
const bird = new Bird();