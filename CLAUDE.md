# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es esto

El sitio web de Lorena Riveira, profesora de idiomas en Ámsterdam, migrado desde
Wix a GitHub Pages en julio de 2026. Cuatro páginas estáticas, dos por idioma:
`index.html` (Inicio) y `clases.html` (¿Cómo son las clases?) en español, más
`en/index.html` y `en/lessons.html` en inglés desde el 11 de agosto de 2026. La
página de reservas de Wix no se migró a propósito: el contacto es directo por
WhatsApp y email.

**El idioma del proyecto es el español**: los nombres de clases CSS, de archivos, de
variables JavaScript, los comentarios y los mensajes de commit están en español.
Manténlo así. La única excepción son los dos nombres de archivo de `/en/`, y el
motivo está en la sección de la versión inglesa.

## Los dos botones de contacto

Acordado el 4 de agosto de 2026. Desde que existe la versión inglesa **están en
cuatro páginas** —`index.html`, `clases.html`, `en/index.html` y `en/lessons.html`—
y **cualquier cambio en uno va en los otros en la misma tanda**: es donde ya se
separaron una vez. Los dos llevan icono desde el 11 de agosto de 2026.

Desde el 9 de octubre de 2026 las dos páginas de clases tienen **otra pareja de
botones de correo y WhatsApp**, en la tarjeta de presupuesto. No son copia de estos:
llevan otras etiquetas y otro `mailto:`, y están explicados en la sección de precios.
El de WhatsApp usa el mismo enlace `wa.me/qr/`.

El de correo lleva el asunto puesto:
`mailto:info@lorenariveira.com?subject=Contacto%20desde%20lorenariveira.com`. Los
espacios van como `%20` y no como `+`: en un `mailto` el `+` es un signo más literal,
no un espacio.

**No es el único `mailto:` del sitio.** La sección de la clase de prueba de
`clases.html` tiene otros dos: «Reserva tu clase de prueba», con el asunto «Reserva
de clase de prueba» y cuerpo, y «Escríbeme por correo», el de pedir presupuesto, con el
asunto «Consulta de precios» y un cuerpo con preguntas. Los asuntos
son distintos a propósito, para que en la bandeja de entrada se distinga quién viene
a reservar, quién pregunta el precio y quién escribe por otra cosa. Si tocas uno,
comprueba que los otros siguen teniendo sentido.

### El enlace de WhatsApp no lleva el número

Las cuatro páginas apuntan a
`https://wa.me/qr/J2IYGOXS4OORE1`, el enlace corto del código QR, **no** a
`wa.me/<número>`. El motivo es que el repositorio es público y un número escrito en
el HTML se lee tanto en el sitio como en GitHub, al alcance de cualquier bot que
rastree números. Si añades otro botón de WhatsApp, usa este mismo enlace.

**El botón de WhatsApp abre la conversación en blanco, y así se queda.** Se estudió
ponerle un mensaje precargado y se descartó el 4 de agosto de 2026: el parámetro
`?text=` **no funciona** con un enlace `wa.me/qr/` —WhatsApp lo descarta en la
redirección, comprobado con `curl`: con y sin `?text=` se acaba en la misma URL,
`api.whatsapp.com/qr/<código>?autoload=1&app_absent=0`—. Es el intercambio de estos
enlaces: ocultan el número precisamente porque dejan de llevar datos en la URL. La
única vía era configurarlo dentro de WhatsApp Business (Herramientas para la empresa
→ Código QR, máximo 140 caracteres), y Lorena decidió no hacerlo.

**No vuelvas a intentarlo por el HTML.** La alternativa que sí admite mensaje en el
enlace es `wa.me/<número>?text=…`, y esa expone el número, que es justo lo que se
quitó. Quien quiera un contacto con asunto ya declarado tiene el botón «Reserva tu
clase de prueba», que es un `mailto:`.

Y no intentes esconder el número con JavaScript: viajaría igual en el código que
descarga el navegador. Es el mismo razonamiento que prohíbe el "login" de mentira
en `practica/`.

## Las tipografías se sirven desde aquí, no desde Google

