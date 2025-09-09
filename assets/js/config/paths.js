/**
 * Configuración central de rutas de assets
 * Facilita el mantenimiento y actualización de rutas
 */

export const ASSET_PATHS = {
  // Rutas base
  BASE: '/assets',
  
  // CSS
  CSS: {
    BASE: '/assets/css',
    COMPONENTS: '/assets/css/components',
    PAGES: '/assets/css/pages',
    MAIN: '/assets/css/main.css'
  },
  
  // JavaScript
  JS: {
    BASE: '/assets/js',
    MODULES: '/assets/js/modules',
    PAGES: '/assets/js/pages',
    VENDORS: '/assets/js/vendors',
    CONFIG: '/assets/js/config'
  },
  
  // Imágenes
  IMG: {
    BASE: '/assets/img',
    PARTNERS: '/assets/img/partners',
    EVENTS: '/assets/img/events',
    ICONS: '/assets/img/icons',
    BACKGROUNDS: '/assets/img/backgrounds',
    STAFF: '/assets/img/staff'
  },
  
  // Fuentes
  FONTS: {
    BASE: '/assets/fonts'
  }
};

/**
 * Helper para construir rutas completas
 * @param {string} category - Categoría del asset (CSS, JS, IMG, etc.)
 * @param {string} subcategory - Subcategoría opcional
 * @param {string} filename - Nombre del archivo
 * @returns {string} Ruta completa del asset
 */
export function buildAssetPath(category, subcategory = null, filename = '') {
  const basePath = ASSET_PATHS[category.toUpperCase()];
  
  if (!basePath) {
    console.warn(`Categoría de asset no encontrada: ${category}`);
    return filename;
  }
  
  if (subcategory && basePath[subcategory.toUpperCase()]) {
    return `${basePath[subcategory.toUpperCase()]}/${filename}`;
  }
  
  if (typeof basePath === 'object') {
    return `${basePath.BASE}/${filename}`;
  }
  
  return `${basePath}/${filename}`;
}

/**
 * Configuración de versiones para cache busting
 */
export const ASSET_VERSIONS = {
  CSS_VERSION: '1.0.0',
  JS_VERSION: '1.0.0',
  LAST_UPDATED: '2025-09-09'
};
