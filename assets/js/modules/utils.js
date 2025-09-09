/**
 * Utilities Module - Funciones de utilidad comunes
 */

/**
 * Clase para cargar módulos de forma dinámica
 */
export class LazyLoader {
  /**
   * Carga un módulo de forma dinámica
   * @param {string} moduleName - Nombre del módulo
   * @returns {Promise} - Promesa que resuelve el módulo
   */
  static async loadModule(moduleName) {
    try {
      return await import(`./modules/${moduleName}.js`);
    } catch (error) {
      console.error(`Error loading module ${moduleName}:`, error);
      return null;
    }
  }

  /**
   * Carga un script de página de forma dinámica
   * @param {string} pageName - Nombre de la página
   * @returns {Promise} - Promesa que resuelve el módulo
   */
  static async loadPageScript(pageName) {
    try {
      return await import(`./pages/${pageName}.js`);
    } catch (error) {
      console.error(`Error loading page script ${pageName}:`, error);
      return null;
    }
  }
}

/**
 * Utilidades para el DOM
 */
export class DOMUtils {
  /**
   * Espera a que el DOM esté listo
   * @param {Function} callback - Función a ejecutar cuando el DOM esté listo
   */
  static ready(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  /**
   * Verifica si un elemento existe en el DOM
   * @param {string} selector - Selector CSS del elemento
   * @returns {boolean} - True si el elemento existe
   */
  static exists(selector) {
    return document.querySelector(selector) !== null;
  }

  /**
   * Obtiene un elemento del DOM con manejo de errores
   * @param {string} selector - Selector CSS del elemento
   * @returns {Element|null} - Elemento encontrado o null
   */
  static safeQuery(selector) {
    try {
      return document.querySelector(selector);
    } catch (error) {
      console.warn(`Invalid selector: ${selector}`, error);
      return null;
    }
  }

  /**
   * Obtiene múltiples elementos del DOM con manejo de errores
   * @param {string} selector - Selector CSS de los elementos
   * @returns {NodeList|Array} - Lista de elementos encontrados
   */
  static safeQueryAll(selector) {
    try {
      return document.querySelectorAll(selector);
    } catch (error) {
      console.warn(`Invalid selector: ${selector}`, error);
      return [];
    }
  }
}

/**
 * Utilidades para detección de dispositivos
 */
export class DeviceUtils {
  /**
   * Detecta si es un dispositivo móvil
   * @returns {boolean} - True si es móvil
   */
  static isMobile() {
    return window.innerWidth <= 768;
  }

  /**
   * Detecta si es una tablet
   * @returns {boolean} - True si es tablet
   */
  static isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
  }

  /**
   * Detecta si es desktop
   * @returns {boolean} - True si es desktop
   */
  static isDesktop() {
    return window.innerWidth > 1024;
  }

  /**
   * Obtiene el tipo de dispositivo
   * @returns {string} - 'mobile', 'tablet', o 'desktop'
   */
  static getDeviceType() {
    if (this.isMobile()) return 'mobile';
    if (this.isTablet()) return 'tablet';
    return 'desktop';
  }
}

/**
 * Utilidades para performance
 */
export class PerformanceUtils {
  /**
   * Debounce function - limita la frecuencia de ejecución
   * @param {Function} func - Función a ejecutar
   * @param {number} wait - Tiempo de espera en ms
   * @returns {Function} - Función debounced
   */
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Throttle function - ejecuta máximo una vez por intervalo
   * @param {Function} func - Función a ejecutar
   * @param {number} limit - Intervalo mínimo en ms
   * @returns {Function} - Función throttled
   */
  static throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}
