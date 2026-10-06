/* Comodidades del menú plegable de móvil. El menú es un `<details>` y abre y
   cierra sin este archivo; esto solo lo cierra cuando ya no hace falta:
   al tocar un enlace —los que llevan a `#precios` o `#contacto` no cambian
   de página, y sin esto el menú seguiría tapando lo que se fue a ver—, al
   pulsar Escape o al tocar fuera de él. */

const menu = document.querySelector('.menu');

if (menu) {
  const cerrar = () => { menu.open = false; };

  menu.querySelectorAll('.nav a').forEach((enlace) => {
    enlace.addEventListener('click', cerrar);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.open) {
      cerrar();
      menu.querySelector('summary').focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (menu.open && !menu.contains(e.target)) cerrar();
  });
}
