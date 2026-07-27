/* Carrusel de testimonios.
   Sin JavaScript los testimonios se ven apilados uno debajo de otro: la clase
   "carrusel--activo" es la que convierte esa lista en un carrusel, así que la
   página nunca deja contenido inaccesible. */

const INTERVALO = 8000;   // ms entre testimonios
const UMBRAL_ARRASTRE = 45; // px mínimos para contar como deslizamiento

document.querySelectorAll('[data-carrusel]').forEach(iniciar);

function iniciar(carrusel) {
  const pista  = carrusel.querySelector('[data-pista]');
  const slides = Array.from(pista.children);
  if (slides.length < 2) return;

  const contenedorPuntos = carrusel.querySelector('[data-puntos]');
  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');

  let actual = 0;
  let temporizador = null;
  let automatico = !sinMovimiento.matches;

  // Un punto por testimonio
  const puntos = slides.map((_, i) => {
    const punto = document.createElement('button');
    punto.type = 'button';
    punto.className = 'carrusel__punto';
    punto.setAttribute('aria-label', `Ir al testimonio ${i + 1} de ${slides.length}`);
    punto.addEventListener('click', () => { detener(); mostrar(i); });
    contenedorPuntos.appendChild(punto);
    return punto;
  });

  slides.forEach((slide, i) => {
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'testimonio');
    slide.setAttribute('aria-label', `${i + 1} de ${slides.length}`);
  });

  function mostrar(indice) {
    actual = (indice + slides.length) % slides.length;
    pista.style.transform = `translateX(-${actual * 100}%)`;
    slides.forEach((s, i) => s.setAttribute('aria-hidden', String(i !== actual)));
    puntos.forEach((p, i) => {
      p.classList.toggle('es-actual', i === actual);
      if (i === actual) p.setAttribute('aria-current', 'true');
      else p.removeAttribute('aria-current');
    });
  }

  const avanzar = (paso) => mostrar(actual + paso);

  function reanudar() {
    if (!automatico || temporizador) return;
    temporizador = setInterval(() => avanzar(1), INTERVALO);
  }

  function pausar() {
    clearInterval(temporizador);
    temporizador = null;
  }

  /* Cualquier acción manual apaga el avance automático para siempre: quien
     toma el control no quiere que el carrusel se lo quite otra vez. */
  function detener() {
    automatico = false;
    pausar();
  }

  carrusel.querySelector('[data-anterior]').addEventListener('click', () => { detener(); avanzar(-1); });
  carrusel.querySelector('[data-siguiente]').addEventListener('click', () => { detener(); avanzar(1); });

  carrusel.addEventListener('mouseenter', pausar);
  carrusel.addEventListener('mouseleave', reanudar);
  carrusel.addEventListener('focusin', pausar);
  carrusel.addEventListener('focusout', reanudar);
  document.addEventListener('visibilitychange', () => document.hidden ? pausar() : reanudar());

  carrusel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { detener(); avanzar(-1); }
    if (e.key === 'ArrowRight') { detener(); avanzar(1); }
  });

  // Deslizamiento con el dedo o el ratón
  let inicioX = null;
  carrusel.addEventListener('pointerdown', (e) => { inicioX = e.clientX; pausar(); });
  carrusel.addEventListener('pointerup', (e) => {
    if (inicioX === null) return;
    const recorrido = e.clientX - inicioX;
    inicioX = null;
    if (Math.abs(recorrido) < UMBRAL_ARRASTRE) { reanudar(); return; }
    detener();
    avanzar(recorrido < 0 ? 1 : -1);
  });
  carrusel.addEventListener('pointercancel', () => { inicioX = null; reanudar(); });

  sinMovimiento.addEventListener('change', (e) => {
    if (e.matches) detener();
  });

  carrusel.classList.add('carrusel--activo');
  mostrar(0);
  reanudar();
}
