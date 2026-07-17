/* =====================================================
   CARGAR MAPA DE LA PATAGONIA
===================================================== */

(() => {
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
    document.querySelector('script[data-aura-mapa]')
  ) {
    return;
  }

  const scriptMapa = document.createElement("script");

  scriptMapa.src = "../mapa.js";
  scriptMapa.defer = true;
  scriptMapa.dataset.auraMapa = "true";

  document.body.appendChild(scriptMapa);
})();
