/**
 * Navigation Script - Archivo de compatibilidad para nav.html
 * Este archivo mantiene la funcionalidad existente mientras usamos el nuevo sistema modular
 */
import { NavigationController } from './modules/navigation.js';
import { ParticleSystem } from './modules/particles.js';

// Mantener compatibilidad con el código existente
window.createParticle = ParticleSystem.createParticle;

// El NavigationController ya se inicializa en main.js
// Este archivo existe solo para mantener compatibilidad con nav.html