Cambiado el 4 de agosto de 2026. Todas las páginas del sitio —ocho entonces, diez
desde que existe la versión inglesa— cargaban Fraunces e Inter desde
`fonts.googleapis.com`, y eso entrega la IP de cada visitante a Google antes de que
la página termine de cargar y sin que nadie haya consentido nada. La IP es dato
personal; el Tribunal Regional de Múnich condenó por esto en enero de 2022, con el
argumento de que no hay base legal para la transferencia **porque existe la opción
de autoalojar**. Es sentencia alemana y no vincula en Países Bajos, pero aplica el
mismo RGPD y aquí hay un KvK neerlandés detrás.

Los archivos están en `assets/fuentes/` y las declaraciones `@font-face` al principio
de `style.css`. **No vuelvas a meter un `<link>` a `fonts.googleapis.com`**: el sitio
no hace ni una sola petición a terceros y por eso no necesita banner de cookies.
Conviene que siga siendo verdad.

Detalles que no son evidentes:

- Son tres familias: **Fraunces** para titulares, **Inter** para el texto y
  **Caveat**, manuscrita, que usa **solo la viñeta de la portada**. Si Caveat deja
  de usarse ahí, borra también sus archivos: son 104 KB que si no se descargan para
  nada.
- Son **fuentes variables**: un archivo cubre todo un rango de grosores. Por eso hay
  ocho archivos y no veintitantos, y por eso los `@font-face` declaran rangos
  (`font-weight: 500 600`) en vez de pesos sueltos.
- Solo se descargaron los subconjuntos **`latin` y `latin-ext`**. Los de cirílico,
  griego y vietnamita que sirve Google se descartaron: no hacen falta para español,
  inglés ni neerlandés.
- Los `unicode-range` son los de Google sin tocar. Gracias a ellos el navegador ni
  se descarga el archivo `latin-ext` si el texto no lo necesita.
- El `src` es `../fuentes/…`, relativo a `assets/css/style.css`, así que resuelve
  igual desde la raíz que desde `practica/`. No lo cambies a una ruta absoluta.
- Las tres son OFL 1.1 y su licencia va al lado, en `assets/fuentes/OFL-*.txt`.
  Redistribuirlas obliga a conservarlas: si añades una familia, baja también su OFL.

Para regenerarlas, pide el CSS a Google con un `User-Agent` de navegador moderno
(si no, devuelve `ttf` en vez de `woff2`), quédate con los bloques `latin` y
`latin-ext` y descarga sus URL.

## Precios y clase de prueba

**Desde el 6 de octubre de 2026 el sitio no publica ninguna tarifa.** Lorena quitó
las cifras: las clases individuales ya no dicen «desde 45 € la hora» sino que invitan
a pedir presupuesto, y desaparecieron el paquete de 12 horas (480 €), la
letra pequeña con `*` sobre las tarifas especiales y la lista de datos rápidos de la
sección («Precios finales», «Todos los niveles», «Modalidad a convenir contigo»).
**No las vuelvas a poner por tu cuenta**, ni en el HTML ni en el JSON-LD.

Lo que queda, en `clases.html` y su gemela `en/lessons.html`: la clase de prueba
**gratuita de 20 minutos** (antes 30; entrevista de nivel y objetivos más una
actividad oral breve) con el botón de reserva dentro, y una sola tarjeta de clases
individuales para pedir presupuesto. **La duración de la clase estándar, hora y
media, ya no aparece en la página**: Lorena la quitó el 9 de octubre de 2026.

**La sección no se llama «Precios».** Desde el 9 de octubre de 2026 el titular y el
enlace del menú dicen **«Clase de prueba»** («Trial lesson» en inglés), y el ancla es
`#prueba`. Hasta entonces seguían diciendo «Precios», y Lorena lo cambió porque
titular «Precios» una sección sin cifras parece engañoso. Se buscó antes cómo lo
hacen otros profesores y escuelas: quien titula «Precios», «Rates» o «Pricing» da
alguna cifra, aunque sea un «desde», y quien no la da no usa esa palabra. Si algún
día vuelven las cifras, el título puede volver con ellas; mientras no, no.

