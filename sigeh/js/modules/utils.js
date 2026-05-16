/**
 * utils.js — Funciones utilitarias puras (sin efectos secundarios DOM).
 *
 * Incluye:
 * - filterAndRender: elimina la duplicación de filterPatients / filterInvoices
 * - calculateAge: extraído de selectPatient para hacerlo testeable
 * - generateId: reemplaza el patrón 'C-00'+(n+1) con padding consistente
 */

/**
 * Filtra un arreglo de datos por múltiples campos de texto y
 * llama a la función de renderizado correspondiente.
 *
 * Elimina la duplicación entre filterPatients y filterInvoices
 * (ambas tenían exactamente la misma estructura: filter + render).
 *
 * @param {string} query - Texto de búsqueda ingresado por el usuario
 * @param {Array} dataSource - Arreglo de datos a filtrar
 * @param {string[]} fields - Campos del objeto a buscar
 * @param {Function} renderFn - Función de renderizado a invocar con los resultados
 */
export function filterAndRender(query, dataSource, fields, renderFn) {
  const normalizedQuery = query.toLowerCase();
  const filteredItems = dataSource.filter(item =>
    fields.some(field => String(item[field]).toLowerCase().includes(normalizedQuery))
  );
  renderFn(filteredItems);
}

/**
 * Calcula la edad en años a partir de una fecha de nacimiento en formato ISO (YYYY-MM-DD).
 *
 * @param {string} dateOfBirth - Fecha de nacimiento (ej: '1985-03-12')
 * @returns {number} Edad en años (aproximación por año)
 */
export function calculateAge(dateOfBirth) {
  return new Date().getFullYear() - parseInt(dateOfBirth.split('-')[0], 10);
}

/**
 * Genera un ID con prefijo y número con cero padding.
 *
 * Reemplaza el patrón frágil 'C-00'+(citas.length+1) por uno consistente.
 *
 * @param {string} prefix - Prefijo del ID (ej: 'C-', 'F-')
 * @param {number} sequence - Número de secuencia
 * @param {number} [padLength=3] - Longitud mínima del número con padding
 * @returns {string} ID generado (ej: 'C-007')
 */
export function generateId(prefix, sequence, padLength = 3) {
  return `${prefix}${String(sequence).padStart(padLength, '0')}`;
}

/**
 * Capitaliza la primera letra de un string.
 * @param {string} text
 * @returns {string}
 */
export function capitalize(text) {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}
