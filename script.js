const audio = document.getElementById('audio');
const btn = document.getElementById('playBtn');

btn.addEventListener('click', async () => {
  try {
    if (audio.paused) {
      await audio.play();
    } else {
      audio.pause();
    }
  } catch (error) {
    btn.textContent = 'No se pudo reproducir';
  }
});

audio.addEventListener('play', () => {
  btn.textContent = 'Ⅱ Pausar sonido';
  btn.classList.add('playing');
});

audio.addEventListener('pause', () => {
  btn.textContent = audio.currentTime > 0 ? '▶ Continuar sonido' : '▶ Escuchar su sonido';
  btn.classList.remove('playing');
});

audio.addEventListener('ended', () => {
  btn.textContent = '▶ Escuchar nuevamente';
  btn.classList.remove('playing');
});
/* =====================================================
   NAVEGACIÓN ENTRE ESPECIES
===================================================== */

(() => {
  function crearNavegacionEspecies() {
    const especies = [
      {
        carpeta: "carpintero-negro",
        nombre: "Carpintero Negro",
        enlace: "../carpintero-negro/"
      },
      {
        carpeta: "puma",
        nombre: "Puma",
        enlace: "../puma/"
      },
      {
        carpeta: "flamenco",
        nombre: "Flamenco Chileno",
        enlace: "../Flamenco/"
      },
      {
        carpeta: "condor",
        nombre: "Cóndor Andino",
        enlace: "../condor/"
      },
      {
        carpeta: "guanaco",
        nombre: "Guanaco",
        enlace: "../guanaco/"
      },
      {
        carpeta: "martin-pescador",
        nombre: "Martín Pescador",
        enlace: "../martin-pescador/"
      }
    ];

    const partesRuta = window.location.pathname
      .split("/")
      .filter(Boolean);

    let carpetaActual =
      partesRuta[partesRuta.length - 1]?.toLowerCase() || "";

    if (carpetaActual === "index.html") {
      carpetaActual =
        partesRuta[partesRuta.length - 2]?.toLowerCase() || "";
    }

    const posicionActual = especies.findIndex(
      especie => especie.carpeta === carpetaActual
    );

    if (
      posicionActual === -1 ||
      document.querySelector(".navegacion-especies")
    ) {
      return;
    }

    const posicionAnterior =
      (posicionActual - 1 + especies.length) % especies.length;

    const posicionSiguiente =
      (posicionActual + 1) % especies.length;

    const especieAnterior = especies[posicionAnterior];
    const especieSiguiente = especies[posicionSiguiente];

    const estilos = document.createElement("style");

    estilos.id = "estilos-navegacion-especies";

    estilos.textContent = `
      .navegacion-especies {
        position: fixed;
        left: 50%;
        bottom: max(18px, env(safe-area-inset-bottom));
        z-index: 9999;
        width: min(920px, calc(100% - 34px));
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
        align-items: center;
        gap: 8px;
        padding: 8px;
        background: rgba(7, 13, 9, 0.88);
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 999px;
        box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        transform: translateX(-50%);
      }

      .navegacion-especies a {
        min-height: 48px;
        display: flex;
        align-items: center;
        gap: 11px;
        padding: 10px 18px;
        color: #ffffff;
        border-radius: 999px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.7px;
        text-decoration: none;
        transition:
          background 0.25s ease,
          color 0.25s ease,
          transform 0.25s ease;
      }

      .navegacion-especies a:hover {
        background: rgba(255, 255, 255, 0.12);
      }

      .navegacion-anterior {
        justify-content: flex-start;
      }

      .navegacion-siguiente {
        justify-content: flex-end;
        text-align: right;
      }

      .volver-coleccion {
        justify-content: center;
        background: #f6f5ef;
        color: #071009 !important;
        padding-left: 24px !important;
        padding-right: 24px !important;
        text-transform: uppercase;
        letter-spacing: 1.2px !important;
      }

      .volver-coleccion:hover {
        background: #c7e65b !important;
        transform: translateY(-2px);
      }

      .flecha-navegacion {
        color: #c7e65b;
        font-size: 20px;
        line-height: 1;
      }

      .volver-coleccion .flecha-navegacion {
        color: #071009;
        font-size: 15px;
      }

      @media (max-width: 700px) {
        .navegacion-especies {
          width: calc(100% - 22px);
          bottom: max(11px, env(safe-area-inset-bottom));
          grid-template-columns: 48px minmax(0, 1fr) 48px;
          padding: 6px;
        }

        .navegacion-especies a {
          min-height: 44px;
          padding: 8px;
        }

        .texto-especie {
          display: none;
        }

        .navegacion-anterior,
        .navegacion-siguiente {
          justify-content: center;
        }

        .volver-coleccion {
          padding-left: 12px !important;
          padding-right: 12px !important;
          font-size: 10px !important;
        }
      }
    `;

    document.head.appendChild(estilos);

    const navegacion = document.createElement("nav");

    navegacion.className = "navegacion-especies";
    navegacion.setAttribute(
      "aria-label",
      "Navegación entre especies"
    );

    navegacion.innerHTML = `
      <a
        href="${especieAnterior.enlace}"
        class="navegacion-anterior"
        aria-label="Ver ${especieAnterior.nombre}"
      >
        <span class="flecha-navegacion">←</span>

        <span class="texto-especie">
          ${especieAnterior.nombre}
        </span>
      </a>

      <a
        href="../"
        class="volver-coleccion"
        aria-label="Volver a la colección"
      >
        <span class="flecha-navegacion">⌂</span>
        Colección
      </a>

      <a
        href="${especieSiguiente.enlace}"
        class="navegacion-siguiente"
        aria-label="Ver ${especieSiguiente.nombre}"
      >
        <span class="texto-especie">
          ${especieSiguiente.nombre}
        </span>

        <span class="flecha-navegacion">→</span>
      </a>
    `;

    document.body.appendChild(navegacion);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      crearNavegacionEspecies
    );
  } else {
    crearNavegacionEspecies();
  }
})();
/* =====================================================
   FASE 2A — ANIMACIONES CINEMATOGRÁFICAS
===================================================== */

