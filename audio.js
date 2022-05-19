document.addEventListener('keydown', function(e) {
    if (e.keyCode == 65) {
      document.getElementById('audio2').play();
    }
  });

/* Spelar ljudet audio2 (Speedball2) när tangenten 'A' trycks ned. */

function playExplosion() {
    var audio1 = new Audio('mixkit-sea-mine-explosion-1184.wav');
    audio1.play();
}

/* Funktion som spelar ljudet explosion när den kallas. */