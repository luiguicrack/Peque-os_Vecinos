/* AUDIO */

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

music.volume = 0.2;

window.addEventListener("click", () => {
    music.play().catch(() => {});
}, { once:true });

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