(() => {
  function iniciarAnimacionesCinematograficas() {
    const rutaActual = window.location.pathname.toLowerCase();

    const esPaginaDeEspecie = [
      "carpintero-negro",
      "puma",
      "flamenco",
      "condor",
      "guanaco",
      "martin-pescador"
    ].some(especie => rutaActual.includes(especie));

    if (!esPaginaDeEspecie) {
      return;
    }

    if (document.querySelector("#animaciones-cinematograficas")) {
      return;
    }

    const estilos = document.createElement("style");

    estilos.id = "animaciones-cinematograficas";

    estilos.textContent = `
      /* Estado inicial */

      body:not(.experiencia-visible) .logo,
      body:not(.experiencia-visible) h1,
      body:not(.experiencia-visible) h1 + *,
      body:not(.experiencia-visible) .species-code,
      body:not(.experiencia-visible) .sound-button,
      body:not(.experiencia-visible) button,
      body:not(.experiencia-visible) .photo-credit {
        opacity: 0;
      }

      body:not(.experiencia-visible) h1 {
        transform: translateY(38px);
      }

      body:not(.experiencia-visible) .logo {
        transform: translateY(-20px);
      }

      body:not(.experiencia-visible) h1 + *,
      body:not(.experiencia-visible) .species-code,
      body:not(.experiencia-visible) .sound-button,
      body:not(.experiencia-visible) button {
        transform: translateY(22px);
      }

      /* Entrada del logo */

      body.experiencia-visible .logo {
        animation: entradaLogo 1s cubic-bezier(.22, 1, .36, 1) both;
      }

      /* Código PS */

      body.experiencia-visible .species-code {
        animation: entradaElemento 0.8s ease 0.2s both;
      }

      /* Nombre de la especie */

      body.experiencia-visible h1 {
        animation: entradaTitulo 1.15s cubic-bezier(.22, 1, .36, 1) 0.25s both;
      }

      /* Nombre científico o texto siguiente */

      body.experiencia-visible h1 + * {
        animation: entradaElemento 0.9s ease 0.55s both;
      }

      /* Botón del sonido */

      body.experiencia-visible .sound-button,
      body.experiencia-visible button {
        animation: entradaElemento 0.9s ease 0.75s both;
      }

      /* Crédito fotográfico */

      body.experiencia-visible .photo-credit {
        animation: aparecerSuave 1.2s ease 1s both;
      }

      /* Fotografía */

      body.experiencia-visible .hero::before {
        animation: entradaFotografia 1.8s cubic-bezier(.22, 1, .36, 1) both;
      }

      @keyframes entradaLogo {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes entradaTitulo {
        from {
          opacity: 0;
          transform: translateY(38px);
          filter: blur(5px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }
      }

      @keyframes entradaElemento {
        from {
          opacity: 0;
          transform: translateY(22px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes aparecerSuave {
        from {
          opacity: 0;
        }

        to {
          opacity: 1;
        }
      }

      @keyframes entradaFotografia {
        from {
          opacity: 0;
          transform: scale(1.075);
          filter: brightness(0.72);
        }

        to {
          opacity: 1;
          transform: scale(1);
          filter: brightness(1);
        }
      }

      /* Respeta usuarios que desactivan animaciones */

      @media (prefers-reduced-motion: reduce) {
        body:not(.experiencia-visible) .logo,
        body:not(.experiencia-visible) h1,
        body:not(.experiencia-visible) h1 + *,
        body:not(.experiencia-visible) .species-code,
        body:not(.experiencia-visible) .sound-button,
        body:not(.experiencia-visible) button,
        body:not(.experiencia-visible) .photo-credit {
          opacity: 1;
          transform: none;
        }

        body.experiencia-visible *,
        body.experiencia-visible .hero::before {
          animation: none !important;
        }
      }
    `;

    document.head.appendChild(estilos);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.classList.add("experiencia-visible");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      iniciarAnimacionesCinematograficas
    );
  } else {
    iniciarAnimacionesCinematograficas();
  }
})();
/* =====================================================
   FASE 2B — INDICADOR DE PROGRESO
===================================================== */

(() => {
  function crearIndicadorDeProgreso() {
    const especies = [
      {
        carpeta: "carpintero-negro",
        numero: 1,
        nombre: "Carpintero Negro"
      },
      {
        carpeta: "puma",
        numero: 2,
        nombre: "Puma"
      },
      {
        carpeta: "flamenco",
        numero: 3,
        nombre: "Flamenco Chileno"
      },
      {
        carpeta: "condor",
        numero: 4,
        nombre: "Cóndor Andino"
      },
      {
        carpeta: "guanaco",
        numero: 5,
        nombre: "Guanaco"
      },
      {
        carpeta: "martin-pescador",
        numero: 6,
        nombre: "Martín Pescador"
      }
    ];

    const rutaActual = window.location.pathname.toLowerCase();

    const especieActual = especies.find(especie =>
      rutaActual.includes(especie.carpeta)
    );

    if (
      !especieActual ||
      document.querySelector(".indicador-progreso")
    ) {
      return;
    }

    const estilos = document.createElement("style");

    estilos.id = "estilos-indicador-progreso";

    estilos.textContent = `
      .indicador-progreso {
        position: fixed;
        top: 24px;
        right: 28px;
        z-index: 9998;
        min-width: 150px;
        padding: 12px 16px;
        background: rgba(7, 13, 9, 0.72);
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 999px;
        color: #ffffff;
        font-family: Arial, Helvetica, sans-serif;
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.28);
      }

      .indicador-progreso-texto {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        margin-bottom: 8px;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 1.2px;
        text-transform: uppercase;
      }

      .indicador-progreso-texto strong {
        color: #c7e65b;
        font-size: 11px;
      }

      .barra-progreso {
        width: 100%;
        height: 3px;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.16);
        border-radius: 999px;
      }

      .barra-progreso span {
        display: block;
        width: ${especieActual.numero / especies.length * 100}%;
        height: 100%;
        background: #c7e65b;
        border-radius: 999px;
        transform-origin: left center;
        animation: cargarProgreso 1.1s ease 0.8s both;
      }

      @keyframes cargarProgreso {
        from {
          transform: scaleX(0);
        }

        to {
          transform: scaleX(1);
        }
      }

      @media (max-width: 700px) {
        .indicador-progreso {
          top: 18px;
          right: 16px;
          min-width: 126px;
          padding: 10px 13px;
        }

        .indicador-progreso-texto {
          font-size: 9px;
          margin-bottom: 6px;
        }

        .indicador-progreso-texto strong {
          font-size: 10px;
        }
      }
    `;

    document.head.appendChild(estilos);

    const indicador = document.createElement("div");

    indicador.className = "indicador-progreso";

    indicador.setAttribute(
      "aria-label",
      `${especieActual.numero} de ${especies.length} especies`
    );

    indicador.innerHTML = `
      <div class="indicador-progreso-texto">
        <span>Explorando</span>
        <strong>
          ${especieActual.numero}/${especies.length}
        </strong>
      </div>

      <div class="barra-progreso">
        <span></span>
      </div>
    `;

    document.body.appendChild(indicador);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      crearIndicadorDeProgreso
    );
  } else {
    crearIndicadorDeProgreso();
  }
})();
/* =====================================================
   FASE 2C — PANTALLA FINAL DEL RECORRIDO
===================================================== */

