# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es esto

El sitio web de Lorena Riveira, profesora de idiomas en Ámsterdam, migrado desde
Wix a GitHub Pages en julio de 2026. Dos páginas estáticas en español: `index.html`
(Inicio) y `clases.html` (¿Cómo son las clases?). La página de reservas de Wix no
se migró a propósito: el contacto es directo por WhatsApp y email.

**El idioma del proyecto es el español**: los nombres de clases CSS, de archivos, de
variables JavaScript, los comentarios y los mensajes de commit están en español.
Manténlo así.

## Comandos

No hay compilación, dependencias ni tests. Es HTML, CSS y JavaScript a secas.

```bash
python3 -m http.server 8000      # servir en local → http://localhost:8000
node --check assets/js/*.js      # comprobar sintaxis de JS
```

Para revisar el resultado real —sobre todo en móvil, donde vive la mayoría de las
decisiones de diseño— hay Chrome instalado:

```bash
google-chrome-stable --headless --no-sandbox --hide-scrollbars \
  --virtual-time-budget=6000 --window-size=390,5000 \
  --screenshot=captura.png http://127.0.0.1:8000/index.html
```

El recorte a la altura real del contenido se hace con ImageMagick:
`magick captura.png -fuzz 3% -trim -format "%[fx:page.y+h]" info:` da el borde
inferior, y luego `-crop 390x<alto>+0+0`.

## Publicación

`git push` a `main` publica. `CNAME` fija el dominio `lorenariveira.com` y
`.nojekyll` evita que GitHub procese el sitio con Jekyll. Ninguno de los dos debe
borrarse. El repositorio es `lorenariveira/lorenariveira.github.io` y debe seguir
siendo público: GitHub Pages solo funciona en repositorios privados con plan de pago.

**El DNS ya está migrado (comprobado el 29 de julio de 2026).** El dominio está en
Namecheap con sus DNS propios: los cuatro registros A apuntan a
`185.199.108-111.153` y el CNAME de `www` a `lorenariveira.github.io`. *Enforce
HTTPS* está activo, así que `http://` devuelve un 301 a `https://` y `www` redirige
al dominio sin `www`. Para verificarlo sin depender del navegador:

```bash
getent hosts lorenariveira.com www.lorenariveira.com
curl -sS -o /dev/null -D - https://lorenariveira.com/
```

## Pendiente: la versión en inglés

Acordado el 29 de julio de 2026, sin empezar todavía. Alcance: solo `index.html` y
`clases.html`. `practica/` se queda en español.

GitHub Pages no puede traducir nada: es alojamiento estático. La versión inglesa se
escribe a mano y vive en `/en/`, con los nombres de archivo en inglés
—`/en/index.html` y `/en/classes.html`— que es la única excepción acordada a la
regla de nombrar los archivos en español: una URL la lee el visitante, no el código.
Desde `/en/` los recursos se referencian como `../assets/`. Hay que poner `hreflang`
recíproco entre cada par de páginas y cambiar `og:locale` a `en_US`.

El botón de cambio de idioma va en la cabecera de las cuatro páginas, y cada uno
enlaza a su equivalente, no a la portada.

**El testimonio de Gabriela T. se queda en español, sin traducir**, con `lang="es"`.
Es la misma regla que ya sigue la página española al dejar en inglés los otros tres:
cada testimonio conserva las palabras que escribió cada estudiante.

**No hay plantillas ni compilación, así que las dos versiones no se sincronizan
solas: todo cambio en `index.html` o `clases.html` hay que replicarlo a mano en
`en/`, en la misma tanda.** Es el precio de no meter un paso de compilación en un
sitio cuya gracia es no tenerlo, y el riesgo real es que las dos versiones se
separen sin que nadie lo note.

## Los textos vienen de Wix y son literales

Todo el contenido se copió palabra por palabra del sitio original y se verificó
carácter a carácter, incluidos apóstrofos tipográficos y signos dobles. **No los
reescribas, resumas ni "mejores" sin que Lorena lo pida.** Las excepciones ya
acordadas: se quitó "reservas" de la entradilla de portada (esa página no existe) y
los años de experiencia se actualizaron a 14.

Los testimonios están en el idioma en que los escribió cada estudiante: tres en
inglés (con `lang="en"`) y uno en español. Wix solo renderizaba el primero en el
HTML; los cuatro se recuperaron del JSON de datos del sitio. Si hiciera falta
volver a esa fuente, el patrón es
`https://pages.parastorage.com/sites/<pageJsonFileName>.json.z`, donde
`pageJsonFileName` sale del `pagesMap` incrustado en el HTML de Wix.

