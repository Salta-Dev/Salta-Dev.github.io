/**
 * CountdownTimer Module - Maneja el contador regresivo para eventos
 */
export class CountdownTimer {
  constructor(targetDateString, containerId = 'countdown-container') {
    this.containerId = containerId;
    this.interval = null;
    this.days = 0;
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.targetDate = this.parseEventDate(targetDateString);
  }

  /**
   * Parsea la fecha del evento desde el formato específico del sitio
   * @param {string} dateString - Formato: "DD_MM_YYYY_HH:MM_SS"
   * @returns {Date} - Objeto Date parseado
   */
  parseEventDate(dateString) {
    const dateParts = dateString.split(":");
    const dayParts = dateParts[0].split("_");
    const hourParts = dateParts[1].split("_");

    const templateString = `${dayParts[2]}-${dayParts[1]}-${dayParts[0]}T${hourParts[0]}:${hourParts[1]}:${hourParts[2]}-03:00`;
    return new Date(templateString);
  }

  /**
   * Calcula los días entre dos fechas
   */
  daysBetween(date1, date2) {
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.round((date2.getTime() - date1.getTime()) / oneDay);
  }

  /**
   * Calcula la diferencia en segundos entre dos fechas
   */
  secondsDifference(date1, date2) {
    const oneDay = 1000 * 60 * 60 * 24;
    const differenceMs = date2.getTime() - date1.getTime();
    const difference = differenceMs / oneDay;
    const offset = difference - Math.floor(difference);
    return offset * (60 * 60 * 24);
  }

  /**
   * Muestra el estado de "no hay eventos"
   */
  showNoEventState() {
    const originalTitle = document.getElementById("originalTitle");
    const wrapper = document.getElementById("wrapper");
    const buttonsHead = document.getElementById("buttonsHead");
    const noEvent = document.getElementById("noEventTitle");

    if (originalTitle) originalTitle.style.display = "none";
    if (wrapper) wrapper.style.display = "none";
    if (buttonsHead) buttonsHead.style.display = "none";
    if (noEvent) noEvent.style.display = "inline-block";
  }

  /**
   * Inicia el contador regresivo
   */
  start() {
    const now = new Date();

    // Verificar si el evento ya pasó
    if (this.targetDate.getTime() < now.getTime()) {
      this.showNoEventState();
      return;
    }

    // Calcular tiempo restante
    this.days = this.daysBetween(now, this.targetDate);
    const secondsLeft = this.secondsDifference(now, this.targetDate);
    
    this.hours = Math.floor(secondsLeft / 60 / 60);
    const remainingAfterHours = secondsLeft - (this.hours * 60 * 60);
    
    this.minutes = Math.floor(remainingAfterHours / 60);
    this.seconds = Math.floor(remainingAfterHours - (this.minutes * 60));

    this.startCountdown();
  }

  /**
   * Inicia el loop del contador
   */
  startCountdown() {
    const countdownContainer = document.getElementById(this.containerId);
    if (countdownContainer) {
      countdownContainer.style.display = 'block';
    }

    // Mostrar valores iniciales
    this.displayValue('#js-days', this.days);
    this.displayValue('#js-hours', this.hours);
    this.displayValue('#js-minutes', this.minutes);
    this.displayValue('#js-seconds', this.seconds);

    // Iniciar intervalo
    this.interval = setInterval(() => {
      this.tick();
    }, 1000);
  }

  /**
   * Maneja cada tick del contador
   */
  tick() {
    if (this.seconds > 0) {
      this.seconds--;
      this.displayValue('#js-seconds', this.seconds);
    } else {
      if (this.minutes > 0) {
        this.minutes--;
        this.seconds = 59;
        this.updateValues('minutes');
      } else {
        if (this.hours > 0) {
          this.hours--;
          this.minutes = 59;
          this.seconds = 59;
          this.updateValues('hours');
        } else if (this.days > 0) {
          this.days--;
          this.hours = 23;
          this.minutes = 59;
          this.seconds = 59;
          this.updateValues('days');
        } else {
          // Contador llegó a cero
          this.stop();
          this.onCountdownEnd();
        }
      }
    }
  }

  /**
   * Actualiza múltiples valores según el contexto
   */
  updateValues(context) {
    switch (context) {
      case 'days':
        this.displayValue('#js-days', this.days);
        this.displayValue('#js-hours', this.hours);
        this.displayValue('#js-minutes', this.minutes);
        this.displayValue('#js-seconds', this.seconds);
        break;
      case 'hours':
        this.displayValue('#js-hours', this.hours);
        this.displayValue('#js-minutes', this.minutes);
        this.displayValue('#js-seconds', this.seconds);
        break;
      case 'minutes':
        this.displayValue('#js-minutes', this.minutes);
        this.displayValue('#js-seconds', this.seconds);
        break;
    }
  }

  /**
   * Muestra un valor con animación
   */
  displayValue(target, value) {
    const element = document.querySelector(target);
    if (!element) return;

    const newDigit = document.createElement('span');
    newDigit.textContent = this.pad(value);
    newDigit.classList.add('new');
    element.prepend(newDigit);

    const current = element.querySelector('.current');
    if (current) current.classList.add('old');

    setTimeout(() => {
      const oldElement = element.querySelector('.old');
      if (oldElement) oldElement.remove();
      
      const deletableElements = [...element.querySelectorAll('.current')];
      deletableElements.forEach(el => el.remove());
      
      newDigit.classList.add('current');
      newDigit.classList.remove('new');
    }, 900);
  }

  /**
   * Formatea números con cero a la izquierda
   */
  pad(number) {
    return ("0" + number).slice(-2);
  }

  /**
   * Detiene el contador
   */
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  /**
   * Callback cuando el contador llega a cero
   */
  onCountdownEnd() {
    console.log('¡El evento ha comenzado!');
    // Aquí se puede agregar lógica adicional cuando el evento comience
  }
}
