/**
 * reportes.js — Módulo de Reportes Administrativos.
 *
 * Responsabilidades:
 * - Renderizar el gráfico de barras de consultas por mes
 * - Renderizar el gráfico de distribución por especialidad
 *
 * REFACTORIZACIÓN APLICADA:
 * - Uso de CONFIG.BAR_CHART_MAX_HEIGHT_PX en lugar del valor mágico 160
 * - Nombres de variables corregidos (d→dataPoint, m→monthLabel)
 */

import { CONFIG } from '../data/config.js';

/** @type {MonthlyConsultas[]} Datos de consultas por mes para el gráfico de barras */
const MONTHLY_CONSULTAS_DATA = [
  { monthLabel: 'Ago', value: 82  },
  { monthLabel: 'Sep', value: 95  },
  { monthLabel: 'Oct', value: 110 },
  { monthLabel: 'Nov', value: 98  },
  { monthLabel: 'Dic', value: 87  },
  { monthLabel: 'Ene', value: 105 },
  { monthLabel: 'Feb', value: 118 },
  { monthLabel: 'Mar', value: 143 },
];

/** @type {SpecialtyDistribution[]} Datos de distribución por especialidad */
const SPECIALTY_DISTRIBUTION_DATA = [
  { label: 'Medicina General', pct: 38, color: 'var(--teal)'   },
  { label: 'Cardiología',       pct: 22, color: 'var(--navy)'  },
  { label: 'Ortopedia',         pct: 15, color: '#0ea5e9'      },
  { label: 'Ginecología',       pct: 14, color: '#8b5cf6'      },
  { label: 'Neurología',        pct: 11, color: '#f59e0b'      },
];

/**
 * Renderiza el gráfico de barras de consultas por mes.
 * Usa CONFIG.BAR_CHART_MAX_HEIGHT_PX para eliminar el valor mágico 160.
 */
export function renderBarChart() {
  const maxValue = Math.max(...MONTHLY_CONSULTAS_DATA.map(dataPoint => dataPoint.value));

  document.getElementById('barChart').innerHTML = MONTHLY_CONSULTAS_DATA.map(dataPoint => {
    const barHeightPx = (dataPoint.value / maxValue) * CONFIG.BAR_CHART_MAX_HEIGHT_PX;
    return `
      <div class="bar-wrap">
        <div title="${dataPoint.value} consultas" style="font-size:10px;color:var(--slate);margin-bottom:4px;">${dataPoint.value}</div>
        <div class="bar" style="height:${barHeightPx}px;"></div>
        <div class="bar-label">${dataPoint.monthLabel}</div>
      </div>`;
  }).join('');
}

/**
 * Renderiza el gráfico horizontal de distribución por especialidad.
 */
export function renderEspChart() {
  document.getElementById('espChart').innerHTML = SPECIALTY_DISTRIBUTION_DATA.map(specialty => `
    <div>
      <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:5px;">
        <span>${specialty.label}</span>
        <strong>${specialty.pct}%</strong>
      </div>
      <div style="background:#f1f5f9;border-radius:6px;height:8px;">
        <div style="background:${specialty.color};width:${specialty.pct}%;height:100%;border-radius:6px;transition:width .5s;"></div>
      </div>
    </div>`).join('');
}
