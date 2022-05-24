const birdSprite = new Image();
birdSprite.src='./Image/fågel2.png';

class Bird {
    /*
    Fågeln är en klass för att representera sin position och begränsningar i spelområdet.
    */
    constructor(){
        this.x = 150;
        this.y = 200;
        this.vy = 0; //detta kommer att avgöra vertikal hastighet för fågeln, hur snabbt den faller och rör sig uppåt
        this.originalWidth = 700;
        this.originalHeight = 596;
        this.width = this.originalWidth/20;
        this.height = this.originalHeight/ 20;
        this.weight = 1; // kraften som drar ner fågeln
        this.frameX = 0;
    }
    update(){
        let curve = Math.sin(angle) * 20; // svävar som en sin kurva med amplituden 20
        if (this.y > canvas.height - (this.height * 2) + curve){ // begränsningar för att se till att spelaren alltid håller sig inom arbetsytan
            this.y = canvas.height - (this.height * 2) + curve;
            this.vy = 0; // ej fortsätter att falla
            
        /*
        Denna kod ser till att fågeln inte gå under spelområdet. Alltså om vertikala 
        positionen av fågeln börjar gå under spelområdets bottem så ska den hålla sig vid den vertikala position och sväva. 
        */
        
        } else {
            this.vy += this.weight;
            this.vy *= 0.8 ;
            this.y += this.vy;
            
            /*  
            vad dessa rader gör är att få spelaren att falla
            och ju längre den faller desto snabbare faller den eftersom vy ökar och
            endely för varje bildruta och samtidigt vy läggs till spelare vertikalt
            position som gör att den rör sig nedåt
            */

        }
        if (this.y < 0) {
            this.y = 0 ;
            this.vy = 0;
            /* Samma grund som linje 21 till 23. Den går inte över spelområdet på övre delen*/
        }
        if (spacePressed && this.y > this.height) this.flap(); // fågeln rör sig uppet då space är tryckt på
    }
    draw(){
        ctx.fillStyle = 'red';
        //ctx.fillRect(this.x, this.y, this.width, this.height); //Hitbox
        ctx.drawImage(birdSprite, this.frameX * this.originalWidth, 0, this.originalWidth, this.originalHeight, this.x - 8, this.y - 16, 
            this.width * 1.7, this.height * 1.7)
        /* 
        Ser till att kollisionen händer när fågeln nuddar hindern när halva kroppen går igenom.
        */

    }
    flap(){
        this.vy -= 5; // varje gång vi slår kommer hastigheten att minska med fem, vilket ger spelaren en push uppåt
        if (this.frameX >= 2) this.frameX = 0;
        else this.frameX ++;
    }
}
const bird = new Bird();