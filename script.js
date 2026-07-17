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
