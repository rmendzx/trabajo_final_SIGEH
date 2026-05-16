/**
 * citas.js — Módulo de Gestión de Citas.
 *
 * Responsabilidades:
 * - Renderizar el calendario mensual
 * - Navegar entre meses
 * - Renderizar tabla de citas
 * - Guardar nueva cita
 *
 * REFACTORIZACIÓN APLICADA:
 * - renderCalendar dividida en responsabilidades más claras
 * - Nombres de variables corregidos (y→year, m→month, d→dayNumber, c→appointment)
 * - Uso de CONFIG para MONTH_NAMES, WEEK_DAY_LABELS, APPOINTMENT_ID_PREFIX
 * - saveCita usa nombres descriptivos (p→patientName, f→appointmentDate, h→appointmentTime)
 */

import { CONFIG } from '../data/config.js';
import { closeModal, showToast } from './ui.js';
import { generateId } from './utils.js';
import { appointments } from '../data/data.js';

/** @type {Date} Mes actualmente visualizado en el calendario */
let calendarMonth = new Date(2025, 2, 1); // Marzo 2025

// ── Calendario ───────────────────────────────────────────

/**
 * Renderiza los encabezados de días de la semana en el grid del calendario.
 * @param {HTMLElement} grid
 */
function renderCalendarHeaders(grid) {
  CONFIG.WEEK_DAY_LABELS.forEach(dayLabel => {
    grid.innerHTML += `<div class="cal-day-label">${dayLabel}</div>`;
  });
}

/**
 * Renderiza los días del mes anterior para rellenar la primera semana.
 * @param {HTMLElement} grid
 * @param {number} firstWeekdayOfMonth - Día de la semana del 1° del mes (0=Dom)
 * @param {number} lastDayOfPrevMonth - Último día del mes anterior
 */
function renderPaddingDays(grid, firstWeekdayOfMonth, lastDayOfPrevMonth) {
  for (let paddingIndex = 0; paddingIndex < firstWeekdayOfMonth; paddingIndex++) {
    const dayNumber = lastDayOfPrevMonth - firstWeekdayOfMonth + 1 + paddingIndex;
    grid.innerHTML += `<div class="cal-day other-month"><div class="cal-day-num">${dayNumber}</div></div>`;
  }
}

/**
 * Renderiza los días del mes actual con sus eventos de citas.
 * @param {HTMLElement} grid
 * @param {number} year
 * @param {number} month
 * @param {number} totalDaysInMonth
 * @param {Appointment[]} appointmentList
 */
function renderMonthDays(grid, year, month, totalDaysInMonth, appointmentList) {
  const today = new Date();

  for (let dayNumber = 1; dayNumber <= totalDaysInMonth; dayNumber++) {
    const isToday = today.getFullYear() === year
      && today.getMonth() === month
      && today.getDate() === dayNumber;

    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
    const dayAppointments = appointmentList.filter(appointment => appointment.fecha === dateString);

    const eventsHtml = dayAppointments
      .map(appointment => `<div class="cal-event ${appointment.estado}">${appointment.hora} ${appointment.pac.split(' ')[0]}</div>`)
      .join('');

    grid.innerHTML += `
      <div class="cal-day${isToday ? ' today' : ''}">
        <div class="cal-day-num">${dayNumber}</div>
        ${eventsHtml}
      </div>`;
  }
}

/**
 * Renderiza el calendario completo del mes actual.
 * Orquesta: encabezado de título, cabeceras de días, días de relleno y días del mes.
 */
export function renderCalendar() {
  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();

  document.getElementById('calTitle').textContent = `${CONFIG.MONTH_NAMES[month]} ${year}`;

  const grid = document.getElementById('calGrid');
  grid.innerHTML = '';

  renderCalendarHeaders(grid);

  const firstWeekday = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const lastDayPrevMonth = new Date(year, month, 0).getDate();

  renderPaddingDays(grid, firstWeekday, lastDayPrevMonth);
  renderMonthDays(grid, year, month, totalDays, appointments);
}

/**
 * Avanza o retrocede el mes del calendario.
 * @param {number} direction - +1 para siguiente mes, -1 para anterior
 */
export function changeMonth(direction) {
  calendarMonth.setMonth(calendarMonth.getMonth() + direction);
  renderCalendar();
}

// ── Tabla de citas ────────────────────────────────────────

/**
 * Renderiza la tabla de todas las citas.
 * @param {Appointment[]} appointmentList
 */
export function renderCitasTable(appointmentList) {
  const tableBody = document.getElementById('citasTable');
  tableBody.innerHTML = appointmentList.map(appointment => `
    <tr>
      <td><strong>${appointment.id}</strong></td>
      <td>${appointment.pac}</td>
      <td>${appointment.doc}</td>
      <td>${appointment.esp}</td>
      <td>${appointment.fecha} ${appointment.hora}</td>
      <td><span class="pill ${appointment.estado}">${CONFIG.APPOINTMENT_STATUS_LABELS[appointment.estado]}</span></td>
      <td><span style="color:var(--teal);cursor:pointer;font-size:13px;" onclick="window.sigeh.showToast('Cita actualizada')">Editar</span></td>
    </tr>`).join('');
}

// ── Guardado ──────────────────────────────────────────────

/**
 * Guarda una nueva cita tomando los valores del modal.
 * Usa nombres descriptivos para las variables del formulario.
 */
export function saveCita() {
  const patientName     = document.getElementById('citaPaciente').value;
  const appointmentDate = document.getElementById('citaFecha').value;
  const appointmentTime = document.getElementById('citaHora').value;

  const newAppointment = {
    id:     generateId(CONFIG.APPOINTMENT_ID_PREFIX, appointments.length + 1),
    pac:    patientName,
    doc:    'Dr. Nuevo',
    esp:    'Med. General',
    fecha:  appointmentDate,
    hora:   appointmentTime,
    estado: 'pendiente',
  };

  appointments.push(newAppointment);
  renderCitasTable(appointments);
  renderCalendar();
  closeModal('modalCita');
  showToast('Cita agendada exitosamente');
}
