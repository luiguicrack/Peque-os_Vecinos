/*
 * Pequeños Vecinos — script.js
 * Maneja: flotación animada, hover con scale, drag & drop, regreso a posición original
 */

const animals = document.querySelectorAll(".animal");

animals.forEach(animal => {

    /* ── Estado ───────────────────────────────────────────── */
    let isDragging = false;
    let isHovered  = false;
    let offsetX, offsetY;
    let rafId;                    // requestAnimationFrame ID para la flotación

    // Valores de la animación flotante
    let floatY    = 0;            // desplazamiento actual en px
    let floatDir  = 1;            // 1 = subiendo, -1 = bajando
    const FLOAT_MAX   = 8;        // px máximo de elevación
    const FLOAT_SPEED = 0.07;     // velocidad (px por frame)

    /* ── Guardamos posición original al cargar ────────────── */
    // Esperamos un frame para que el layout esté listo
    requestAnimationFrame(() => {
        const s = window.getComputedStyle(animal);
        animal.dataset.origLeft   = s.left;
        animal.dataset.origBottom = s.bottom;
    });

    /* ── Flotación (requestAnimationFrame) ───────────────── */
    function animateFloat() {
        // Si está en hover o siendo arrastrado, no flotar
        if (isHovered || isDragging) return;

        floatY += FLOAT_SPEED * floatDir;

        if (floatY >= FLOAT_MAX) { floatY = FLOAT_MAX; floatDir = -1; }
        if (floatY <= 0)         { floatY = 0;         floatDir =  1; }

        animal.style.transform = `translateY(${-floatY}px) scale(1)`;
        rafId = requestAnimationFrame(animateFloat);
    }

    function startFloat() {
        cancelAnimationFrame(rafId);
        floatY   = 0;
        floatDir = 1;
        rafId = requestAnimationFrame(animateFloat);
    }

    // Arrancamos la flotación al cargar
    startFloat();

    /* ── HOVER ────────────────────────────────────────────── */
    animal.addEventListener("mouseenter", () => {
        if (isDragging) return;

        isHovered = true;
        cancelAnimationFrame(rafId);  // detiene la flotación

        // Transición suave solo para el hover (transform)
        animal.style.transition = "transform 0.25s ease";
        animal.style.transform  = "translateY(-12px) scale(1.18)";
        animal.style.zIndex     = "50";
    });

    animal.addEventListener("mouseleave", () => {
        if (isDragging) return;

        isHovered = false;

        // Vuelve a escala normal con transición
        animal.style.transition = "transform 0.25s ease";
        animal.style.transform  = "translateY(0px) scale(1)";
        animal.style.zIndex     = "10";

        // Espera a que termine la transición y retoma la flotación
        setTimeout(() => {
            // Limpiamos la transición de transform para que la flotación sea fluida
            animal.style.transition = "left 0.6s ease, bottom 0.6s ease, top 0.6s ease";
            startFloat();
        }, 270);
    });

    /* ── DRAG — mousedown ─────────────────────────────────── */
    animal.addEventListener("mousedown", (e) => {
        e.preventDefault();   // evita arrastre nativo del navegador

        isDragging = true;
        isHovered  = false;
        cancelAnimationFrame(rafId);

        animal.classList.add("dragging");
        animal.style.transition = "none";
        animal.style.zIndex     = "100";

        const rect = animal.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
    });

    /* ── DRAG — mousemove (en document para no perder el cursor) ── */
    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        animal.style.left      = `${x}px`;
        animal.style.top       = `${y}px`;
        animal.style.bottom    = "auto";
        animal.style.transform = "scale(1.1) rotate(2deg)";   // feedback visual al arrastrar
    });

    /* ── DRAG — mouseup ───────────────────────────────────── */
    document.addEventListener("mouseup", () => {
        if (!isDragging) return;

        isDragging = false;
        animal.classList.remove("dragging");
        animal.style.zIndex = "10";

        // Activamos transición para el regreso suave
        animal.style.transition = "transform 0.35s ease, left 0.6s ease, bottom 0.6s ease, top 0.6s ease";
        animal.style.transform  = "scale(1) rotate(0deg)";

        // Regresa a posición CSS original
        animal.style.left   = animal.dataset.origLeft   || "";
        animal.style.bottom = animal.dataset.origBottom || "";
        animal.style.top    = "";

        // Reinicia flotación cuando termine la animación de regreso
        setTimeout(() => {
            animal.style.transition = "left 0.6s ease, bottom 0.6s ease, top 0.6s ease";
            startFloat();
        }, 650);
    });

});

/* ── MÚSICA ───────────────────────────────────────────────── */
const music = document.getElementById("bgMusic");
if (music) {
    music.volume = 0.2;
}

document.addEventListener("click", () => {

    if (music.paused) {

        music.play();
    }

}, { once:true });

/* ── BOTÓN MÚSICA ───────────────────────── */

const musicBtn =
document.getElementById("musicBtn");

let musicPlaying = true;

musicBtn.addEventListener("click", () => {

    if(music.paused){

        music.play();

        musicBtn.innerHTML = "🔊";

        musicPlaying = true;

    }else{

        music.pause();

        musicBtn.innerHTML = "🔇";

        musicPlaying = false;
    }

});