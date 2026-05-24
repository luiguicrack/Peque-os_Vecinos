/* ── MÚSICA ─────────────────────── */
const music    = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

music.volume = 0.2;

window.addEventListener("click", () => {
    music.play().catch(() => {});
}, { once: true });

let playing = true;

musicBtn.addEventListener("click", () => {
    if (playing) {
        music.pause();
        musicBtn.innerHTML = "🔇";
    } else {
        music.play();
        musicBtn.innerHTML = "🔊";
    }
    playing = !playing;
});

/* ── DIÁLOGOS ───────────────────── */

const steps = [

    /* PASO 1 — solo globo arriba */
    {
        top: `
            <h2>¡HOLA!</h2>
            <p>Soy PANCHO la rata</p>
            <div class="tail tail-right"></div>
        `,
        bottom: null
    },

    /* PASO 2 — arriba se mantiene, abajo aparece */
    {
        top: `
            <h2>¡HOLA!</h2>
            <p>Soy PANCHO la rata</p>
            <div class="tail tail-right"></div>
        `,
        bottom: `
            <p>y tengo muchas<br>
            historias que contarte.</p>
            <div class="tail tail-left"></div>
        `
    },

    /* PASO 3 — arriba cambia, abajo se mantiene */
    {
        top: `
            <p>Aunque la ciudad<br>
            es nuestro hogar,</p>
            <div class="tail tail-right"></div>
        `,
        bottom: `
            <p>y tengo muchas<br>
            historias que contarte.</p>
            <div class="tail tail-left"></div>
        `
    },

    /* PASO 4 — arriba se mantiene, abajo cambia */
    {
        top: `
            <p>Aunque la ciudad<br>
            es nuestro hogar,</p>
            <div class="tail tail-right"></div>
        `,
        bottom: `
            <p>muchos animales<br>
            enfrentan problemas.</p>
            <div class="tail tail-left"></div>
        `
    },

    /* PASO 5 — globo centrado, abajo desaparece */
    {
        top: `
            <h2>¿Te ANIMAS</h2>
            <p>a descubrirlos conmigo?</p>
            <div class="tail tail-right"></div>
        `,
        bottom: null,
        topPosition: "dialog-center"
    }
];

/* ── REFERENCIAS ────────────────── */
const continueBtn = document.getElementById("continueBtn");
const dialog1     = document.getElementById("dialog1");
const dialog2     = document.getElementById("dialog2");

let currentStep = 0;

/* ── FADE HELPER ─────────────────── */
/*
  fadeSwap(el, newHTML, position)
    - Si el elemento está visible y el contenido cambia → fade out → cambia → fade in
    - Si el elemento estaba oculto → solo fade in
    - Si el contenido es igual → no hace nada (se mantiene sin animación)
    - Si newHTML es null → fade out y oculta
  position: "dialog-left" | "dialog-right"
*/
function fadeSwap(el, newHTML, position) {

    const isSameContent = el.dataset.content === newHTML;
    const isVisible     = !el.classList.contains("hidden");

    /* Sin cambio → no tocar */
    if (isSameContent && isVisible) return;

    /* Ocultar → también sin cambio */
    if (newHTML === null) {
        if (!isVisible) return;
        el.style.animation = "none";
        el.style.opacity   = "1";
        el.animate(
            [{ opacity: 1 }, { opacity: 0 }],
            { duration: 300, easing: "ease", fill: "forwards" }
        ).onfinish = () => {
            el.className      = "dialog-box hidden";
            el.style.opacity  = "";
            el.style.animation = "";
            el.dataset.content = "";
        };
        return;
    }

    /* Función que aplica el nuevo contenido con fade in */
    function applyNew() {
        el.className = "dialog-box hidden";
        el.style.opacity   = "0";
        el.style.animation = "none";

        el.innerHTML        = newHTML;
        el.dataset.content  = newHTML;
        el.classList.add(position);
        el.classList.remove("hidden");

        el.animate(
            [
                { opacity: 0, transform: "translateY(14px)" },
                { opacity: 1, transform: "translateY(0)"    }
            ],
            { duration: 400, easing: "ease", fill: "forwards" }
        ).onfinish = () => {
            el.style.opacity   = "";
            el.style.animation = "";
        };
    }

    /* Si estaba visible y cambia → fade out primero */
    if (isVisible && !isSameContent) {
        el.animate(
            [{ opacity: 1 }, { opacity: 0 }],
            { duration: 280, easing: "ease", fill: "forwards" }
        ).onfinish = applyNew;
    } else {
        /* Estaba oculto → directo al fade in */
        applyNew();
    }
}

/* ── MOSTRAR PASO ─────────────────── */
function showStep(index) {

    const step = steps[index];

    fadeSwap(dialog1, step.top,    step.topPosition || "dialog-left");
    fadeSwap(dialog2, step.bottom, "dialog-right");
}

/* ── CONTINUAR ───────────────────── */
continueBtn.addEventListener("click", () => {

    currentStep++;

    if (currentStep >= steps.length) {
        currentStep = steps.length - 1;
        return;
    }

    showStep(currentStep);
});

/* ── INICIO ──────────────────────── */
showStep(currentStep);