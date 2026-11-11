# Para Agus, con amor ♡

Una página de Facu para Agustina, para hacer una pausa entre los exámenes de Instrumentación Quirúrgica. Textos cortos, una carta y la cuenta regresiva al 10 de diciembre.

Diseño pensado primero para iPhone 15 Pro, con colores pastel, flores ilustradas, carta desplegable, papelitos con mensajes, un botón fijo a ♡ f y una lluvia de corazones y flores de colores al tocar «Tocá para una sorpresa». Los efectos también funcionan tocando la pantalla; no dependen del hover.

## Datos del repositorio

- **Nombre recomendado:** `para-agus`
- **Descripción:** `Una pausa entre apuntes, una cartita y la cuenta regresiva al 10 de diciembre. Para Agus. ♡`
- **Cuenta:** `facumarcati`
- **Visibilidad para GitHub Pages gratuito:** público. Tanto el texto como el código podrán ser vistos por otras personas. No subir contraseñas, fotos privadas ni datos que quieras mantener en secreto.
- **Dirección esperada, una vez activado Pages:** https://facumarcati.github.io/para-agus/

La dirección anterior es la prevista; los archivos por sí solos todavía no están publicados.

## Cómo verla antes de subirla

Abrí `index.html` con tu navegador. No hay que instalar nada ni ejecutar una compilación. Las fuentes de Google se descargan al tener internet; si no hay conexión, se usan fuentes alternativas y la página sigue funcionando.

## Cómo subirla a GitHub, paso a paso

1. Iniciá sesión en tu cuenta personal de GitHub y entrá en https://github.com/new.
2. En **Repository name**, escribí `para-agus` y usá la descripción sugerida arriba.
3. Seleccioná **Public** si vas a usar GitHub Pages con una cuenta gratuita. Dejá desactivada la opción de agregar un README, porque esta carpeta ya lo incluye.
4. Tocá **Create repository**.
5. En el repositorio vacío, elegí **uploading an existing file**. También puede aparecer como **Add file → Upload files**.
6. Subí los archivos que están ADENTRO de esta carpeta: `index.html`, `styles.css`, `script.js`, `flor.svg`, `README.md` y `.nojekyll`. No subas el ZIP ni la carpeta contenedora. `index.html` debe quedar en la raíz del repositorio. Si tu equipo oculta `.nojekyll` y no podés seleccionarlo, podés omitirlo: este sitio no requiere procesamiento especial.
7. En el mensaje del cambio escribí `Primera versión: para Agus, con amor` y confirmá con **Commit changes**.
8. Entrá en **Settings → Pages** del repositorio.
9. En **Build and deployment**, elegí **Deploy from a branch**.
10. Elegí la rama **main** y la carpeta **/ (root)**. Tocá **Save**.
11. Esperá a que GitHub muestre que la publicación terminó. Revisá **Actions** si todavía no aparece. Después abrí https://facumarcati.github.io/para-agus/.
12. Probala desde Safari en el iPhone antes de pasarle el link a Agus: abrí la carta, tocá los tres papelitos, el corazón y el botón «Tocá para una sorpresa».

Los nombres de algunas opciones pueden aparecer traducidos. Si elegís otro nombre para el repositorio, reemplazá `para-agus` en la dirección final. Si la URL muestra un error 404, revisá que `index.html` esté en la raíz y que el despliegue de Pages haya terminado correctamente.

Referencia: [guía oficial de publicación de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Cuenta regresiva

Está configurada para el **10 de diciembre de 2026**, en horario de Argentina (UTC−3):

- Hasta el 9 inclusive: muestra días, horas, minutos y segundos hasta el inicio del 10 de diciembre.
- Durante el 10: cambia a «Es hoy. El último examen.», sin asumir la hora del examen.
- Desde el 11: cambia a «Modo vacaciones».

El calendario de diciembre de 2026 marca el jueves 10 con un corazón y el martes 15 con una estrella de mes aniversario. No se inventaron otras fechas de exámenes.

## Cómo personalizarla

- **Carta, nombre y dedicatorias:** editá `index.html`.
- **Efecto de la sorpresa:** cada toque del botón hace caer 72 corazones y flores, sin mostrar frases. Los toques seguidos suman efectos sin reiniciarlos. El encabezado a ♡ f también es un botón y agrega 36 efectos por toque. La cantidad se puede cambiar en la llamada `petals(72, true)` de `script.js`. Si el teléfono tiene activada la opción de reducir movimiento, se respeta esa preferencia y no se muestra la lluvia.
- **Fecha del último examen:** editá `EXAM_DAY` y `VACATION_START` en `script.js`; actualizá también el calendario, los textos y el año de `index.html` si cambia el período.
- **Colores:** están al comienzo de `styles.css`, dentro de `:root`.

Para hacer cambios desde GitHub, abrí el archivo, tocá el lápiz, editá y confirmá el cambio. Pages volverá a publicar la página. Revisá que termine el despliegue y recargá Safari si ves la versión anterior.

## Archivos y privacidad

Sitio estático sin dependencias de JavaScript, sin formularios, sin cuentas, sin analítica y sin almacenamiento de datos. Las flores están dibujadas en SVG dentro de la página y no requieren imágenes externas. Las únicas solicitudes externas del diseño son las fuentes de Google Fonts; podés eliminar la línea `@import` de `styles.css` para usar solo fuentes locales.

Funciona con teclado y respeta la preferencia de reducir movimiento. No incluye fotos personales ni credenciales.
