/* Motor de actividades de huecos.
   Para crear una actividad nueva basta con escribir el HTML: cada <input> lleva
   su respuesta en data-respuesta, y varias respuestas válidas se separan con "|".
   Ejemplo:  <input class="hueco" data-respuesta="tengo|poseo">

   Distingue el fallo de tilde del fallo de verbo: si la palabra es correcta pero
   le falta o le sobra un acento, lo dice en lugar de darla por mala a secas. */

document.querySelectorAll('[data-quiz]').forEach(iniciar);

const sinTildes = (t) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const normaliza = (t) => t.trim().toLowerCase().replace(/\s+/g, ' ');

function iniciar(quiz) {
  const huecos = Array.from(quiz.querySelectorAll('[data-respuesta]'));
  const resultado = quiz.querySelector('[data-resultado]');
  const reiniciar = quiz.querySelector('[data-reiniciar]');

  function avisoDe(hueco) {
    return hueco.closest('.pregunta').querySelector('[data-aviso]');
  }

  function revisar(hueco) {
    const validas = hueco.dataset.respuesta.split('|').map(normaliza);
    const dada = normaliza(hueco.value);

    if (!dada) return { estado: 'vacio', mensaje: 'Te falta esta.' };
    if (validas.includes(dada)) return { estado: 'bien', mensaje: '¡Correcto!' };
    if (validas.some((v) => sinTildes(v) === sinTildes(dada))) {
      return { estado: 'casi', mensaje: 'Casi: repasa la tilde.' };
    }
    return { estado: 'mal', mensaje: `La respuesta es «${hueco.dataset.respuesta.split('|')[0]}».` };
  }

  quiz.addEventListener('submit', (e) => {
    e.preventDefault();
    let aciertos = 0;

    huecos.forEach((hueco) => {
      const { estado, mensaje } = revisar(hueco);
      if (estado === 'bien') aciertos++;

      hueco.classList.remove('es-bien', 'es-casi', 'es-mal');
      hueco.classList.add(estado === 'bien' ? 'es-bien' : estado === 'casi' ? 'es-casi' : 'es-mal');
      hueco.setAttribute('aria-invalid', String(estado !== 'bien'));

      const aviso = avisoDe(hueco);
      aviso.textContent = mensaje;
      aviso.dataset.estado = estado;
    });

    const total = huecos.length;
    resultado.textContent = aciertos === total
      ? `¡Todas bien! ${aciertos} de ${total}.`
      : `${aciertos} de ${total} correctas.`;
    resultado.dataset.estado = aciertos === total ? 'bien' : 'parcial';
  });

  reiniciar?.addEventListener('click', () => {
    huecos.forEach((hueco) => {
      hueco.value = '';
      hueco.classList.remove('es-bien', 'es-casi', 'es-mal');
      hueco.removeAttribute('aria-invalid');
      const aviso = avisoDe(hueco);
      aviso.textContent = '';
      delete aviso.dataset.estado;
    });
    resultado.textContent = '';
    delete resultado.dataset.estado;
    huecos[0]?.focus();
  });
}
