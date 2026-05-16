/**
 * navigation.js — Módulo de navegación entre paneles del app shell.
 *
 * Responsabilidades:
 * - Activar/desactivar ítems del sidebar
 * - Mostrar el panel correspondiente
 * - Actualizar el título del topbar
 */

import { CONFIG } from '../data/config.js';

/**
 * Navega a un panel dado, actualizando sidebar y topbar.
 * @param {string} panelName - Clave del panel (ej: 'dashboard', 'historias')
 * @param {HTMLElement|null} clickedNavItem - Elemento .nav-item clickeado (puede ser null)
 */
export function navigate(panelName, clickedNavItem) {
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  if (clickedNavItem) clickedNavItem.classList.add('active');

  document.querySelectorAll('.panel').forEach(panel => panel.classList.remove('active'));
  document.getElementById(`panel-${panelName}`).classList.add('active');

  const title = CONFIG.PANEL_TITLES[panelName] || panelName;
  document.getElementById('topbarTitle').textContent = title;
}
