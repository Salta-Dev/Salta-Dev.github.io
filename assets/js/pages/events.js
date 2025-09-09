/**
 * Events Page Script - Maneja la lógica específica de la página de eventos
 */
import { CountdownTimer } from '../modules/countdown.js';

class EventsPage {
  constructor() {
    this.countdownTimer = null;
  }

  /**
   * Inicializa la página de eventos
   */
  init() {
    // Obtener la fecha del evento desde el DOM
    const eventDateElement = document.getElementById("currentEventDate");
    
    if (!eventDateElement) {
      console.warn('No se encontró el elemento currentEventDate');
      return;
    }

    const eventDateString = eventDateElement.textContent.trim();
    
    if (!eventDateString) {
      console.warn('No hay fecha de evento disponible');
      return;
    }

    // Crear e iniciar el contador regresivo
    this.countdownTimer = new CountdownTimer(eventDateString);
    this.countdownTimer.start();
  }

  /**
   * Limpia recursos cuando se sale de la página
   */
  destroy() {
    if (this.countdownTimer) {
      this.countdownTimer.stop();
      this.countdownTimer = null;
    }
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const eventsPage = new EventsPage();
  eventsPage.init();

  // Limpiar al salir de la página
  window.addEventListener('beforeunload', () => {
    eventsPage.destroy();
  });
});
