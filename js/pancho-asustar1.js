const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

music.volume = 0.2;

window.addEventListener("click", () => {
    music.play();
}, { once:true });

musicBtn.addEventListener("click", () => {

    if(music.paused){
        music.play();
        musicBtn.innerHTML = "🔊";
    }else{
        music.pause();
        musicBtn.innerHTML = "🔇";
    }

});