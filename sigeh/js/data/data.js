/**
 * data.js — Fuente única de verdad para todos los datos del sistema SIGEH.
 *
 * Centraliza pacientes, citas y facturas eliminando la triplicación
 * que existía entre el arreglo JS y los dos selectores HTML estáticos.
 */

/** @type {Patient[]} */
export const patients = [
  {
    id: 'P-001', name: 'Carlos Mendez', doc: '10.234.567',
    dob: '1985-03-12', gender: 'Masculino', blood: 'O+',
    phone: '312-555-0101', eps: 'Sura', allergies: 'Penicilina',
    status: 'Activo', initials: 'CM',
    consultas: [
      { date: '2024-11-20', doc: 'Dr. Reyes', motivo: 'Dolor torácico', diag: 'I10 – Hipertensión', tx: 'Losartán 50mg c/24h' },
      { date: '2024-09-05', doc: 'Dra. López', motivo: 'Control anual', diag: 'Z00 – Examen general', tx: 'Dieta y ejercicio' },
    ],
    medicamentos: [
      { med: 'Losartán', dosis: '50mg', freq: 'Cada 24h', estado: 'activo' },
      { med: 'Aspirina', dosis: '100mg', freq: 'Cada 24h', estado: 'activo' },
    ],
    antecedentes: '<strong>Patológicos:</strong> Hipertensión arterial (2019). <br><strong>Quirúrgicos:</strong> Apendicectomía (2010).<br><strong>Familiares:</strong> Padre con diabetes mellitus tipo 2. Madre con hipertensión.<br><strong>Hábitos:</strong> No fumador. Sedentario.',
  },
  {
    id: 'P-002', name: 'María García', doc: '52.001.234',
    dob: '1992-07-18', gender: 'Femenino', blood: 'A+',
    phone: '315-555-0202', eps: 'Compensar', allergies: 'Ninguna',
    status: 'Activo', initials: 'MG',
    consultas: [
      { date: '2024-12-01', doc: 'Dra. López', motivo: 'Cefalea recurrente', diag: 'G43 – Migraña', tx: 'Ibuprofeno 400mg + reposo' },
    ],
    medicamentos: [
      { med: 'Ibuprofeno', dosis: '400mg', freq: 'SOS', estado: 'proceso' },
    ],
    antecedentes: '<strong>Patológicos:</strong> Migraña desde los 18 años.<br><strong>Quirúrgicos:</strong> Ninguno.<br><strong>Familiares:</strong> Madre con migraña. Sin antecedentes cardiovasculares.<br><strong>Hábitos:</strong> No fuma. Consumo moderado de cafeína.',
  },
  {
    id: 'P-003', name: 'Juan Pérez', doc: '79.456.789',
    dob: '1978-01-30', gender: 'Masculino', blood: 'B+',
    phone: '320-555-0303', eps: 'Nueva EPS', allergies: 'Sulfas',
    status: 'Activo', initials: 'JP',
    consultas: [
      { date: '2024-10-15', doc: 'Dr. Silva', motivo: 'Diabetes control', diag: 'E11 – DM tipo 2', tx: 'Metformina 850mg c/12h + dieta' },
      { date: '2024-07-22', doc: 'Dr. Reyes', motivo: 'Glucemia elevada', diag: 'E11 – DM tipo 2', tx: 'Ajuste de dosis' },
    ],
    medicamentos: [
      { med: 'Metformina', dosis: '850mg', freq: 'Cada 12h', estado: 'activo' },
      { med: 'Atorvastatina', dosis: '20mg', freq: 'Cada noche', estado: 'activo' },
    ],
    antecedentes: '<strong>Patológicos:</strong> Diabetes mellitus tipo 2 (2015). Dislipidemia.<br><strong>Quirúrgicos:</strong> Colecistectomía (2018).<br><strong>Familiares:</strong> Padre y hermano con DM2.<br><strong>Hábitos:</strong> Ex-fumador. Actividad física 3x/semana.',
  },
  {
    id: 'P-004', name: 'Ana Torres', doc: '43.789.012',
    dob: '1995-11-05', gender: 'Femenino', blood: 'O-',
    phone: '318-555-0404', eps: 'Famisanar', allergies: 'Aspirina, latex',
    status: 'Activo', initials: 'AT',
    consultas: [], medicamentos: [],
    antecedentes: '<strong>Patológicos:</strong> Ninguno.<br><strong>Quirúrgicos:</strong> Ninguno.<br><strong>Familiares:</strong> Sin antecedentes relevantes.<br><strong>Hábitos:</strong> No fuma, no bebe. Ejercicio regular.',
  },
  {
    id: 'P-005', name: 'Luis Ríos', doc: '98.123.456',
    dob: '1968-04-22', gender: 'Masculino', blood: 'AB+',
    phone: '311-555-0505', eps: 'Sura', allergies: 'Ninguna',
    status: 'Activo', initials: 'LR',
    consultas: [
      { date: '2024-11-10', doc: 'Dr. Silva', motivo: 'Artralgia rodilla', diag: 'M17 – Gonartrosis', tx: 'Diclofenaco 75mg + fisioterapia' },
    ],
    medicamentos: [
      { med: 'Diclofenaco', dosis: '75mg', freq: 'Cada 12h', estado: 'activo' },
      { med: 'Omeprazol', dosis: '20mg', freq: 'Cada 24h', estado: 'activo' },
    ],
    antecedentes: '<strong>Patológicos:</strong> Gonartrosis bilateral. HTA leve.<br><strong>Quirúrgicos:</strong> Meniscectomía derecha (2012).<br><strong>Familiares:</strong> Madre con artritis reumatoide.<br><strong>Hábitos:</strong> Fumador leve. Sobrepeso.',
  },
];

