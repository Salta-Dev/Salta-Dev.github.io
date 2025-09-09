# SaltaDev - Landing Page

![SaltaDev Logo](/assets/img/logo-text.webp)

Página web oficial de la **comunidad de desarrolladores más grande de Salta**, construida con Jekyll y optimizada para GitHub Pages.

## 🌟 Características

- **Diseño responsive** compatible con dispositivos móviles y desktop
- **Sistema de eventos dinámico** con countdown automático
- **Galería de partners** con carousel animado
- **Sección de equipo** con información de administradores
- **Formulario de contacto** integrado
- **Optimización SEO** y rendimiento web
- **Arquitectura modular** con componentes reutilizables

## 🛠️ Tecnologías Utilizadas

- **Jekyll** 4.x - Generador de sitios estáticos
- **Bootstrap** 5.3.3 - Framework CSS responsive
- **GSAP** 3.12.7 - Animaciones y efectos visuales
- **Font Awesome** 6.7.2 - Iconografía
- **Google Fonts** (Poppins) - Tipografía
- **Liquid** - Template engine de Jekyll

## 📁 Estructura del Proyecto

```
├── _confidents/          # Archivos de partners/sponsors
├── _events/             # Eventos de la comunidad
├── _includes/           # Componentes reutilizables
│   ├── head/           # Meta tags y imports
│   ├── contact.html    # Formulario de contacto
│   ├── footer.html     # Pie de página
│   ├── nav.html        # Navegación
│   ├── partners.html   # Sección de partners
│   └── staff.html      # Equipo de administración
├── _staff/             # Información del equipo
├── assets/             # Recursos estáticos organizados
│   ├── css/           # Estilos CSS modulares
│   │   ├── components/ # Estilos de componentes
│   │   ├── pages/     # Estilos específicos de páginas
│   │   ├── main.css   # Estilos principales
│   │   └── style.css  # Configuración global
│   ├── fonts/         # Fuentes personalizadas
│   ├── img/           # Imágenes categorizadas
│   │   ├── backgrounds/
│   │   ├── events/
│   │   ├── icons/
│   │   ├── partners/
│   │   └── staff/
│   └── js/            # JavaScript modular
│       ├── components/ # Módulos de componentes
│       ├── config/    # Configuraciones
│       └── main.js    # Archivo principal
├── index.html         # Página principal
├── events.html        # Página de eventos
├── reglamento.html    # Página de reglamento
└── _config.yml        # Configuración de Jekyll
```

## 🚀 Instalación y Desarrollo

### Prerrequisitos

1. **Ruby** (versión 2.7 o superior)
   - Windows: Descargar desde [RubyInstaller](https://rubyinstaller.org/)
   - macOS: `brew install ruby`
   - Linux: `sudo apt-get install ruby-full`

2. **Jekyll y Bundler**
   ```bash
   gem install jekyll bundler
   ```

### Configuración Local

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Salta-Dev/landing-page.git
   cd landing-page
   ```

2. **Instalar dependencias**
   ```bash
   bundle install
   ```

3. **Ejecutar servidor de desarrollo**
   ```bash
   bundle exec jekyll serve --livereload --config _config.yml
   ```

4. **Abrir en navegador**
   - Ir a `http://localhost:4000`
   - Los cambios se recargan automáticamente con LiveReload

### VS Code (Recomendado)

El proyecto incluye una task configurada. Usar `Ctrl+Shift+P` → "Tasks: Run Task" → "Jekyll GitHub Pages Server"

## 📅 Gestión de Eventos

### Crear un Evento

1. **Crear archivo** en `_events/` con formato: `dd_mm_yyyy_prioridad.md`
   - Ejemplo: `15_12_2025_00.md`
   - La prioridad (00-99) determina el orden de visualización

2. **Estructura del archivo**:
   ```yaml
   ---
   title: "Nombre del Evento"
   description: "Descripción detallada del evento"
   location: "Lugar del evento"
   photo: "/assets/img/events/evento.jpg"
   link: "https://enlace-al-evento.com"
   date: 2025-12-15 19:00:00 -0300
   event_start_date: "15_12_2025:19_00_00"
   event_end_date: "15_12_2025:22_00_00"
   event_date_parsed: "15/12/2025"
   event_hours_parsed: "19:00 - 22:00"
   ---
   
   Contenido adicional del evento en Markdown...
   ```

### Formato de Fechas

- **`event_start_date/event_end_date`**: `dd_MM_yyyy:hh_mm_ss`
- **`date`**: Formato ISO con timezone de Argentina (-0300)
- **`event_date_parsed`**: Formato de visualización `dd/MM/yyyy`
- **`event_hours_parsed`**: Formato de visualización `hh:mm - hh:mm`

## 👥 Gestión de Equipo

### Agregar Miembro del Staff

Crear archivo en `_staff/` con formato `nombre_apellido.md`:

```yaml
---
name: "Nombre Completo"
role: "Cargo" # Fundador, Administrador, Administradora
description: "Descripción profesional"
photo: "/assets/img/staff/nombre_apellido.jpg"
twitter: "https://twitter.com/usuario" # Opcional
linkedin: "https://linkedin.com/in/usuario"
github: "https://github.com/usuario" # Opcional
---
```

## 🤝 Gestión de Partners

### Agregar Partner/Sponsor

Crear archivo en `_confidents/` con formato `nombre_empresa.md`:

```yaml
---
name: "Nombre de la Empresa"
description: "Descripción de la empresa"
link: "https://empresa.com"
icon: "/assets/img/partners/logo_empresa.png"
---
```

## 🎨 Personalización de Estilos

### CSS Modular

- **`main.css`**: Estilos principales del sitio
- **`components/`**: Estilos de componentes específicos
- **`pages/`**: Estilos específicos de páginas
- **`style.css`**: Configuración global y variables CSS

### Variables CSS Principales

```css
:root {
  --primaryColor: #ff4444;
  --font-path: '/assets/fonts/';
  --img-path: '/assets/img/';
}
```

## 🚀 Despliegue

### GitHub Pages (Automático)

El sitio se despliega automáticamente en GitHub Pages con cada push a la rama `main`.

### Despliegue Manual

```bash
# Construir sitio para producción
bundle exec jekyll build

# Los archivos generados estarán en _site/
```

## 📱 SEO y Performance

- **Meta tags** optimizados para redes sociales
- **Imágenes optimizadas** en formatos WebP y AVIF
- **CSS y JS minificados** en producción
- **Lazy loading** de imágenes
- **Sitemap** automático generado por Jekyll

## 🤝 Contribución

1. **Fork** del repositorio
2. **Crear rama** para la característica: `git checkout -b feature/nueva-caracteristica`
3. **Commit** de cambios: `git commit -m 'Agregar nueva característica'`
4. **Push** a la rama: `git push origin feature/nueva-caracteristica`
5. **Crear Pull Request**

## 📞 Contacto

- **Email**: comusaltadev@gmail.com
- **Website**: [saltadev.org](https://saltadev.org)
- **WhatsApp**: [Únete a la comunidad](https://linktr.ee/saltadev)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**Hecho con ❤️ por la comunidad SaltaDev**
