/**
 * ui.js — Utilidades genéricas de interfaz de usuario.
 *
 * Responsabilidades:
 * - Gestión de modales (openModal / closeModal)
 * - Notificaciones toast
 * - Inicializar cierre por click fuera del modal
 */

import { CONFIG } from '../data/config.js';

/**
 * Abre un modal por su ID de overlay.
 * @param {string} modalId
 */
export function openModal(modalId) {
  document.getElementById(modalId).classList.add('open');
}

/**
 * Cierra un modal por su ID de overlay.
 * @param {string} modalId
 */
export function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('open');
}

/**
 * Muestra una notificación toast con el mensaje dado.
 * @param {string} message
 */
export function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = `✓ ${message}`;
  toast.style.opacity = '1';
  setTimeout(() => { toast.style.opacity = '0'; }, CONFIG.TOAST_DURATION_MS);
}

/**
 * Registra el cierre de modales al hacer click en el overlay (fuera del modal).
 * Debe llamarse una sola vez durante la inicialización.
 */
export function initModalDismiss() {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', event => {
      if (event.target === overlay) overlay.classList.remove('open');
    });
  });
}
