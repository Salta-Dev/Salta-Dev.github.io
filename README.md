# landing-page

Landing page de la comunidad de SaltaDev

Nueva update extendiendo el uso del website, actualmente usando Jekyll

Pasos de instalacion:

🔧 1. Instalar Jekyll
Si no lo tienes, instálalo con:

```sh
gem install jekyll bundler
```

Si usas Windows, instala Ruby+DevKit primero desde [https://rubyinstaller.org/](rubyinstaller.org).

Puedes ejecutar la task de visual studio code para ejecutarlo. sino tienes el comando

```sh
bundle exec jekyll serve --livereload --config _config.yml
```

EVENTOS

Puedes crear eventos en la folder de \_events, deben tener el formato dd_mm_yyyy_prioridad, como por ejemplo "20_03_2025_0", mientras mas alto es el numero es un evento de mayor prioridad, por lo que puede haber multiples eventos un mismo dia, dentro de ellos. Siempre sigue el esquema base de evento el cual tiene como nombre "00_00_00_00"
