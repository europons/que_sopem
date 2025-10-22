// Script para el dictado por voz en el campo de receta personal

const botonDictar = document.getElementById('botonDictar');
const campoReceta = document.getElementById('receta');
const estadoVoz = document.getElementById('estado-voz');

if ('webkitSpeechRecognition' in window) {
  const reconocimiento = new webkitSpeechRecognition();
  reconocimiento.lang = 'es-ES';
  reconocimiento.continuous = true;
  reconocimiento.interimResults = false;

  let dictando = false;

  botonDictar.addEventListener('click', () => {
    if (!dictando) {
      reconocimiento.start();
      dictando = true;
      botonDictar.textContent = 'Detener dictado';
      botonDictar.setAttribute('aria-label', 'Detener dictado de receta');
      botonDictar.setAttribute('aria-pressed', 'true');
      estadoVoz.innerHTML = '<span class="material-symbols-outlined" id="iconoMic">mic</span> Grabando. Ya puedes hablar.';
    } else {
      reconocimiento.stop();
      dictando = false;
      botonDictar.textContent = 'Iniciar dictado por voz';
      botonDictar.setAttribute('aria-label', 'Iniciar dictado de receta');
      botonDictar.setAttribute('aria-pressed', 'false');
      estadoVoz.innerHTML = '';

    }
  });

  reconocimiento.onresult = (event) => {
    const texto = event.results[event.results.length - 1][0].transcript.trim();
    campoReceta.value += (campoReceta.value ? '\n' : '') + texto;
  };

  reconocimiento.onerror = () => {
    estadoVoz.textContent = '❌ Error en el reconocimiento de voz.';
    dictando = false;
    botonDictar.textContent = 'Iniciar dictado por voz';
    botonDictar.setAttribute('aria-pressed', 'false');
  };
} else {
  estadoVoz.textContent = '⚠️ Tu navegador no soporta dictado por voz.';
  botonDictar.disabled = true;
}