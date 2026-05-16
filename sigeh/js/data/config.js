/**
 * config.js — Constantes de configuración global del sistema SIGEH.
 *
 * Elimina todos los "valores mágicos" identificados en el análisis:
 * - 2800ms del timeout del toast (línea 1311 original)
 * - 160px de altura máxima del gráfico de barras (línea 1283 original)
 * - Prefijo de ID de citas 'C-' (línea 1244 original)
 */

export const CONFIG = {
  /** Duración visible del toast antes de desvanecerse (ms) */
  TOAST_DURATION_MS: 2800,

  /** Altura máxima en píxeles de las barras del gráfico de consultas */
  BAR_CHART_MAX_HEIGHT_PX: 160,

  /** Prefijo para IDs generados de nuevas citas */
  APPOINTMENT_ID_PREFIX: 'C-',

  /** Prefijo para IDs generados de nuevas facturas */
  INVOICE_ID_PREFIX: 'F-',

  /** Nombre de los meses en español para el calendario */
  MONTH_NAMES: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ],

  /** Etiquetas cortas de días de la semana para el calendario */
  WEEK_DAY_LABELS: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],

  /** Títulos de cada panel para el topbar */
  PANEL_TITLES: {
    dashboard:   'Dashboard',
    historias:   'Historia Clínica Digital',
    citas:       'Gestión de Citas',
    facturacion: 'Facturación',
    reportes:    'Reportes Administrativos',
  },

  /** Etiquetas legibles para los estados de cita */
  APPOINTMENT_STATUS_LABELS: {
    activo:    'Confirmada',
    pendiente: 'Pendiente',
    cancelado: 'Cancelada',
  },
};
