const music = document.getElementById("bgMusic");
const kids = document.getElementById("kidsSound");
const musicBtn = document.getElementById("musicBtn");

// 🔊 volúmenes
music.volume = 0.3;   // principal
kids.volume = 0.15;   // 👈 más bajito (ambiente)

// ▶️ activar en primer click
window.addEventListener("click", () => {
    music.play().catch(() => {});
    kids.play().catch(() => {});
}, { once:true });

let playing = true;

// 🔘 botón controla ambos
musicBtn.addEventListener("click", () => {

    if(playing){
        music.pause();
        kids.pause();
        musicBtn.innerHTML = "🔇";
    }else{
        music.play();
        kids.play();
        musicBtn.innerHTML = "🔊";
    }

    playing = !playing;
});
