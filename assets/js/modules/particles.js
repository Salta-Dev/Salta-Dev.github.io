/**
 * Particle System Module - Maneja el sistema de partículas animadas
 */
export class ParticleSystem {
  constructor(options = {}) {
    this.options = {
      particleCount: options.particleCount || 5,
      colors: options.colors || ["rgb(148, 64, 60)", "white"],
      colorProbability: options.colorProbability || 75,
      duration: options.duration || 2.5,
      sizeMultiplier: options.sizeMultiplier || 2,
      ...options
    };
  }

  /**
   * Crea una partícula individual en las coordenadas especificadas
   * @param {number} x - Coordenada X
   * @param {number} y - Coordenada Y
   */
  createParticle(x, y) {
    if (typeof gsap === 'undefined') {
      console.warn('GSAP no está disponible para el sistema de partículas');
      return;
    }

    const particle = document.createElement("i");
    particle.classList.add("particle", "fa-solid", "fa-splotch");
    document.body.appendChild(particle);

    // Posicionar partícula
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.position = 'fixed';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';

    // Aplicar tamaño aleatorio
    const particleSize = (Math.random() + 1) * this.options.sizeMultiplier;
    particle.style.fontSize = particleSize + "vh";

    // Aplicar color aleatorio
    const useFirstColor = Math.random() * 100 < this.options.colorProbability;
    particle.style.color = useFirstColor ? this.options.colors[0] : this.options.colors[1];

    // Animar partícula
    gsap.to(particle, {
      duration: this.options.duration,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
      scale: 0,
      opacity: 0,
      ease: "power2.out",
      onComplete: () => {
        if (particle.parentNode) {
          particle.remove();
        }
      },
    });
  }

  /**
   * Crea múltiples partículas en las coordenadas especificadas
   * @param {number} x - Coordenada X
   * @param {number} y - Coordenada Y
   * @param {number} count - Número de partículas a crear
   */
  createParticles(x, y, count = null) {
    const particleCount = count || this.options.particleCount;
    for (let i = 0; i < particleCount; i++) {
      this.createParticle(x, y);
    }
  }

  /**
   * Inicializa el sistema de partículas en todos los enlaces
   */
  initializeOnLinks() {
    const links = document.querySelectorAll("a");
    
    links.forEach(link => {
      link.addEventListener("mouseenter", (event) => {
        this.createParticles(
          event.clientX, 
          event.clientY + window.scrollY,
          this.options.particleCount
        );
      });
    });
  }

  /**
   * Inicializa el sistema de partículas en elementos específicos
   * @param {string} selector - Selector CSS de los elementos
   * @param {string} event - Tipo de evento ('mouseenter', 'click', etc.)
   * @param {number} particleCount - Número de partículas por evento
   */
  initializeOnElements(selector, event = 'mouseenter', particleCount = null) {
    const elements = document.querySelectorAll(selector);
    const count = particleCount || this.options.particleCount;
    
    elements.forEach(element => {
      element.addEventListener(event, (e) => {
        this.createParticles(e.clientX, e.clientY + window.scrollY, count);
      });
    });
  }

  /**
   * Método público para crear partículas (mantiene compatibilidad)
   * @param {number} x - Coordenada X
   * @param {number} y - Coordenada Y
   */
  static createParticle(x, y) {
    const defaultSystem = new ParticleSystem();
    defaultSystem.createParticle(x, y);
  }
}

// Función global para mantener compatibilidad con el código existente
window.createParticle = ParticleSystem.createParticle;
