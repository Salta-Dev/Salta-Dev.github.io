/**
 * Navigation Module - Maneja la navegación y sus animaciones
 */
export class NavigationController {
  constructor() {
    this.rightSide = null;
    this.nav = null;
    this.isMenuOpen = false;
  }

  /**
   * Inicializa el controlador de navegación
   */
  init() {
    this.rightSide = document.getElementById("rightSide");
    this.nav = document.getElementsByTagName("nav")[0];
    
    if (!this.rightSide || !this.nav) {
      console.warn('Elementos de navegación no encontrados');
      return;
    }

    this.setupAnimations();
    this.setupScrollBehavior();
    this.setupMobileMenuClose();
  }

  /**
   * Configura las animaciones de la navegación
   */
  setupAnimations() {
    this.generateNavAnimation("navLogo", true);
    this.generateNavAnimation("navToggle", false);
  }

  /**
   * Genera animaciones para elementos de navegación
   * @param {string} elementId - ID del elemento
   * @param {boolean} animateOnHover - Si debe animar en hover o click
   */
  generateNavAnimation(elementId, animateOnHover) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const timeline = gsap.timeline({ paused: true })
      .to(`#${elementId} .notHover`, {
        scale: 0,
        transform: "translateY(5vh)",
        duration: 0.25,
        ease: "sine.inOut"
      })
      .to(`#${elementId} .inHover`, {
        scale: 1,
        transform: "translateY(-5vh)",
        duration: 0.35,
        rotate: "360deg",
        ease: "sine.inOut"
      });

    if (animateOnHover) {
      this.setupHoverAnimation(element, timeline);
    } else {
      this.setupClickAnimation(element, timeline);
    }
  }

  /**
   * Configura animación de hover
   * @param {HTMLElement} element - Elemento DOM
   * @param {Object} timeline - Timeline de GSAP
   */
  setupHoverAnimation(element, timeline) {
    element.addEventListener("mouseenter", (e) => {
      // Usar el sistema de partículas si está disponible
      if (window.createParticle) {
        for (let i = 0; i < 10; i++) {
          window.createParticle(e.clientX, e.clientY);
        }
      }
      timeline.play();
    });

    element.addEventListener("mouseleave", () => {
      timeline.reverse();
    });
  }

  /**
   * Configura animación de click (para el toggle del menú)
   * @param {HTMLElement} element - Elemento DOM
   * @param {Object} timeline - Timeline de GSAP
   */
  setupClickAnimation(element, timeline) {
    element.addEventListener("click", (e) => {
      // Crear partículas
      if (window.createParticle) {
        for (let i = 0; i < 10; i++) {
          window.createParticle(e.clientX, e.clientY);
        }
      }

      // Toggle del menú
      this.toggleMobileMenu(timeline);
    });
  }

  /**
   * Alterna el estado del menú móvil
   * @param {Object} timeline - Timeline de GSAP
   */
  toggleMobileMenu(timeline) {
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
      timeline.play();
    } else {
      timeline.reverse();
    }

    this.rightSide.classList.toggle("openNav");
    this.nav.classList.toggle("darkBG");
  }

  /**
   * Cierra el menú móvil
   */
  closeMobileMenu() {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
      this.rightSide.classList.remove("openNav");
      this.nav.classList.remove("darkBG");
      
      // Revertir animación del toggle
      const navToggle = document.getElementById("navToggle");
      if (navToggle) {
        gsap.timeline()
          .to("#navToggle .inHover", {
            scale: 0,
            transform: "translateY(-5vh)",
            duration: 0.25,
            ease: "sine.inOut"
          })
          .to("#navToggle .notHover", {
            scale: 1,
            transform: "translateY(0)",
            duration: 0.35,
            ease: "sine.inOut"
          });
      }
    }
  }

  /**
   * Configura el cierre automático del menú al hacer click en enlaces
   */
  setupMobileMenuClose() {
    if (!this.rightSide) return;

    const navLinks = this.rightSide.querySelectorAll("a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        this.closeMobileMenu();
      });
    });
  }

  /**
   * Configura el comportamiento del scroll
   */
  setupScrollBehavior() {
    const navElement = document.getElementById("nav");
    if (!navElement) return;

    document.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        navElement.classList.add("darkBGNav");
      } else {
        navElement.classList.remove("darkBGNav");
      }
    });
  }
}