**La duración de la prueba está en seis sitios**: el texto visible y el cuerpo del
`mailto:` de reserva de las dos páginas de clases, y la `description` de la oferta
del JSON-LD, que va en las cuatro páginas. Si cambia, cámbiala en todos.

### La tarjeta de clases individuales pide presupuesto

Rehecha el 9 de octubre de 2026 a petición de Lorena: hasta entonces era un título,
una línea y un botón «Consultar precios», y el texto quedaba descolgado. Ahora
invita a pedir **un presupuesto a medida**, y para eso dice qué contarle: el tipo de
clase, el nivel y el objetivo, online o presencial, y cuántas horas a la
semana y durante cuánto tiempo. Así Lorena recibe la consulta con lo que necesita
para calcular el precio, en vez de un «¿cuánto cuesta?» suelto.

Lleva **dos botones, correo y WhatsApp**, porque Lorena quiere que se le pueda
preguntar por los dos canales:

- **«Escríbeme por correo»** («Email me») abre un `mailto:` con el asunto «Consulta
  de precios» («Price enquiry») y **un cuerpo con las mismas preguntas de la lista**,
  cada una con su hueco, para que la persona solo tenga que rellenar.
- **«Escríbeme por WhatsApp»** («Message me on WhatsApp») abre la conversación en blanco, como
  todos: con el enlace `wa.me/qr/` no se puede dejar un mensaje escrito (ver la
  sección de WhatsApp). Por eso la lista está en la página y no solo en el correo:
  es lo único que le dice a quien escribe por WhatsApp qué contar.

**Si cambias una pregunta de la lista, cámbiala también en el cuerpo del `mailto:`**,
en las dos lenguas: son cuatro sitios. **No se pregunta el idioma** que se quiere aprender: lo decidió
Lorena el 9 de octubre de 2026, porque ya lo dice el idioma en que se lee la web.

Las etiquetas «Escríbeme por…» son de Lorena, como la entradilla de la tarjeta
(«Cada estudiante necesita algo distinto, escríbeme y cuéntame:»). Por debajo de
24rem (384 px) los botones de las dos tarjetas llevan menos relleno y letra un poco
más pequeña: a 320 px «Escríbeme por WhatsApp», «Message me on WhatsApp» y «Reserva
tu clase de prueba» partían en dos líneas. Si alargas una etiqueta, vuelve a medir a
320 px en las dos lenguas. Los dos botones son `boton--fantasma` para no competir con «Reserva tu
clase de prueba», que sigue siendo la acción principal de la sección.

**La lista de preguntas y la frase final de la tarjeta son borrador mío**, del 9 de
octubre de 2026, y la versión inglesa también salvo la entradilla. Lorena cambió la
entradilla y las etiquetas de la española, y eligió la inglesa, «Drop me a message
and let me know:», en lugar de «Write to me and tell me:», que era calco de
«escríbeme y cuéntame» y sonaba a carta.

**El botón «Reserva tu clase de prueba» va dentro de la tarjeta de la clase de
prueba**, debajo de su descripción. Lo movió Lorena el 9 de octubre de 2026. Desde
el 4 de agosto iba al final de la sección, después de las cifras, para que quien lo
pulsara ya supiera lo que cuesta; sin cifras, esa razón ya no existía.

Abre un `mailto:` con asunto («Reserva de clase de prueba») y cuerpo ya escritos, no
un salto a `#contacto`. La primera versión iba al ancla y era casi decorativa: la
sección de contacto está inmediatamente debajo, así que el botón solo hacía scroll a
algo que ya se veía. Con el `mailto:` hace algo que la sección de abajo no puede,
que es decir a qué viene la persona.

Que apunte a un solo canal es asumible porque WhatsApp está a la vista justo debajo,
en la tarjeta del presupuesto, y otra vez en la sección de contacto que cierra la
página.

**Lorena decidió no mencionar el IVA ni el CRKBO por ahora.** No lo añadas por
iniciativa propia: la exención de BTW por el registro CRKBO es un argumento
comercial fuerte, se le propuso con esos datos y prefirió dejarlo fuera de momento.

