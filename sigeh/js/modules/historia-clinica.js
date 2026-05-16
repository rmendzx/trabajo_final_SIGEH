/**
 * historia-clinica.js — Módulo de Historia Clínica Digital.
 *
 * Responsabilidades:
 * - Renderizar lista de pacientes
 * - Filtrar pacientes por búsqueda de texto
 * - Seleccionar un paciente (separado en subfunciones con SRP)
 * - Cambiar entre pestañas de la ficha del paciente
 * - Guardar nueva HC y nueva consulta
 *
 * REFACTORIZACIÓN APLICADA:
 * - selectPatient fue dividida en 4 funciones de responsabilidad única
 *   (updatePatientHeader, updatePatientPersonalInfo, renderPatientConsultas,
 *   renderPatientMedications) como propone el reporte sección 3.2
 * - filterPatients ahora delega en filterAndRender (DRY, sección 3.1)
 * - Nombres de variables ambiguos corregidos (sección 3.3)
 */

import { filterAndRender, calculateAge } from './utils.js';
import { openModal, closeModal, showToast } from './ui.js';
import { patients } from '../data/data.js';

/** @type {Object|null} Paciente actualmente seleccionado */
let selectedPatient = null;

// ── Renderizado ──────────────────────────────────────────

/**
 * Renderiza la lista de pacientes en el panel lateral.
 * @param {Patient[]} patientList - Lista a renderizar (puede ser un subconjunto filtrado)
 */
export function renderPatientList(patientList) {
  const container = document.getElementById('patientList');
  container.innerHTML = `
    <div style="padding:14px 18px;border-bottom:1px solid var(--border);">
      <strong style="font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--slate);">
        ${patientList.length} Pacientes
      </strong>
    </div>`;

  patientList.forEach(patient => {
    const isSelected = selectedPatient && selectedPatient.id === patient.id;
    const item = document.createElement('div');
    item.className = `patient-item${isSelected ? ' selected' : ''}`;
    item.innerHTML = `
      <div class="patient-avatar">${patient.initials}</div>
      <div class="patient-info">
        <span>${patient.name}</span>
        <small>${patient.doc} · ${patient.eps}</small>
      </div>`;
    item.onclick = () => selectPatient(patient);
    container.appendChild(item);
  });
}

/**
 * Filtra la lista de pacientes por nombre o documento.
 * Delega en filterAndRender (elimina duplicación con filterInvoices).
 * @param {string} query - Texto de búsqueda
 */
export function filterPatients(query) {
  filterAndRender(query, patients, ['name', 'doc'], renderPatientList);
}

// ── Subfunciones de selectPatient (SRP) ─────────────────

/**
 * Actualiza el encabezado visual del paciente seleccionado.
 * @param {Patient} patient
 */
function updatePatientHeader(patient) {
  document.getElementById('detailAvatar').textContent = patient.initials;
  document.getElementById('detailName').textContent = patient.name;
  document.getElementById('detailMeta').textContent = `${patient.id} · ${patient.eps} · ${patient.blood}`;
}

/**
 * Rellena el grid de datos personales del paciente.
 * @param {Patient} patient
 */
function updatePatientPersonalInfo(patient) {
  const age = calculateAge(patient.dob);
  const fieldMap = {
    iDoc:      patient.doc,
    iFecha:    patient.dob,
    iEdad:     `${age} años`,
    iGenero:   patient.gender,
    iTel:      patient.phone,
    iEps:      patient.eps,
    iSangre:   patient.blood,
    iAlergias: patient.allergies,
    iEstado:   patient.status,
  };
  Object.entries(fieldMap).forEach(([elementId, value]) => {
    document.getElementById(elementId).textContent = value;
  });
}

/**
 * Renderiza la lista de consultas del paciente en la pestaña correspondiente.
 * @param {Consulta[]} consultas
 */
function renderPatientConsultas(consultas) {
  const container = document.getElementById('consultasList');
  if (consultas.length === 0) {
    container.innerHTML = '<p style="color:var(--slate);font-size:14px;">Sin consultas registradas.</p>';
    return;
  }
  container.innerHTML = consultas.map(consulta => `
    <div class="consulta-card">
      <div class="meta">
        <strong>${consulta.diag}</strong>
        <span>${consulta.date} · ${consulta.doc}</span>
      </div>
      <p><strong>Motivo:</strong> ${consulta.motivo}<br>
         <strong>Tratamiento:</strong> ${consulta.tx}</p>
    </div>`).join('');
}

/**
 * Renderiza la tabla de medicamentos activos del paciente.
 * @param {Medicamento[]} medicamentos
 */
function renderPatientMedications(medicamentos) {
  const tableBody = document.getElementById('medTable');
  if (medicamentos.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="4" style="color:var(--slate);">Sin medicamentos activos.</td></tr>';
    return;
  }
  tableBody.innerHTML = medicamentos.map(medication => `
    <tr>
      <td>${medication.med}</td>
      <td>${medication.dosis}</td>
      <td>${medication.freq}</td>
      <td><span class="pill ${medication.estado}">${medication.estado}</span></td>
    </tr>`).join('');
}

// ── Orquestador ─────────────────────────────────────────

/**
 * Orquesta la selección de un paciente actualizando todas las secciones
 * de la ficha clínica. Función de baja CC (1) que delega en subfunciones.
 *
 * @param {Patient} patient - Paciente seleccionado
 */
export function selectPatient(patient) {
  selectedPatient = patient;
  renderPatientList(patients);
  updatePatientHeader(patient);
  updatePatientPersonalInfo(patient);
  renderPatientConsultas(patient.consultas);
  renderPatientMedications(patient.medicamentos);
  document.getElementById('antecedentesContent').innerHTML =
    patient.antecedentes || 'Sin antecedentes registrados.';
}

// ── Pestañas ─────────────────────────────────────────────

/**
 * Cambia la pestaña activa en la ficha del paciente.
 * @param {HTMLElement} clickedTab
 * @param {string} tabId - ID del contenido de pestaña a mostrar
 */
export function switchTab(clickedTab, tabId) {
  document.querySelectorAll('.hc-tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.hc-tab-content').forEach(content => content.classList.remove('active'));
  clickedTab.classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

// ── Guardado (operaciones de demo) ───────────────────────

/**
 * Guarda una nueva historia clínica (demo: cierra modal y notifica).
 */
export function saveHC() {
  closeModal('modalHC');
  showToast('Historia clínica creada');
}

/**
 * Guarda una nueva consulta (demo: cierra modal y notifica).
 */
export function saveConsulta() {
  closeModal('modalConsulta');
  showToast('Consulta registrada exitosamente');
}

// ── Población dinámica de selectores ────────────────────

/**
 * Puebla todos los selectores con clase .patient-select a partir del
 * arreglo patients. Elimina la triplicación de listas estáticas en HTML.
 */
export function populatePatientSelectors() {
  const optionsHtml = patients
    .map(patient => `<option value="${patient.id}">${patient.name}</option>`)
    .join('');
  document.querySelectorAll('.patient-select').forEach(selector => {
    selector.innerHTML = optionsHtml;
  });
}