/** @type {Appointment[]} */
export const appointments = [
  { id: 'C-001', pac: 'Carlos Mendez', doc: 'Dr. Reyes',   esp: 'Cardiología',    fecha: '2025-03-11', hora: '08:00', estado: 'activo' },
  { id: 'C-002', pac: 'María García',  doc: 'Dra. López',  esp: 'Neurología',     fecha: '2025-03-11', hora: '09:30', estado: 'pendiente' },
  { id: 'C-003', pac: 'Juan Pérez',    doc: 'Dr. Reyes',   esp: 'Med. General',   fecha: '2025-03-11', hora: '10:00', estado: 'activo' },
  { id: 'C-004', pac: 'Ana Torres',    doc: 'Dr. Silva',   esp: 'Ginecología',    fecha: '2025-03-12', hora: '11:30', estado: 'cancelado' },
  { id: 'C-005', pac: 'Luis Ríos',     doc: 'Dra. López',  esp: 'Ortopedia',      fecha: '2025-03-13', hora: '14:00', estado: 'pendiente' },
  { id: 'C-006', pac: 'Carlos Mendez', doc: 'Dr. Silva',   esp: 'Med. General',   fecha: '2025-03-15', hora: '16:00', estado: 'activo' },
];

/** @type {Invoice[]} */
export const invoices = [
  { id: 'F-2891', pac: 'Carlos Mendez', concepto: 'Consulta cardiología + eco',    fecha: '2025-03-11', valor: '$280.000', estado: 'pendiente' },
  { id: 'F-2890', pac: 'María García',  concepto: 'Consulta neurología',           fecha: '2025-03-10', valor: '$150.000', estado: 'pagado' },
  { id: 'F-2889', pac: 'Juan Pérez',    concepto: 'Control DM + paraclínicos',     fecha: '2025-03-08', valor: '$320.000', estado: 'pagado' },
  { id: 'F-2888', pac: 'Ana Torres',    concepto: 'Ginecología + ecografía',       fecha: '2025-03-07', valor: '$380.000', estado: 'pagado' },
  { id: 'F-2887', pac: 'Luis Ríos',     concepto: 'Fisioterapia x5 sesiones',      fecha: '2025-03-05', valor: '$450.000', estado: 'proceso' },
  { id: 'F-2886', pac: 'Carlos Mendez', concepto: 'Urgencias + observación',       fecha: '2025-02-28', valor: '$620.000', estado: 'pendiente' },
];
