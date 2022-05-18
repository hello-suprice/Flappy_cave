function playMusic() {
    var x = document.getElementById("audio2").autoplay;
    document.getElementById("demo").innerHTML = x;
}

function playExplosion() {
    var audio1 = new Audio('mixkit-sea-mine-explosion-1184.wav');
    audio1.play();
}

playMusic();