(() => {
  function crearPantallaFinal() {
    const rutaActual = window.location.pathname.toLowerCase();

    const esMartinPescador =
      rutaActual.includes("martin-pescador");

    if (!esMartinPescador) {
      return;
    }

    if (document.querySelector("#pantalla-final-recorrido")) {
      return;
    }

    const estilos = document.createElement("style");

    estilos.id = "estilos-pantalla-final";

    estilos.textContent = `
      .pantalla-final-recorrido {
        position: fixed;
        inset: 0;
        z-index: 20000;
        display: grid;
        place-items: center;
        padding: 30px;
        background:
          linear-gradient(
            rgba(4, 10, 6, 0.86),
            rgba(4, 10, 6, 0.96)
          ),
          url("../carpintero-negro.jpg");

        background-size: cover;
        background-position: center;
        opacity: 0;
        visibility: hidden;
        transition:
          opacity 0.5s ease,
          visibility 0.5s ease;
      }

      .pantalla-final-recorrido.visible {
        opacity: 1;
        visibility: visible;
      }

      .pantalla-final-contenido {
        width: min(850px, 100%);
        text-align: center;
        color: #ffffff;
        transform: translateY(30px);
        opacity: 0;
        transition:
          transform 0.7s cubic-bezier(.22, 1, .36, 1),
          opacity 0.7s ease;
      }

      .pantalla-final-recorrido.visible
      .pantalla-final-contenido {
        transform: translateY(0);
        opacity: 1;
      }

      .pantalla-final-etiqueta {
        margin-bottom: 22px;
        color: #c7e65b;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 2.2px;
        text-transform: uppercase;
      }

      .pantalla-final-titulo {
        max-width: 850px;
        margin: 0 auto 28px;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(50px, 8vw, 100px);
        font-weight: 400;
        line-height: 0.96;
        letter-spacing: -4px;
      }

      .pantalla-final-texto {
        max-width: 620px;
        margin: 0 auto 42px;
        color: rgba(255, 255, 255, 0.78);
        font-family: Arial, Helvetica, sans-serif;
        font-size: 18px;
        line-height: 1.7;
      }

      .pantalla-final-botones {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 12px;
      }

      .pantalla-final-boton {
        min-height: 52px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 14px 24px;
        border: 1px solid rgba(255, 255, 255, 0.45);
        border-radius: 999px;
        color: #ffffff;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 1px;
        text-decoration: none;
        text-transform: uppercase;
        transition:
          background 0.25s ease,
          color 0.25s ease,
          transform 0.25s ease;
        cursor: pointer;
      }

      .pantalla-final-boton:hover {
        background: rgba(255, 255, 255, 0.12);
        transform: translateY(-2px);
      }

      .pantalla-final-boton.principal {
        background: #f6f5ef;
        border-color: #f6f5ef;
        color: #071009;
      }

      .pantalla-final-boton.principal:hover {
        background: #c7e65b;
        border-color: #c7e65b;
      }

      .cerrar-pantalla-final {
        position: absolute;
        top: 24px;
        right: 26px;
        width: 48px;
        height: 48px;
        display: grid;
        place-items: center;
        background: rgba(7, 13, 9, 0.55);
        border: 1px solid rgba(255, 255, 255, 0.25);
        border-radius: 50%;
        color: #ffffff;
        font-size: 24px;
        cursor: pointer;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      }

      body.pantalla-final-abierta {
        overflow: hidden;
      }

      @media (max-width: 700px) {
        .pantalla-final-recorrido {
          padding: 26px 20px;
          background-position: 60% center;
        }

        .pantalla-final-etiqueta {
          font-size: 10px;
          margin-bottom: 18px;
        }

        .pantalla-final-titulo {
          font-size: 55px;
          line-height: 0.95;
          letter-spacing: -2.5px;
          margin-bottom: 24px;
        }

        .pantalla-final-texto {
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .pantalla-final-botones {
          flex-direction: column;
        }

        .pantalla-final-boton {
          width: 100%;
          max-width: 310px;
        }

        .cerrar-pantalla-final {
          top: 17px;
          right: 17px;
          width: 44px;
          height: 44px;
        }
      }
    `;

    document.head.appendChild(estilos);

    const pantalla = document.createElement("section");

    pantalla.id = "pantalla-final-recorrido";
    pantalla.className = "pantalla-final-recorrido";
    pantalla.setAttribute("aria-hidden", "true");

    pantalla.innerHTML = `
      <button
        type="button"
        class="cerrar-pantalla-final"
        aria-label="Cerrar pantalla final"
      >
        ×
      </button>

      <div class="pantalla-final-contenido">

        <p class="pantalla-final-etiqueta">
          Recorrido completado · 6/6
        </p>

        <h2 class="pantalla-final-titulo">
          Has completado el recorrido
        </h2>

        <p class="pantalla-final-texto">
          Has conocido seis de los habitantes de la Patagonia.
          Gracias por explorar esta experiencia fotográfica y sonora
          creada por Aura Textil.
        </p>

        <div class="pantalla-final-botones">

          <a
            href="../"
            class="pantalla-final-boton principal"
          >
            Volver a la colección
          </a>

          <a
            href="../carpintero-negro/"
            class="pantalla-final-boton"
          >
            Recorrer nuevamente
          </a>

          <a
            href="https://www.instagram.com/_auratextil/"
            target="_blank"
            rel="noopener noreferrer"
            class="pantalla-final-boton"
          >
            Ver Instagram
          </a>

        </div>

      </div>
    `;

    document.body.appendChild(pantalla);

    function abrirPantallaFinal() {
      pantalla.classList.add("visible");
      pantalla.setAttribute("aria-hidden", "false");
      document.body.classList.add("pantalla-final-abierta");
    }

    function cerrarPantallaFinal() {
      pantalla.classList.remove("visible");
      pantalla.setAttribute("aria-hidden", "true");
      document.body.classList.remove("pantalla-final-abierta");
    }

    const botonCerrar =
      pantalla.querySelector(".cerrar-pantalla-final");

    botonCerrar.addEventListener(
      "click",
      cerrarPantallaFinal
    );

    pantalla.addEventListener("click", evento => {
      if (evento.target === pantalla) {
        cerrarPantallaFinal();
      }
    });

    document.addEventListener("keydown", evento => {
      if (evento.key === "Escape") {
        cerrarPantallaFinal();
      }
    });

    function conectarFlechaSiguiente() {
      const flechaSiguiente =
        document.querySelector(".navegacion-siguiente");

      if (!flechaSiguiente) {
        setTimeout(conectarFlechaSiguiente, 100);
        return;
      }

      flechaSiguiente.href = "#final-recorrido";
      flechaSiguiente.setAttribute(
        "aria-label",
        "Finalizar recorrido"
      );

      const texto =
        flechaSiguiente.querySelector(".texto-especie");

      if (texto) {
        texto.textContent = "Finalizar recorrido";
      }

      flechaSiguiente.addEventListener(
        "click",
        evento => {
          evento.preventDefault();
          abrirPantallaFinal();
        }
      );
    }

    conectarFlechaSiguiente();
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      crearPantallaFinal
    );
  } else {
    crearPantallaFinal();
  }
})();
/* =====================================================
   FASE 3A — TRANSICIONES CINEMATOGRÁFICAS
===================================================== */

