const obstaclesArray = [];

class Obstacle{
    constructor(){
        this.top = (Math.random() * canvas.height/3) + 40;
        this.bottom = (Math.random() * canvas.height/3) + 40;
        this.x = canvas.width;
        this.width = 30;
        this.color = 'black'
        this.counted = false;
    }
    draw(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, 0, this.width, this.top); //ritar ut hinder för den övre. börjar från O (dvs toppen) ner till hur lång den ska vara.
        ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom); // Ritar ut hindern för den undre. Börjar från 400 (bottnet) upp till hur lång den ska vara.

    }
    update(){
        this.x -= gameSpeed; // hinderna rör sig åt vänster
        if (!this.counted && this.x < bird.x){
            score++;
            this.counted = true;


            /*
            Om den räknade punkten är falsk och samtidigt är "this.x" mindre än "bird.x", vilket betyder att vi har tagit oss 
            förbi hindret och först då ökar poängen med ett genom att säga "score++". "this.counted" kommer också bli till
            sant så att just detta hinder har redan räknats med i vår poäng, eftersom denna "if statment" bara anges
            när "this.counted" är falskt kommer detta hinder inte att kunna öka poängen igen.
 
            */
        }
        this.draw();
    }
}

function handleObstacles(){
    if (frame%100 ===0) { //ritar ut hinder var 100:e frame
        obstaclesArray.unshift(new Obstacle); 

        /*
        Den här metoden tar vad vi än skickar till den som ett attribut och lägger till det som ett nytt objekt i början av en array som vi anropar den. 
        Det kommer att passera ett nytt hinder, nytt nyckelord och kommer att skapa ett nytt tomt objekt och ge det attribut och egenskaper baserat 
        på ritning som vi deklarerade i partikelklasskonstruktorn på rad 4.
         */

       
    }
    for (let i = 0; i < obstaclesArray.length; i++){ // cykla bara igenom hela hinderarrayen och anrop uppdateringsmetoden som kommer att beräkna aktuell position för varje hinder
        obstaclesArray[i].update();
    }
    if (obstaclesArray.length > 17 ){ //Det kanske blir ett problem om arrayen växer oändligt.
        obstaclesArray.pop(obstaclesArray[0]);
    }
}