**Los exámenes no se nombran.** Decidido el 11 de agosto de 2026: `clases.html`
dice "exámenes internacionales" y así se queda. No lo conviertas en una lista de
siglas ni preguntes cuáles son para "completarlo".

**Tampoco habrá una sección de preguntas frecuentes aparte.** Esa función ya la
cumple `clases.html`, que es literalmente la página "¿Cómo son las clases?": si
alguna vez hay una duda recurrente que responder, se responde ahí, en las tarjetas
o en la sección de la clase de prueba, no en un bloque nuevo de preguntas y respuestas.

## Datos estructurados (JSON-LD)

Añadido el 4 de agosto de 2026. `index.html` y `clases.html` llevan **el mismo
bloque `application/ld+json`**, un `@graph` con cuatro nodos: `WebSite`, `Person`,
`Organization` y `Service`. Es idéntico en las dos a propósito, para que haya una
sola cosa que mantener; si tocas uno, toca el otro.

Las dos páginas de `/en/` llevan **su propia pareja**, también idéntica entre sí:
mismos `@id`, pero `inLanguage` en `en`, las URL de `/en/` y los textos traducidos.
O sea que hay dos bloques que mantener, no uno, y tocar el español obliga a mirar el
inglés. Los detalles están en la sección de la versión en inglés.

Dos cosas que hay que respetar:

- **Es `Organization`, no `LocalBusiness`.** La documentación de Google reserva los
  subtipos de `LocalBusiness` para direcciones físicas que el cliente puede visitar.
  Aquí solo se declara localidad y país, sin calle.
- **No lleva `telephone`, y no se lo pongas.** Reintroduciría en el HTML el número
  que se quitó a propósito de los enlaces de WhatsApp.

Tampoco lleva `aggregateRating` ni `review` pese a haber cuatro testimonios reales:
las valoraciones que se pone a sí mismo el propio negocio no dan resultados
enriquecidos y es terreno resbaladizo.

El nodo `Service` lleva `offers` con **una sola oferta**: la clase de prueba a 0 €,
con su duración en la `description`. Hasta el 6 de octubre de 2026 llevaba también
las clases individuales (`minPrice` 45 por hora) y el paquete de 12 horas a 480 €;
se quitaron con las cifras de la página, porque el JSON-LD no puede decirle a Google
un precio que la persona no lee. Ver la sección de precios más arriba.

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
  --virtual-time-budget=6000 --window-size=390,6000 \
  --screenshot=captura.png http://127.0.0.1:8000/index.html
```

El alto de la ventana tiene que superar al de la página o la captura sale cortada
por abajo sin avisar. Medidas a 390 px de ancho el 9 de octubre de 2026, con la
tarjeta de presupuesto: `index.html` 3507, `clases.html` 4956,
`en/index.html` 3480 y `en/lessons.html` 4787. Pide 7000 y vas sobrado. Comprueba el número que devuelve el recorte: si
coincide con el alto que pediste, casi seguro que se cortó.

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

**Lo recién publicado tarda hasta diez minutos en verse en un navegador que ya
tuviera la página abierta.** GitHub Pages sirve los recursos con
`cache-control: max-age=600`, y ese encabezado autoriza al navegador a reutilizar su
copia sin ni siquiera preguntar si cambió. El 11 de agosto de 2026 pasó exactamente
eso: el Firefox de Lorena mostró el HTML nuevo con el `style.css` viejo, y el
selector de idioma salió sin ninguno de sus estilos —con el triangulito de serie del
`<summary>` y los SVG a tamaño natural—, mientras que en Chrome se veía bien.

**Antes de dar por roto algo que solo falla en un navegador, descarta la caché.** Se
comprueba así, y no hace falta creer en la palabra de nadie:

```bash
curl -sS https://lorenariveira.com/assets/css/style.css | grep -c idiomas__actual
firefox --headless --profile "$(mktemp -d)" --window-size 1280,900 \
  --screenshot captura.png https://lorenariveira.com/
