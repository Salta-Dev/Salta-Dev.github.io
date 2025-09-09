/**
 * Main Application Entry Point - SaltaDev Landing Page
 * Coordina todos los módulos y funcionalidades del sitio
 * Estructura final optimizada con gestión centralizada de assets
 */
import { ASSET_PATHS, buildAssetPath } from './config/paths.js';
import { ParticleSystem } from './modules/particles.js';
import { NavigationController } from './modules/navigation.js';
import { DOMUtils, DeviceUtils } from './modules/utils.js';

class SaltaDevApp {
  constructor() {
    this.modules = {};
    this.isInitialized = false;
    this.config = {
      version: '1.0.0',
      debug: false,
      assetPaths: ASSET_PATHS
    };
  }

  /**
   * Inicializa la aplicación
   */
  async init() {
    if (this.isInitialized) {
      console.warn('SaltaDevApp ya está inicializada');
      return;
    }

    try {
      console.log('Inicializando SaltaDev App...');
      
      // Verificar dependencias críticas
      if (!this.checkDependencies()) {
        console.error('Dependencias críticas no encontradas');
        return;
      }

      // Inicializar módulos core
      await this.initializeCore();
      
      // Inicializar funcionalidades específicas
      this.initializeFeatures();
      
      this.isInitialized = true;
      console.log('SaltaDev App inicializada correctamente');
      
    } catch (error) {
      console.error('Error inicializando SaltaDev App:', error);
    }
  }

  /**
   * Verifica que las dependencias críticas estén disponibles
   */
  checkDependencies() {
    const dependencies = {
      'GSAP': () => typeof gsap !== 'undefined',
      'Bootstrap': () => typeof bootstrap !== 'undefined' || document.querySelector('.btn') !== null
    };

    let allDependenciesLoaded = true;

    for (const [name, check] of Object.entries(dependencies)) {
      if (!check()) {
        console.warn(`Dependencia ${name} no encontrada`);
        // No bloqueamos la ejecución, solo advertimos
      }
    }

    return allDependenciesLoaded;
  }

  /**
   * Inicializa los módulos core
   */
  async initializeCore() {
    // Inicializar sistema de partículas
    this.modules.particles = new ParticleSystem({
      particleCount: 5,
      colors: ["rgb(148, 64, 60)", "white"],
      colorProbability: 75
    });

    // Inicializar navegación
    this.modules.navigation = new NavigationController();
    this.modules.navigation.init();

    // Configurar sistema de partículas en enlaces
    this.modules.particles.initializeOnLinks();
  }

  /**
   * Inicializa funcionalidades específicas según la página
   */
  initializeFeatures() {
    const currentPage = this.getCurrentPage();
    
    // Log del dispositivo y página para debugging
    console.log(`Página actual: ${currentPage}, Dispositivo: ${DeviceUtils.getDeviceType()}`);

    // Funcionalidades específicas por página se cargan automáticamente
    // mediante el sistema de scripts en body-scripts.html
  }

  /**
   * Obtiene la página actual basada en la URL
   */
  getCurrentPage() {
    const path = window.location.pathname;
    
    if (path === '/' || path === '/index.html') return 'home';
    if (path.includes('/events')) return 'events';
    if (path.includes('/reglamento')) return 'reglamento';
    
    return 'unknown';
  }

  /**
   * Limpia recursos al salir
   */
  destroy() {
    Object.values(this.modules).forEach(module => {
      if (module && typeof module.destroy === 'function') {
        module.destroy();
      }
    });
    
    this.modules = {};
    this.isInitialized = false;
  }

  /**
   * Obtiene una instancia de módulo
   */
  getModule(name) {
    return this.modules[name] || null;
  }
}

// Crear instancia global de la aplicación
const saltaDevApp = new SaltaDevApp();

// Inicializar cuando el DOM esté listo
DOMUtils.ready(() => {
  saltaDevApp.init();
});

// Limpiar al salir de la página
window.addEventListener('beforeunload', () => {
  saltaDevApp.destroy();
});

// Exportar para uso global si es necesario
window.SaltaDevApp = saltaDevApp;

export default saltaDevApp;