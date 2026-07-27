/* Aparición suave de las tarjetas al hacer scroll.
   La clase "con-revelado" se añade solo cuando vamos a animar de verdad, así
   que si no hay JavaScript —o si el visitante pidió reducir el movimiento—
   las tarjetas se ven desde el principio y nunca queda contenido oculto. */

const SELECTOR = '.tarjetas > li';

const elementos = document.querySelectorAll(SELECTOR);
const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (elementos.length && !sinMovimiento && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('con-revelado');

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add('visible');
      observador.unobserve(entrada.target);
    });
  }, { threshold: .15, rootMargin: '0px 0px -40px 0px' });

  elementos.forEach((el) => observador.observe(el));
}