```

Lo primero dice si lo publicado tiene de verdad la regla. Lo segundo abre el sitio en
un Firefox con perfil nuevo, es decir sin caché ninguna. A Lorena, recarga forzada
(Ctrl+Shift+R) o ventana privada.

## La versión en inglés

Acordada el 29 de julio de 2026 y escrita el 11 de agosto. Alcance: solo
`index.html` y `clases.html`. `practica/` se queda en español.

GitHub Pages no puede traducir nada: es alojamiento estático. La versión inglesa
está escrita a mano y vive en `/en/`, con los nombres de archivo en inglés
—`/en/index.html` y `/en/lessons.html`— que es la única excepción acordada a la
regla de nombrar los archivos en español: una URL la lee el visitante, no el código.
**La excepción llega hasta ahí**: los `id`, las clases y las anclas siguen en
español también en `/en/` (`#prueba`, `#contacto`, `#contenido`), porque eso es
código y lo comparten las dos versiones a través de la misma hoja de estilos.

Desde `/en/` los recursos se referencian como `../assets/`. Cada página lleva
`hreflang` recíproco más `x-default` apuntando al español, que es el idioma de
partida del sitio. El bloque de JSON-LD viaja con `inLanguage` en `en`, las URL de
`/en/` y los textos traducidos, pero **reutilizando los mismos `@id`** para que
Google entienda que es la misma persona y el mismo negocio, no dos.

