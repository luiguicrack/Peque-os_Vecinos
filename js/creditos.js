const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

/* VOLUMEN */

music.volume = 0.2;

/* AUTOPLAY */

window.addEventListener("click", () => {

    music.play();

}, { once:true });

/* BOTÓN */

let playing = true;

musicBtn.addEventListener("click", () => {

    if(playing){

        music.pause();

        musicBtn.innerHTML = "🔇";

    }else{

        music.play();

        musicBtn.innerHTML = "🔊";
    }

    playing = !playing;

});