/**
 * facturacion.js — Módulo de Facturación.
 *
 * Responsabilidades:
 * - Renderizar tabla de facturas
 * - Filtrar facturas por texto
 * - Guardar nueva factura
 *
 * REFACTORIZACIÓN APLICADA:
 * - filterInvoices ahora delega en filterAndRender (DRY, sección 3.1)
 * - Nombre de variable 'f' → 'invoice' en renderInvoices
 * - Uso de capitalize() en lugar de charAt(0).toUpperCase()+slice(1)
 */

import { filterAndRender, capitalize, generateId } from './utils.js';
import { closeModal, showToast } from './ui.js';
import { CONFIG } from '../data/config.js';
import { invoices } from '../data/data.js';

/** Estado mutable de facturas (copia mutable para demo) */
export let allInvoices = [...invoices];

// ── Renderizado ──────────────────────────────────────────

/**
 * Renderiza la tabla de facturas en el panel de facturación.
 * @param {Invoice[]} invoiceList
 */
export function renderInvoices(invoiceList) {
  document.getElementById('invoiceTable').innerHTML = invoiceList.map(invoice => `
    <tr>
      <td><strong>${invoice.id}</strong></td>
      <td>${invoice.pac}</td>
      <td>${invoice.concepto}</td>
      <td>${invoice.fecha}</td>
      <td style="font-weight:600;">${invoice.valor}</td>
      <td><span class="pill ${invoice.estado}">${capitalize(invoice.estado)}</span></td>
      <td><span style="color:var(--teal);cursor:pointer;font-size:13px;" onclick="window.sigeh.showToast('Factura procesada')">Ver</span></td>
    </tr>`).join('');
}

// ── Filtrado ─────────────────────────────────────────────

/**
 * Filtra facturas por paciente o ID de factura.
 * Delega en filterAndRender (elimina duplicación con filterPatients).
 * @param {string} query
 */
export function filterInvoices(query) {
  filterAndRender(query, allInvoices, ['pac', 'id'], renderInvoices);
}

// ── Guardado ──────────────────────────────────────────────

/**
 * Emite una nueva factura (demo) y la agrega al inicio de la lista.
 */
export function saveFactura() {
  const nextId = generateId(CONFIG.INVOICE_ID_PREFIX, allInvoices.length + 2887);

  allInvoices.unshift({
    id:       nextId,
    pac:      'Nuevo Paciente',
    concepto: 'Consulta',
    fecha:    document.getElementById('factFecha').value,
    valor:    '$0',
    estado:   'pendiente',
  });

  renderInvoices(allInvoices);
  closeModal('modalFactura');
  showToast('Factura emitida exitosamente');
}