(() => {
  function iniciarTransicionesCinematograficas() {
    const rutaActual = window.location.pathname.toLowerCase();

    const esPaginaDeEspecie = [
      "carpintero-negro",
      "puma",
      "flamenco",
      "condor",
      "guanaco",
      "martin-pescador"
    ].some(especie => rutaActual.includes(especie));

    if (
      !esPaginaDeEspecie ||
      document.querySelector("#transicion-cinematografica")
    ) {
      return;
    }

    const estilos = document.createElement("style");

    estilos.id = "estilos-transicion-cinematografica";

    estilos.textContent = `
      .transicion-cinematografica {
        position: fixed;
        inset: 0;
        z-index: 50000;
        display: grid;
        place-items: center;
        background: #071009;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition:
          opacity 0.55s ease,
          visibility 0.55s ease;
      }

      .transicion-cinematografica.activa {
        opacity: 1;
        visibility: visible;
        pointer-events: all;
      }

      .transicion-contenido {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 24px;
        opacity: 0;
        transform: translateY(15px);
        transition:
          opacity 0.45s ease 0.12s,
          transform 0.55s cubic-bezier(.22, 1, .36, 1) 0.12s;
      }

      .transicion-cinematografica.activa
      .transicion-contenido {
        opacity: 1;
        transform: translateY(0);
      }

      .transicion-logo {
        width: min(190px, 50vw);
        height: auto;
        object-fit: contain;
      }

      .transicion-linea {
        position: relative;
        width: 120px;
        height: 2px;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 999px;
      }

      .transicion-linea::after {
        content: "";
        position: absolute;
        inset: 0;
        background: #c7e65b;
        transform: translateX(-100%);
      }

      .transicion-cinematografica.activa
      .transicion-linea::after {
        animation: avanzarTransicion 0.75s ease forwards;
      }

      .transicion-texto {
        color: rgba(255, 255, 255, 0.7);
        font-family: Arial, Helvetica, sans-serif;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 2px;
        text-transform: uppercase;
      }

      @keyframes avanzarTransicion {
        from {
          transform: translateX(-100%);
        }

        to {
          transform: translateX(0);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .transicion-cinematografica,
        .transicion-contenido {
          transition-duration: 0.15s;
        }

        .transicion-linea::after {
          animation: none !important;
          transform: translateX(0);
        }
      }
    `;

    document.head.appendChild(estilos);

    const transicion = document.createElement("div");

    transicion.id = "transicion-cinematografica";
    transicion.className = "transicion-cinematografica";
    transicion.setAttribute("aria-hidden", "true");

    transicion.innerHTML = `
      <div class="transicion-contenido">

        <img
          src="../logo.png"
          alt="Aura Textil"
          class="transicion-logo"
        >

        <div class="transicion-linea"></div>

        <p class="transicion-texto">
          Habitantes de la Patagonia
        </p>

      </div>
    `;

    document.body.appendChild(transicion);

    let navegacionEnCurso = false;

    function abrirNuevaPagina(direccion) {
      if (navegacionEnCurso) {
        return;
      }

      navegacionEnCurso = true;

      transicion.classList.add("activa");
      transicion.setAttribute("aria-hidden", "false");

      setTimeout(() => {
        window.location.href = direccion;
      }, 750);
    }

    document.addEventListener("click", evento => {
      const enlace = evento.target.closest("a");

      if (!enlace) {
        return;
      }

      const direccionOriginal = enlace.getAttribute("href");

      if (
        !direccionOriginal ||
        direccionOriginal.startsWith("#") ||
        direccionOriginal.startsWith("mailto:") ||
        direccionOriginal.startsWith("tel:") ||
        enlace.target === "_blank" ||
        enlace.hasAttribute("download")
      ) {
        return;
      }

      const destino = new URL(enlace.href, window.location.href);

      if (destino.origin !== window.location.origin) {
        return;
      }

      if (destino.href === window.location.href) {
        return;
      }

      evento.preventDefault();
      abrirNuevaPagina(destino.href);
    });

    window.addEventListener("pageshow", () => {
      navegacionEnCurso = false;
      transicion.classList.remove("activa");
      transicion.setAttribute("aria-hidden", "true");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      iniciarTransicionesCinematograficas
    );
  } else {
    iniciarTransicionesCinematograficas();
  }
})();
/* =====================================================
   FASE 3B — INFORMACIÓN EDUCATIVA: CARPINTERO NEGRO
===================================================== */

(() => {
  function crearPanelCarpinteroNegro() {
    const rutaActual = window.location.pathname.toLowerCase();

    if (
      !rutaActual.includes("carpintero-negro") ||
      document.querySelector("#panel-educativo-especie")
    ) {
      return;
    }

    const estilos = document.createElement("style");

    estilos.id = "estilos-panel-educativo";

    estilos.textContent = `
      .boton-conocer-especie {
        position: fixed;
        left: 28px;
        bottom: 92px;
        z-index: 9997;
        min-height: 48px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 13px 20px;
        background: rgba(7, 13, 9, 0.82);
        border: 1px solid rgba(255, 255, 255, 0.25);
        border-radius: 999px;
        color: #ffffff;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 1px;
        text-transform: uppercase;
        cursor: pointer;
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        box-shadow: 0 14px 38px rgba(0, 0, 0, 0.3);
        transition:
          background 0.25s ease,
          color 0.25s ease,
          transform 0.25s ease;
      }

      .boton-conocer-especie:hover {
        background: #f6f5ef;
        color: #071009;
        transform: translateY(-2px);
      }

      .boton-conocer-especie span {
        color: #c7e65b;
        font-size: 20px;
        font-weight: 400;
        line-height: 1;
      }

      .panel-educativo-especie {
        position: fixed;
        inset: 0;
        z-index: 40000;
        display: flex;
        align-items: stretch;
        justify-content: flex-end;
        background: rgba(2, 7, 4, 0);
        visibility: hidden;
        transition:
          background 0.45s ease,
          visibility 0.45s ease;
      }

      .panel-educativo-especie.visible {
        background: rgba(2, 7, 4, 0.72);
        visibility: visible;
      }

      .panel-educativo-contenido {
        position: relative;
        width: min(620px, 100%);
        height: 100%;
        overflow-y: auto;
        padding: 76px 52px 52px;
        background:
          linear-gradient(
            145deg,
            rgba(20, 31, 23, 0.98),
            rgba(6, 13, 8, 0.99)
          );
        border-left: 1px solid rgba(255, 255, 255, 0.14);
        color: #ffffff;
        transform: translateX(100%);
        transition:
          transform 0.65s cubic-bezier(.22, 1, .36, 1);
        box-shadow: -30px 0 80px rgba(0, 0, 0, 0.4);
      }

      .panel-educativo-especie.visible
      .panel-educativo-contenido {
        transform: translateX(0);
      }

      .cerrar-panel-educativo {
        position: absolute;
        top: 22px;
        right: 24px;
        width: 46px;
        height: 46px;
        display: grid;
        place-items: center;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        color: #ffffff;
        font-size: 24px;
        line-height: 1;
        cursor: pointer;
        transition:
          background 0.25s ease,
          transform 0.25s ease;
      }

      .cerrar-panel-educativo:hover {
        background: rgba(255, 255, 255, 0.14);
        transform: rotate(90deg);
      }

      .panel-etiqueta {
        margin-bottom: 18px;
        color: #c7e65b;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 2px;
        text-transform: uppercase;
      }

      .panel-titulo {
        margin-bottom: 10px;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(44px, 6vw, 68px);
        font-weight: 400;
        line-height: 0.98;
        letter-spacing: -2.5px;
      }

      .panel-cientifico {
        margin-bottom: 40px;
        color: rgba(255, 255, 255, 0.6);
        font-family: Georgia, "Times New Roman", serif;
        font-size: 17px;
        font-style: italic;
      }

      .panel-introduccion {
        margin-bottom: 42px;
        color: rgba(255, 255, 255, 0.78);
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        line-height: 1.75;
      }

      .datos-especie {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1px;
        overflow: hidden;
        margin-bottom: 34px;
        background: rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 18px;
      }

      .dato-especie {
        min-height: 160px;
        padding: 25px;
        background: #0c1610;
      }

      .dato-icono {
        display: block;
        margin-bottom: 18px;
        color: #c7e65b;
        font-size: 22px;
      }

      .dato-especie h3 {
        margin-bottom: 10px;
        color: rgba(255, 255, 255, 0.55);
        font-family: Arial, Helvetica, sans-serif;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 1.5px;
        text-transform: uppercase;
      }

      .dato-especie p {
        color: #ffffff;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
        line-height: 1.6;
      }

      .dato-destacado {
        padding: 28px;
        background: #c7e65b;
        border-radius: 18px;
        color: #071009;
      }

      .dato-destacado span {
        display: block;
        margin-bottom: 12px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 10px;
        font-weight: 900;
        letter-spacing: 1.6px;
        text-transform: uppercase;
      }

      .dato-destacado p {
        font-family: Georgia, "Times New Roman", serif;
        font-size: 23px;
        line-height: 1.35;
      }

      body.panel-educativo-abierto {
        overflow: hidden;
      }

      @media (max-width: 700px) {
        .boton-conocer-especie {
          left: 50%;
          bottom: 82px;
          width: max-content;
          min-height: 42px;
          padding: 10px 17px;
          font-size: 9px;
          transform: translateX(-50%);
        }

        .boton-conocer-especie:hover {
          transform: translateX(-50%) translateY(-2px);
        }

        .panel-educativo-contenido {
          width: 100%;
          padding: 74px 20px 120px;
          border-left: none;
        }

        .panel-titulo {
          font-size: 48px;
          letter-spacing: -2px;
        }

        .panel-cientifico {
          margin-bottom: 28px;
          font-size: 15px;
        }

        .panel-introduccion {
          margin-bottom: 30px;
          font-size: 15px;
        }

        .datos-especie {
          grid-template-columns: 1fr;
        }

        .dato-especie {
          min-height: auto;
          padding: 23px;
        }

        .dato-destacado p {
          font-size: 21px;
        }
      }
    `;

    document.head.appendChild(estilos);

    const boton = document.createElement("button");

    boton.type = "button";
    boton.className = "boton-conocer-especie";
    boton.setAttribute(
      "aria-label",
      "Conocer información del Carpintero Negro"
    );

    boton.innerHTML = `
      Conocer la especie
      <span>+</span>
    `;

    const panel = document.createElement("aside");

    panel.id = "panel-educativo-especie";
    panel.className = "panel-educativo-especie";
    panel.setAttribute("aria-hidden", "true");

    panel.innerHTML = `
      <div
        class="panel-educativo-contenido"
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-panel-especie"
      >
        <button
          type="button"
          class="cerrar-panel-educativo"
          aria-label="Cerrar información"
        >
          ×
        </button>

        <p class="panel-etiqueta">
          PS—001 · Ficha de la especie
        </p>

        <h2
          class="panel-titulo"
          id="titulo-panel-especie"
        >
          Carpintero Negro
        </h2>

        <p class="panel-cientifico">
          Campephilus magellanicus
        </p>

        <p class="panel-introduccion">
          Es una de las aves más características de los bosques
          templados del extremo sur de Sudamérica. Su presencia está
          estrechamente relacionada con bosques nativos que conservan
          árboles grandes, maduros y en distintos estados de
          descomposición.
        </p>

        <div class="datos-especie">

          <article class="dato-especie">
            <span class="dato-icono">⌂</span>

            <h3>Hábitat</h3>

            <p>
              Bosques nativos templados, especialmente formaciones
              dominadas por coigüe, lenga, ñirre y araucaria.
            </p>
          </article>

          <article class="dato-especie">
            <span class="dato-icono">◌</span>

            <h3>Alimentación</h3>

            <p>
              Se alimenta principalmente de larvas, insectos,
              arañas y otros pequeños organismos que encuentra
              dentro de la madera.
            </p>
          </article>

          <article class="dato-especie">
            <span class="dato-icono">⌖</span>

            <h3>Distribución</h3>

            <p>
              Habita en Chile y Argentina. En Chile se encuentra
              desde la zona centro-sur hasta Magallanes y
              Tierra del Fuego.
            </p>
          </article>

          <article class="dato-especie">
            <span class="dato-icono">◇</span>

            <h3>Conservación</h3>

            <p>
              Está clasificado globalmente como Preocupación Menor.
              En Chile su clasificación y nivel de protección
              varían según la zona geográfica.
            </p>
          </article>

        </div>

        <div class="dato-destacado">
          <span>Importancia ecológica</span>

          <p>
            Las cavidades que excava para alimentarse, descansar
            o anidar también pueden ser utilizadas posteriormente
            por otras especies del bosque.
          </p>
        </div>
      </div>
    `;

    document.body.appendChild(boton);
    document.body.appendChild(panel);

    const botonCerrar =
      panel.querySelector(".cerrar-panel-educativo");

    function abrirPanel() {
      panel.classList.add("visible");
      panel.setAttribute("aria-hidden", "false");
      document.body.classList.add("panel-educativo-abierto");
    }

    function cerrarPanel() {
      panel.classList.remove("visible");
      panel.setAttribute("aria-hidden", "true");
      document.body.classList.remove("panel-educativo-abierto");
    }

    boton.addEventListener("click", abrirPanel);
    botonCerrar.addEventListener("click", cerrarPanel);

    panel.addEventListener("click", evento => {
      if (evento.target === panel) {
        cerrarPanel();
      }
    });

    document.addEventListener("keydown", evento => {
      if (
        evento.key === "Escape" &&
        panel.classList.contains("visible")
      ) {
        cerrarPanel();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      crearPanelCarpinteroNegro
    );
  } else {
    crearPanelCarpinteroNegro();
  }
})();
/* =====================================================
   FASE 3B — INFORMACIÓN Y COLOR DINÁMICO POR ESPECIE
===================================================== */

(() => {
  function iniciarFichasDeEspecies() {
    const rutaActual = window.location.pathname.toLowerCase();

    const especies = {
      "carpintero-negro": {
        codigo: "PS—001",
        nombre: "Carpintero Negro",
        cientifico: "Campephilus magellanicus",
        color: "#c7e65b",
        colorTexto: "#071009",
        introduccion:
          "Una de las aves más características de los bosques templados del extremo sur de Sudamérica. Su presencia está estrechamente relacionada con bosques nativos que conservan árboles grandes y maduros.",
        habitat:
          "Bosques nativos templados, especialmente formaciones de coigüe, lenga, ñirre y otras especies australes.",
        alimentacion:
          "Larvas, insectos, arañas y pequeños organismos que encuentra bajo la corteza y dentro de la madera.",
        distribucion:
          "Habita en los bosques australes de Chile y Argentina, incluyendo sectores de la Patagonia y Tierra del Fuego.",
        conservacion:
          "La conservación de los bosques nativos antiguos es fundamental para mantener sus lugares de alimentación, descanso y reproducción.",
        destacadoTitulo: "Importancia ecológica",
        destacado:
          "Las cavidades que excava pueden ser utilizadas posteriormente por otras aves y pequeños habitantes del bosque."
      },

      puma: {
        codigo: "PS—002",
        nombre: "Puma",
        cientifico: "Puma concolor",
        color: "#c98652",
        colorTexto: "#160c06",
        introduccion:
          "El puma es el felino terrestre más grande de Chile y uno de los principales depredadores de la Patagonia. Es silencioso, adaptable y fundamental para el equilibrio natural.",
        habitat:
          "Habita montañas, bosques, estepas, matorrales y sectores rocosos, adaptándose a una amplia variedad de paisajes.",
        alimentacion:
          "Se alimenta principalmente de mamíferos y aves. En la Patagonia, el guanaco constituye una de sus presas naturales más importantes.",
        distribucion:
          "Posee una extensa distribución en América. En Chile puede encontrarse desde el norte hasta los territorios australes.",
        conservacion:
          "Sus principales amenazas incluyen la pérdida y fragmentación del hábitat y los conflictos generados por la cercanía con actividades humanas.",
        destacadoTitulo: "Equilibrio natural",
        destacado:
          "Como gran depredador, ayuda a regular las poblaciones de otras especies y contribuye al funcionamiento saludable de los ecosistemas."
      },

      flamenco: {
        codigo: "PS—003",
        nombre: "Flamenco Chileno",
        cientifico: "Phoenicopterus chilensis",
        color: "#ee9cab",
        colorTexto: "#25090f",
        introduccion:
          "El flamenco chileno destaca por su elegante figura, su coloración rosada y sus extensos desplazamientos entre lagunas, salares y humedales.",
        habitat:
          "Lagunas poco profundas, humedales, estuarios, salares y ambientes acuáticos donde puede encontrar alimento.",
        alimentacion:
          "Filtra pequeños crustáceos, algas y organismos acuáticos utilizando su característico pico curvado.",
        distribucion:
          "Se distribuye por diferentes zonas de Sudamérica. En la Patagonia puede observarse en lagunas y humedales australes.",
        conservacion:
          "La alteración de humedales, la contaminación y la perturbación de sus zonas de descanso y reproducción pueden afectar sus poblaciones.",
        destacadoTitulo: "Su color rosado",
        destacado:
          "Su coloración se relaciona con los pigmentos presentes en los pequeños organismos que forman parte de su alimentación."
      },

      condor: {
        codigo: "PS—004",
        nombre: "Cóndor Andino",
        cientifico: "Vultur gryphus",
        color: "#b9bec4",
        colorTexto: "#080a0c",
        introduccion:
          "El cóndor andino es una de las aves voladoras más grandes del mundo y un símbolo cultural profundamente ligado a la cordillera y a la Patagonia.",
        habitat:
          "Zonas montañosas, acantilados, estepas abiertas y sectores donde existen corrientes de aire que facilitan su vuelo.",
        alimentacion:
          "Es un ave carroñera. Se alimenta de animales muertos y cumple una importante función de limpieza natural.",
        distribucion:
          "Se encuentra a lo largo de la cordillera de los Andes, desde el norte de Sudamérica hasta Tierra del Fuego.",
        conservacion:
          "Entre sus amenazas se encuentran el envenenamiento, la persecución, la disminución de alimento y la alteración de sus áreas de descanso.",
        destacadoTitulo: "Vuelo extraordinario",
        destacado:
          "Puede recorrer grandes distancias aprovechando las corrientes de aire y mantenerse planeando con un mínimo gasto de energía."
      },

      guanaco: {
        codigo: "PS—005",
        nombre: "Guanaco",
        cientifico: "Lama guanicoe",
        color: "#d7a86e",
        colorTexto: "#1b0f05",
        introduccion:
          "El guanaco es uno de los animales más representativos de la estepa patagónica. Vive en grupos y posee una gran capacidad para adaptarse a ambientes fríos y ventosos.",
        habitat:
          "Estepas, pampas, matorrales y sectores abiertos, desde terrenos bajos hasta ambientes cordilleranos.",
        alimentacion:
          "Es herbívoro y consume pastos, hierbas, hojas y arbustos disponibles en el paisaje patagónico.",
        distribucion:
          "Habita diferentes regiones de Sudamérica. En Chile posee una presencia especialmente importante en la Patagonia.",
        conservacion:
          "La protección de sus rutas naturales, áreas de alimentación y ambientes abiertos es importante para conservar poblaciones saludables.",
        destacadoTitulo: "Adaptación patagónica",
        destacado:
          "Su pelaje, su resistencia y su forma de aprovechar la vegetación le permiten sobrevivir en paisajes expuestos a bajas temperaturas y fuertes vientos."
      },

      "martin-pescador": {
        codigo: "PS—006",
        nombre: "Martín Pescador Grande",
        cientifico: "Megaceryle torquata",
        color: "#45a9c8",
        colorTexto: "#031116",
        introduccion:
          "El martín pescador grande es una llamativa ave de ríos, lagos y costas. Suele observar el agua desde una rama antes de lanzarse rápidamente para capturar su alimento.",
        habitat:
          "Ríos, lagunas, lagos, estuarios y sectores costeros que cuentan con agua y lugares elevados para posarse.",
        alimentacion:
          "Se alimenta principalmente de peces, aunque también puede capturar crustáceos y otros pequeños animales acuáticos.",
        distribucion:
          "Se distribuye ampliamente por América. En Chile puede observarse en diferentes ambientes acuáticos, incluyendo la Patagonia.",
        conservacion:
          "La calidad del agua y la conservación de la vegetación cercana a ríos y lagos son importantes para mantener su hábitat.",
        destacadoTitulo: "Cazador del agua",
        destacado:
          "Detecta a sus presas desde una posición elevada y se lanza de cabeza al agua con gran precisión."
      }
    };

    const claveActual = Object.keys(especies).find(clave =>
      rutaActual.includes(clave)
    );

    if (!claveActual) {
      return;
    }

    const especie = especies[claveActual];

    document.documentElement.style.setProperty(
      "--color-especie",
      especie.color
    );

    document.documentElement.style.setProperty(
      "--texto-color-especie",
      especie.colorTexto
    );

    const estilosAnteriores =
      document.querySelector("#estilos-panel-educativo");

    if (estilosAnteriores) {
      estilosAnteriores.remove();
    }

    const panelAnterior =
      document.querySelector("#panel-educativo-especie");

    if (panelAnterior) {
      panelAnterior.remove();
    }

    const botonAnterior =
      document.querySelector(".boton-conocer-especie");

    if (botonAnterior) {
      botonAnterior.remove();
    }

    const estilos = document.createElement("style");

    estilos.id = "estilos-panel-educativo";

    estilos.textContent = `
      :root {
        --color-especie: #c7e65b;
        --texto-color-especie: #071009;
      }

      .transicion-linea::after {
        background: var(--color-especie) !important;
      }

      .boton-conocer-especie {
        position: fixed;
        left: 28px;
        bottom: 92px;
        z-index: 9997;
        min-height: 48px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 13px 20px;
        background: rgba(7, 13, 9, 0.84);
        border: 1px solid color-mix(
          in srgb,
          var(--color-especie) 55%,
          transparent
        );
        border-radius: 999px;
        color: #ffffff;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 1px;
        text-transform: uppercase;
        cursor: pointer;
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        box-shadow: 0 14px 38px rgba(0, 0, 0, 0.3);
        transition:
          background 0.25s ease,
          color 0.25s ease,
          border-color 0.25s ease,
          transform 0.25s ease;
      }

      .boton-conocer-especie:hover {
        background: var(--color-especie);
        border-color: var(--color-especie);
        color: var(--texto-color-especie);
        transform: translateY(-2px);
      }

      .boton-conocer-especie span {
        color: var(--color-especie);
        font-size: 20px;
        font-weight: 400;
        line-height: 1;
      }

      .boton-conocer-especie:hover span {
        color: var(--texto-color-especie);
      }

      .panel-educativo-especie {
        position: fixed;
        inset: 0;
        z-index: 40000;
        display: flex;
        align-items: stretch;
        justify-content: flex-end;
        background: rgba(2, 7, 4, 0);
        visibility: hidden;
        transition:
          background 0.45s ease,
          visibility 0.45s ease;
      }

      .panel-educativo-especie.visible {
        background: rgba(2, 7, 4, 0.74);
        visibility: visible;
      }

      .panel-educativo-contenido {
        position: relative;
        width: min(620px, 100%);
        height: 100%;
        overflow-y: auto;
        padding: 76px 52px 52px;
        background:
          radial-gradient(
            circle at top right,
            color-mix(
              in srgb,
              var(--color-especie) 17%,
              transparent
            ),
            transparent 38%
          ),
          linear-gradient(
            145deg,
            rgba(20, 31, 23, 0.99),
            rgba(6, 13, 8, 0.99)
          );
        border-left: 1px solid rgba(255, 255, 255, 0.14);
        color: #ffffff;
        transform: translateX(100%);
        transition:
          transform 0.65s cubic-bezier(.22, 1, .36, 1);
        box-shadow: -30px 0 80px rgba(0, 0, 0, 0.4);
      }

      .panel-educativo-especie.visible
      .panel-educativo-contenido {
        transform: translateX(0);
      }

      .cerrar-panel-educativo {
        position: absolute;
        top: 22px;
        right: 24px;
        width: 46px;
        height: 46px;
        display: grid;
        place-items: center;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        color: #ffffff;
        font-size: 24px;
        line-height: 1;
        cursor: pointer;
        transition:
          background 0.25s ease,
          border-color 0.25s ease,
          transform 0.25s ease;
      }

      .cerrar-panel-educativo:hover {
        background: var(--color-especie);
        border-color: var(--color-especie);
        color: var(--texto-color-especie);
        transform: rotate(90deg);
      }

      .panel-etiqueta {
        margin-bottom: 18px;
        color: var(--color-especie);
        font-family: Arial, Helvetica, sans-serif;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 2px;
        text-transform: uppercase;
      }

      .panel-titulo {
        margin-bottom: 10px;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(44px, 6vw, 68px);
        font-weight: 400;
        line-height: 0.98;
        letter-spacing: -2.5px;
      }

      .panel-cientifico {
        margin-bottom: 40px;
        color: rgba(255, 255, 255, 0.6);
        font-family: Georgia, "Times New Roman", serif;
        font-size: 17px;
        font-style: italic;
      }

      .panel-introduccion {
        margin-bottom: 42px;
        color: rgba(255, 255, 255, 0.78);
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        line-height: 1.75;
      }

      .datos-especie {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1px;
        overflow: hidden;
        margin-bottom: 34px;
        background: rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 18px;
      }

      .dato-especie {
        min-height: 160px;
        padding: 25px;
        background: rgba(8, 18, 11, 0.92);
      }

      .dato-icono {
        display: block;
        margin-bottom: 18px;
        color: var(--color-especie);
        font-size: 22px;
      }

      .dato-especie h3 {
        margin-bottom: 10px;
        color: rgba(255, 255, 255, 0.55);
        font-family: Arial, Helvetica, sans-serif;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 1.5px;
        text-transform: uppercase;
      }

      .dato-especie p {
        color: #ffffff;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
        line-height: 1.6;
      }

      .dato-destacado {
        padding: 28px;
        background: var(--color-especie);
        border-radius: 18px;
        color: var(--texto-color-especie);
      }

      .dato-destacado span {
        display: block;
        margin-bottom: 12px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 10px;
        font-weight: 900;
        letter-spacing: 1.6px;
        text-transform: uppercase;
      }

      .dato-destacado p {
        font-family: Georgia, "Times New Roman", serif;
        font-size: 23px;
        line-height: 1.35;
      }

      body.panel-educativo-abierto {
        overflow: hidden;
      }

      @media (max-width: 700px) {
        .boton-conocer-especie {
          left: 50%;
          bottom: 82px;
          width: max-content;
          min-height: 42px;
          padding: 10px 17px;
          font-size: 9px;
          transform: translateX(-50%);
        }

        .boton-conocer-especie:hover {
          transform: translateX(-50%) translateY(-2px);
        }

        .panel-educativo-contenido {
          width: 100%;
          padding: 74px 20px 120px;
          border-left: none;
        }

        .panel-titulo {
          font-size: 48px;
          letter-spacing: -2px;
        }

        .panel-cientifico {
          margin-bottom: 28px;
          font-size: 15px;
        }

        .panel-introduccion {
          margin-bottom: 30px;
          font-size: 15px;
        }

        .datos-especie {
          grid-template-columns: 1fr;
        }

        .dato-especie {
          min-height: auto;
          padding: 23px;
        }

        .dato-destacado p {
          font-size: 21px;
        }
      }
    `;

    document.head.appendChild(estilos);

    const boton = document.createElement("button");

    boton.type = "button";
    boton.className = "boton-conocer-especie";
    boton.setAttribute(
      "aria-label",
      `Conocer información de ${especie.nombre}`
    );

    boton.innerHTML = `
      Conocer la especie
      <span>+</span>
    `;

    const panel = document.createElement("aside");

    panel.id = "panel-educativo-especie";
    panel.className = "panel-educativo-especie";
    panel.setAttribute("aria-hidden", "true");

    panel.innerHTML = `
      <div
        class="panel-educativo-contenido"
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-panel-especie"
      >
        <button
          type="button"
          class="cerrar-panel-educativo"
          aria-label="Cerrar información"
        >
          ×
        </button>

        <p class="panel-etiqueta">
          ${especie.codigo} · Ficha de la especie
        </p>

        <h2
          class="panel-titulo"
          id="titulo-panel-especie"
        >
          ${especie.nombre}
        </h2>

        <p class="panel-cientifico">
          ${especie.cientifico}
        </p>

        <p class="panel-introduccion">
          ${especie.introduccion}
        </p>

        <div class="datos-especie">
          <article class="dato-especie">
            <span class="dato-icono">⌂</span>
            <h3>Hábitat</h3>
            <p>${especie.habitat}</p>
          </article>

          <article class="dato-especie">
            <span class="dato-icono">◌</span>
            <h3>Alimentación</h3>
            <p>${especie.alimentacion}</p>
          </article>

          <article class="dato-especie">
            <span class="dato-icono">⌖</span>
            <h3>Distribución</h3>
            <p>${especie.distribucion}</p>
          </article>

          <article class="dato-especie">
            <span class="dato-icono">◇</span>
            <h3>Conservación</h3>
            <p>${especie.conservacion}</p>
          </article>
        </div>

        <div class="dato-destacado">
          <span>${especie.destacadoTitulo}</span>
          <p>${especie.destacado}</p>
        </div>
      </div>
    `;

    document.body.appendChild(boton);
    document.body.appendChild(panel);

    const botonCerrar =
      panel.querySelector(".cerrar-panel-educativo");

    function abrirPanel() {
      panel.classList.add("visible");
      panel.setAttribute("aria-hidden", "false");
      document.body.classList.add("panel-educativo-abierto");
    }

    function cerrarPanel() {
      panel.classList.remove("visible");
      panel.setAttribute("aria-hidden", "true");
      document.body.classList.remove("panel-educativo-abierto");
    }

    boton.addEventListener("click", abrirPanel);
    botonCerrar.addEventListener("click", cerrarPanel);

    panel.addEventListener("click", evento => {
      if (evento.target === panel) {
        cerrarPanel();
      }
    });

    document.addEventListener("keydown", evento => {
      if (
        evento.key === "Escape" &&
        panel.classList.contains("visible")
      ) {
        cerrarPanel();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      iniciarFichasDeEspecies
    );
  } else {
    iniciarFichasDeEspecies();
  }
})();
/* =====================================================
   FASE 4.1 — EFECTO KEN BURNS EN EL FONDO DEL HERO
===================================================== */

(() => {
  function iniciarKenBurnsEnHero() {
    const rutaActual = window.location.pathname.toLowerCase();

    const esPaginaDeEspecie = [
      "carpintero-negro",
      "puma",
      "flamenco",
      "condor",
      "guanaco",
      "martin-pescador"
    ].some(especie => rutaActual.includes(especie));

    if (!esPaginaDeEspecie) {
      return;
    }

    const hero = document.querySelector(".hero");

    if (
      !hero ||
      hero.querySelector(".ken-burns-fondo")
    ) {
      return;
    }

    const estiloHero = window.getComputedStyle(hero);
    const imagenDeFondo = estiloHero.backgroundImage;

    if (!imagenDeFondo || imagenDeFondo === "none") {
      return;
    }

    const capaFondo = document.createElement("div");

    capaFondo.className = "ken-burns-fondo";
    capaFondo.setAttribute("aria-hidden", "true");

    capaFondo.style.backgroundImage = imagenDeFondo;
    capaFondo.style.backgroundSize = estiloHero.backgroundSize;
    capaFondo.style.backgroundPosition = estiloHero.backgroundPosition;
    capaFondo.style.backgroundRepeat = estiloHero.backgroundRepeat;
    capaFondo.style.backgroundColor = estiloHero.backgroundColor;

    hero.style.backgroundImage = "none";
    hero.style.position = "relative";
    hero.style.overflow = "hidden";
    hero.style.isolation = "isolate";

    hero.prepend(capaFondo);

    const estilos = document.createElement("style");

    estilos.id = "estilos-ken-burns-corregido";

    estilos.textContent = `
      .ken-burns-fondo {
        position: absolute;
        inset: -5%;
        z-index: -1;
        pointer-events: none;
        transform-origin: center center;
        animation:
          kenBurnsHeroAura 24s
          cubic-bezier(.45, 0, .55, 1)
          infinite alternate;
        will-change: transform;
        backface-visibility: hidden;
      }

      .hero > *:not(.ken-burns-fondo) {
        position: relative;
        z-index: 1;
      }

      @keyframes kenBurnsHeroAura {
        0% {
          transform:
            scale(1.01)
            translate3d(0, 0, 0);
        }

        50% {
          transform:
            scale(1.065)
            translate3d(-0.7%, -0.4%, 0);
        }

        100% {
          transform:
            scale(1.11)
            translate3d(0.7%, -0.8%, 0);
        }
      }

      @media (max-width: 700px) {
        .ken-burns-fondo {
          inset: -7%;
          animation-duration: 28s;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .ken-burns-fondo {
          animation: none !important;
          transform: scale(1.03) !important;
        }
      }
    `;

    document.head.appendChild(estilos);

    document.addEventListener("visibilitychange", () => {
      capaFondo.style.animationPlayState =
        document.hidden ? "paused" : "running";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      iniciarKenBurnsEnHero
    );
  } else {
    iniciarKenBurnsEnHero();
  }
})();