## Detalles del CSS que parecen arbitrarios y no lo son

`assets/css/style.css` es la única hoja de estilos. Los colores y tipografías están
agrupados en `:root` al principio. Tres decisiones se romperían fácil sin saber por qué:

**El titular de portada se mide con `cqi`, no con `vw`.** `.portada__texto` declara
`container-type: inline-size` para que `.portada h1 { font-size: min(7cqi, 3.2rem) }`
se calcule sobre el ancho real de su columna. Es lo que mantiene "Clases de inglés y
español" en una sola línea desde 320px hasta escritorio. Si cambias el reparto de
columnas de `.portada__grid`, ese 7cqi deja de tener el margen que se calculó.

**La aparición al hacer scroll usa `translate` y el hover usa `transform`.** Son dos
propiedades CSS distintas que se componen. Cuando ambas efectos usaban `transform`,
la regla de la aparición ganaba por especificidad y anulaba la elevación de
`.tarjeta:hover`. La transición de las dos vive en `.tarjeta`, no en la regla de
revelado.

**`.destacado` es más estrecha que el carrusel a propósito** (46rem frente a 52rem),
para que la cita conserve su jerarquía respecto a la caja de testimonios.

## JavaScript: nada debe depender de él

Los tres scripts de `assets/js/` son opcionales por diseño y esa propiedad hay que
conservarla.

`assets/js/revelar.js` añade la clase `con-revelado` al `<html>` **solo cuando de
verdad va a animar**. Todo el CSS que oculta elementos cuelga de esa clase, así que
sin JavaScript o con `prefers-reduced-motion` nada queda invisible.

`assets/js/carrusel.js` convierte la lista de testimonios en carrusel añadiendo
`carrusel--activo`. Sin esa clase la lista se ve apilada y completa. El avance
automático (12s) se para al pasar el ratón o al recibir foco, y se apaga **para
siempre** en cuanto alguien usa una flecha, un punto, las teclas ←/→ o desliza con
el dedo: quien toma el control no quiere que se lo quiten.

## `practica/` — el aula, no listada

`practica/index.html` es el índice de actividades para estudiantes y
`practica/<nombre>.html` cada actividad. **Ninguna página pública debe enlazar a
esta carpeta**: se comparte por enlace directo. Todas llevan
`<meta name="robots" content="noindex, nofollow">`, y hay que mantenerlo al añadir
páginas nuevas.

No es una carpeta privada, y no hay que fingir que lo sea: el repositorio es
público, así que los archivos se ven en GitHub y quien tenga la URL entra. **No
montes un "login" en JavaScript**: la contraseña viajaría en el código que descarga
el navegador. Si alguna vez hace falta control de acceso real, la respuesta es
cambiar de alojamiento o pagar GitHub Pro, no simularlo.

Las actividades que Lorena escribe llegan como archivos sueltos con su propio
diseño. La forma de integrarlas es **copiar el archivo y redefinir los valores de
sus variables CSS** a los del sitio, conservando sus nombres y sus reglas, más el
marco común (cabecera, `portada--simple`, pie). Reescribirlas entera es tirar
piedras sobre el propio tejado: el contenido pedagógico es suyo y hay que poder
verificar que no cambió.

**Arrastrar y soltar necesita siempre una alternativa.** El drag & drop de HTML5 no
dispara ningún evento en pantallas táctiles, que es donde estudia la mayoría. Las
dos actividades que lo usan llevan una segunda vía —tocar origen y luego destino en
`preterito-indefinido.html`, flechas ▲▼ en `comida-y-lugares.html`— y cualquier
actividad nueva con arrastre debe llevarla también.

`assets/js/actividad.js` es el motor de las actividades de huecos. Una actividad
nueva es solo HTML: un `<form data-quiz>`, un `<input data-respuesta="...">` por
hueco —varias respuestas válidas separadas por `|`— y un `<p data-aviso>` dentro de
cada `.pregunta`. La corrección ignora mayúsculas y espacios sobrantes, pero
distingue el fallo de tilde del fallo de palabra y lo dice con otro mensaje y otro
color. `practica/ejemplo.html` sirve de plantilla.

## Iconos

Los seis iconos de `clases.html` van en línea en el HTML, con `stroke="currentColor"`
para heredar el color del tema. Se redibujaron con un trazo único a partir de los
conceptos de los iconos originales de Wix, que venían cada uno de un color distinto.
Si añades uno, respeta el `viewBox="0 0 24 24"` y el `stroke-width="1.5"`.
