/**
 * app.js — Punto de entrada y orquestador de inicialización de SIGEH.
 *
 * Responsabilidades:
 * - Inicializar todos los módulos al cargar el app shell
 * - Registrar event listeners globales (Enter en login, close modales)
 * - Exponer en window.sigeh las funciones necesarias para los handlers
 *   inline del HTML (limitación del modelo de archivo único sin bundler)
 *
 * LIMITACIÓN DOCUMENTADA:
 * Al no usar un bundler (webpack/vite), los módulos ES no pueden llamarse
 * directamente desde atributos onclick="" del HTML. La solución adoptada
 * es exponer un objeto window.sigeh con las funciones públicas.
 * En una arquitectura con bundler esto desaparecería completamente.
 */

import { onRoleButtonClick, doLogin, doLogout } from './modules/login.js';
import { navigate } from './modules/navigation.js';
import { renderPatientList, filterPatients, selectPatient, switchTab, saveHC, saveConsulta, populatePatientSelectors } from './modules/historia-clinica.js';
import { renderCalendar, changeMonth, renderCitasTable, saveCita } from './modules/citas.js';
import { renderInvoices, filterInvoices, saveFactura, allInvoices } from './modules/facturacion.js';
import { renderBarChart, renderEspChart } from './modules/reportes.js';
import { openModal, closeModal, showToast, initModalDismiss } from './modules/ui.js';
import { patients } from './data/data.js';
import { appointments } from './data/data.js';

/**
 * Inicializa el app shell: renderiza todos los módulos y rellena
 * los valores por defecto de los campos de fecha en los modales.
 */
function initApp() {
  renderPatientList(patients);
  renderCitasTable(appointments);
  renderCalendar();
  renderInvoices(allInvoices);
  renderBarChart();
  renderEspChart();
  populatePatientSelectors();

  const todayIso = new Date().toISOString().split('T')[0];
  document.getElementById('consDate').value = todayIso;
  document.getElementById('citaFecha').value = todayIso;
  document.getElementById('factFecha').value = todayIso;
}

// ── Exposición de API pública para handlers inline ───────

/**
 * Objeto global window.sigeh que expone las funciones necesarias
 * para los atributos onclick del HTML.
 *
 * NOTA: Este patrón es la única concesión al modelo legacy HTML-file.
 * En una refactorización con bundler todos los event listeners se
 * registrarían en JS puro (addEventListener).
 */
window.sigeh = {
  // Login
  onRoleButtonClick,
  doLogin: () => doLogin(initApp),
  doLogout,

  // Navegación
  navigate,

  // Historia Clínica
  renderPatientList,
  filterPatients,
  selectPatient,
  switchTab,
  saveHC,
  saveConsulta,

  // Citas
  renderCalendar,
  changeMonth,
  saveCita,

  // Facturación
  filterInvoices,
  saveFactura,

  // Modales
  openModal,
  closeModal,

  // Toast
  showToast,
};

// ── Event listeners globales ─────────────────────────────

// Enter en el campo de contraseña dispara el login
document.getElementById('loginPass').addEventListener('keydown', event => {
  if (event.key === 'Enter') window.sigeh.doLogin();
});

// Cierre de modales al click en overlay
initModalDismiss();