**Los asuntos de los `mailto:` están en inglés en las páginas inglesas** ("Contact
from lorenariveira.com", "Trial lesson booking" y "Price enquiry"). No es un
descuido: al visitante le llega el asunto en su idioma, y a Lorena le dice de qué
versión del sitio viene quien escribe. Si cambias un asunto, son seis los que hay
que revisar, tres por idioma.

### El selector de idioma

Va en la cabecera de las cuatro páginas, centrado entre la marca y el menú, y cada
uno enlaza a su equivalente, no a la portada. Es decisión de Lorena del 11 de agosto
de 2026, después de descartar una franja aparte encima de la cabecera.

**Es un `<details>` con su `<summary>`, y tiene que seguir siéndolo.** Abre y cierra
sin una línea de JavaScript, así que cambiar de idioma funciona con los scripts
bloqueados. Convertirlo en un menú de `<button>` con JS rompería la regla de que
nada del sitio dependa de él, y justo en el control que necesita quien no entiende
la página que está viendo.

Para centrarlo, **`.cabecera__inner` es una rejilla `1fr auto 1fr`, no un flex con
`space-between`**: con flex el selector quedaría a medio camino entre la marca y el
menú, que miden distinto, en vez de en el centro de la ventana. En móvil la
cabecera es una sola fila, `1fr auto auto`: la marca a la izquierda y el selector y
el botón del menú juntos a la derecha (ver la sección siguiente).

El menú desplegado va en `position: absolute` para que abrirlo no empuje la cabecera.

**Por debajo de 390 px el selector enseña solo el globo**, sin el nombre del idioma,
que sigue ahí para los lectores de pantalla. Es lo que hace caber la cabecera en una
fila: a 360 px, el ancho de muchos Android, la marca partía en dos líneas. Por la
misma razón, a esos anchos el subtítulo «Language Instructor» aprieta el espaciado
entre letras. Si la marca o el selector crecen, vuelve a comprobarlo de 320 a 430 px
en las dos lenguas: «English» y «Español» no miden lo mismo.

### El menú plegable de móvil

Pedido por Lorena el 6 de octubre de 2026, para móvil y tableta. Hasta 70rem
(1120 px) el menú se pliega tras un botón de tres rayas, que pasa a ser una X al
abrirlo, y se despliega como una franja a todo el ancho bajo la cabecera. Por encima
no cambia nada: el menú se ve como siempre.

**El corte es 70rem y no el 46rem del resto del diseño móvil.** El menú de ordenador
parte en dos líneas hasta unos 1104 px en español y 1060 px en inglés —el iPad en
horizontal mide 1024—, y el plegable está para que eso no pase. Era 66rem hasta el 9
de octubre de 2026: «Clase de prueba» es más largo que el «Precios» de antes, y con
la separación de entonces entre enlaces (1.75rem) el menú español no cabía en una
línea a ningún ancho, porque la columna del menú la limita el ancho máximo del sitio
(`--ancho`, 68rem), no la ventana. Se bajó la separación a 1rem, que deja unos 12 px
de margen a ancho completo, y se subió el corte.

**Ese margen es poco.** Cualquier texto más largo en el menú lo rompe a todos los
anchos, no solo en los estrechos. Si se alarga el
texto de un enlace del menú, vuelve a medir dónde parte: un `<iframe>` por ancho y
contar cuántos `top` distintos tienen los enlaces de `.nav`. Entre 46 y 70rem la
cabecera mantiene la rejilla de ordenador, con el selector centrado y el botón a la
derecha; por debajo de 46rem pasa a la fila de móvil.

**Es un `<details class="menu">`, igual que el selector de idioma y por lo mismo**:
abre y cierra sin JavaScript. El truco para que en pantalla ancha se vea aunque el
`<details>` esté cerrado es `::details-content { content-visibility: visible }`,
dentro de un `@supports selector(::details-content)`. Un navegador antiguo que no lo
conozca enseña el botón también en ordenador: peor, pero el menú sigue funcionando.
No lo sustituyas por un `<button>` con JS ni por el truco del checkbox.

`assets/js/menu.js` es solo comodidad: cierra el menú al tocar un enlace —los de
`#prueba` y `#contacto` no cambian de página, y sin él el menú seguiría tapando lo
que se fue a ver—, al pulsar Escape y al tocar fuera.

**El testimonio de Gabriela T. se queda en español, sin traducir**, con `lang="es"`.
Es la misma regla que ya sigue la página española al dejar en inglés los otros tres:
cada testimonio conserva las palabras que escribió cada estudiante. Por eso los tres
ingleses aparecen en `/en/` **con su texto original**, no traducidos de vuelta desde
el español.

### «Lessons», no «classes»

Decidido el 11 de agosto de 2026. En inglés **lesson** es la sesión de enseñanza
—la palabra de las clases particulares: *private lessons*, *trial lesson*— mientras
que **class** es más bien el grupo de estudiantes o la sesión de un curso con grupo.
El americano estira *classes* hasta cubrir las dos, pero lo que vende Lorena es
enseñanza individual, así que toda la versión inglesa dice *lessons*: en el texto,
en los titulares, en el JSON-LD y en el nombre del archivo.

La excepción es **grupo**, donde *group classes* sí es lo natural. Y los testimonios
no se tocan: el de Micheline T. dice "group classes" y "the classes" porque lo
escribió ella.

### La variedad de inglés es la británica

Decidido por Lorena el 11 de agosto de 2026, y sustituye al `en_US` que se había
acordado en julio: `og:locale` dice ahora **`en_GB`** en las dos páginas de `/en/`.

Las cuatro grafías que hay que respetar al escribir texto inglés nuevo:

- **`-ise`, no `-ize`**: `personalised`.
- **`-re`, no `-er`**: `centred`.
- **`programme`** para un plan o un curso; `program` se reserva a la informática, que
  aquí no aparece.
- **`practise`** cuando es verbo ("practise it comfortably from home").

Si alguna vez se cambia de variedad, hay que recorrer las dos páginas enteras y tocar
también `og:locale`.

Los testimonios no entran en esto: el de Micheline T. dice "skillfully", que es la
grafía americana, y se queda como lo escribió ella.

**El «About me» de `/en/index.html` lo escribió Lorena**, el 11 de agosto de 2026,
sobre un borrador mío. Como la entradilla de la portada española, no lo reescribas.

**Pendiente: que Lorena revise el resto de la redacción inglesa**, que sigue siendo
borrador mío.

**No hay plantillas ni compilación, así que las dos versiones no se sincronizan
solas: todo cambio en `index.html` o `clases.html` hay que replicarlo a mano en
`en/`, en la misma tanda.** Es el precio de no meter un paso de compilación en un
sitio cuya gracia es no tenerlo, y el riesgo real es que las dos versiones se
separen sin que nadie lo note.

## Los textos son de Lorena

Actualizado el 11 de agosto de 2026: **los textos ya no vienen de Wix**. El sitio
antiguo dejó de ser la referencia, y la razón de esta sección ya no es la fidelidad
a aquella copia sino que el contenido es de Lorena. **No lo reescribas, resumas ni
"mejores" sin que ella lo pida**, y tampoco lo "restaures" a ninguna versión
anterior.

**La portada de `index.html` se reescribió el 4 de agosto de 2026 a petición de
Lorena**, para que su nombre y su servicio fueran lo primero que se ve. El titular
actual, "Clases de inglés y español en Ámsterdam", se
armó con palabras que ya estaban en el sitio. **La entradilla la escribió Lorena**
—"Te ayudo a aprender o mejorar tu inglés o español. Clases pensadas alrededor de
ti: tu nivel, tus objetivos y tu ritmo."— y habla al lector de tú a propósito: no la
pases a tercera persona ni la "neutralices".

Ojo con `ti`: **no lleva tilde nunca**, ni siquiera cuando acompaña a un
posesivo. Es la clase de errata que en el sitio de una profesora de idiomas se paga
cara, así que revísalo cada vez que se toque este texto.

Dos bloques los decidió ella directamente y no admiten reordenación por tu cuenta:
toda la sección de la clase de prueba de `clases.html`, la antigua de precios
(rehecha por ella el 6 y el 9 de octubre de 2026), y la lista de datos rápidos de su
portada, que Lorena dejó así el 4 de agosto de 2026: enfoque
comunicativo, programas personalizados, online y presencial, todos los niveles,
profesora CELTA y más de 14 años de experiencia. El orden es intencionado —abre por
el método y cierra por las credenciales—, así que no lo alfabetices ni lo agrupes
por tu cuenta.

Los testimonios están en el idioma en que los escribió cada estudiante: tres en
inglés (con `lang="en"`) y uno en español. Son palabras de otras personas: no se
traducen, no se corrigen y no se abrevian.

## Detalles del CSS que parecen arbitrarios y no lo son

`assets/css/style.css` es la única hoja de estilos. Los colores y tipografías están
agrupados en `:root` al principio, después de los `@font-face`. Cuatro decisiones se
romperían fácil sin saber por qué:

**El titular de portada se mide con `cqi`, no con `vw`.** `.portada__texto` declara
`container-type: inline-size` para que `.portada h1 { font-size: min(7.4cqi, 3.1rem) }`
se calcule sobre el ancho real de esa columna y no sobre la ventana. **Si cambias el
reparto de columnas de `.portada__grid` (hoy `1.2fr .9fr`), ese valor deja de tener
el margen que se calculó**: compruébalo a 390px y a 1280px antes de darlo por bueno.

**El nombre no está en el `<h1>`, y es deliberado.** El `h1` dice "Clases de inglés
y español en Ámsterdam" —las palabras por las que busca quien todavía no conoce a
Lorena— y el nombre vive en la viñeta `.portada__saludo`, que es un saludo dibujado
y no un encabezado. Si algún día el nombre vuelve al `h1`, que sea acompañando al
servicio, nunca en su lugar.

**La viñeta se ancla a la foto, no a la celda de la rejilla.** `.portada__retrato`
lleva el `max-width` y el `container-type: inline-size`, y la imagen ocupa el 100 %
de él. Es lo que hace que en móvil el saludo quede pegado a la cara: si el
`max-width` volviera a `.retrato`, la celda seguiría siendo ancha y la viñeta se
iría al borde de la pantalla. La cola es un cuadrado girado 45° con solo dos bordes,
y la inclinación de −4° va en el globo entero, cola incluida, porque ambos están en
el mismo elemento.

**La viñeta va en Caveat y bastante más grande de lo que parecería necesario.** No
es capricho: las manuscritas tienen la altura de equis mucho más baja que una serif,
así que al mismo tamaño en puntos se leen bastante más pequeñas. Si la cambias por
otra tipografía, revisa el `font-size` en vez de heredarlo.

**La aparición al hacer scroll usa `translate` y el hover usa `transform`.** Son dos
propiedades CSS distintas que se componen. Cuando ambas efectos usaban `transform`,
la regla de la aparición ganaba por especificidad y anulaba la elevación de
`.tarjeta:hover`. La transición de las dos vive en `.tarjeta`, no en la regla de
revelado.

**`.destacado` es más estrecha que el carrusel a propósito** (46rem frente a 52rem),
para que la cita conserve su jerarquía respecto a la caja de testimonios.

**El mínimo de `.tarjetas` (20rem) y el `font-size` de `.tarjeta h3` (1.12rem) están
atados entre sí y a la longitud de los títulos.** Ajustado el 11 de agosto de 2026:
con el mínimo anterior de 17rem la rejilla aguantaba tres columnas hasta ventanas de
1024 px, y a ese ancho el título más largo de cada idioma —"Technology at the cutting
edge" y "Profesionalidad y experiencia"— partía en dos líneas y descuadraba la fila
entera. Ahora la tercera columna se cae hacia los 1070 px y la segunda hacia los
710 px. Comprobado de 320 a 1440 px en las dos páginas: ningún título parte.

Si alguien añade una tarjeta con un título más largo que esos dos, o sube el
`font-size`, vuelve a partir. La forma de comprobarlo sin ir mirando capturas es
medir los rectángulos de línea de cada `h3` dentro de un `<iframe>` del ancho que se
quiera probar: `range.selectNodeContents(h3)` y contar `range.getClientRects()`, que
devuelve uno por línea.

**Los fondos de las secciones alternan, y esa alternancia es lo único que las
separa.** `.seccion` va sobre el crema de la página y `.seccion--alt` lleva
`--crema-alt`; no hay bordes ni sombras entre secciones. Si dos consecutivas
comparten fondo, se funden en un solo bloque y el lector pierde de vista dónde
acaba una. Al añadir la sección de precios pasó exactamente eso: precios y contacto
quedaron las dos en crema, y por eso el contacto de `clases.html` lleva
`seccion--alt` y el de `index.html` no. **No es una inconsistencia entre páginas: es
que cada una tiene un número distinto de secciones antes.** Al insertar o mover una
sección, recorre la página entera y comprueba que sigan alternando.

## JavaScript: nada debe depender de él

Los cuatro scripts de `assets/js/` son opcionales por diseño y esa propiedad hay que
conservarla. El selector de idioma y el menú plegable de móvil tampoco usan
JavaScript, y por eso son `<details>`; está explicado en sus secciones.

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

**Un toque en pantalla dispara `touchend` y después `click`.** Lo aprendimos al
integrar `por-y-para.html` el 24 de agosto de 2026: su manejador de `touchend`
giraba la tarjeta y el `click` que viene detrás la volvía a girar, así que en móvil
—donde estudia la mayoría— parecía que no pasaba nada. La regla para cualquier
actividad con gestos: en `touchend` se atiende **solo** el deslizamiento, con
`e.preventDefault()` para que no llegue el `click`, y el toque simple se deja para
el manejador de `click`.

**Las tarjetas que se giran ocultan su reverso con `aria-hidden`.** La cara de atrás
sigue en el HTML aunque `backface-visibility` la esconda, y un lector de pantalla la
lee: cantaría la respuesta antes de que el estudiante la piense. En
`por-y-para.html` el envoltorio es un `<button>` —para poder girarla con el
teclado— con `aria-expanded`, y al girar se intercambia el `aria-hidden` de las dos
caras y se anuncia la respuesta en una región `aria-live`.

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

**Los iconos de dentro de un botón son macizos, y no es una incoherencia.** La regla
`.boton svg { fill: currentColor }` rellena cualquier SVG que se meta en un botón,
así que un icono de trazo saldría de mancha: el `fill="none"` del atributo pierde
contra la hoja de estilos. Por eso el de WhatsApp y el sobre del botón de correo
—añadido el 11 de agosto de 2026— están dibujados como siluetas rellenas.

El sobre lleva `fill-rule="evenodd"` y dos subtrazados: el cuerpo y una banda en
uve que le abre la solapa. Con la regla de relleno por defecto no habría hueco y
saldría un rectángulo liso, así que **si tocas el `d`, no le quites el
`fill-rule`**.
