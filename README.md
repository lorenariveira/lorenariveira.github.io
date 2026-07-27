# lorenariveira.com

Sitio web estático de Lorena Riveira, instructora de idiomas en Ámsterdam.
Migrado desde Wix. Sin dependencias, sin proceso de compilación: HTML y CSS a secas.

## Estructura

```
index.html          Inicio
clases.html         ¿Cómo son las clases?
assets/css/         Hoja de estilos
assets/img/         Imágenes (optimizadas)
CNAME               Dominio propio para GitHub Pages
```

## Ver el sitio en local

```bash
python3 -m http.server 8000
```

Y abrir <http://localhost:8000>.

## Publicar

Cualquier `git push` a la rama `main` actualiza el sitio automáticamente
a través de GitHub Pages. No hay que hacer nada más.

## Editar textos

Todo el contenido está escrito directamente en los dos archivos `.html`.
Para cambiar un texto, se busca en el archivo y se edita. Los colores y
tipografías están agrupados al principio de `assets/css/style.css`.
