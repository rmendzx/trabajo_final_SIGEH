/**
 * login.js — Módulo de autenticación y selección de rol.
 *
 * Responsabilidades:
 * - Selección de perfil de acceso (rol)
 * - Proceso de login (validación + transición al app shell)
 * - Proceso de logout
 *
 * NOTA: Las credenciales son de demo. El campo value="1234" fue
 * mantenido por compatibilidad con el prototipo pero documentado
 * como riesgo de seguridad en el reporte (sección 1.5).
 */

/** @type {string} Rol actualmente seleccionado en el formulario */
let currentRole = 'Médico';

/**
 * Actualiza el rol seleccionado al hacer clic en un botón de rol.
 * @param {HTMLElement} clickedButton - Botón que recibió el click
 * @param {string} role - Nombre del rol seleccionado
 */
export function onRoleButtonClick(clickedButton, role) {
  document.querySelectorAll('.role-btn').forEach(button => button.classList.remove('active'));
  clickedButton.classList.add('active');
  currentRole = role;
}

/**
 * Ejecuta el login: valida campos, actualiza el sidebar y
 * transiciona de loginScreen a appShell.
 *
 * @param {Function} onLoginSuccess - Callback a ejecutar tras login exitoso
 */
export function doLogin(onLoginSuccess) {
  const username = document.getElementById('loginUser').value;
  const password = document.getElementById('loginPass').value;

  if (!username || !password) {
    document.getElementById('loginError').style.display = 'block';
    return;
  }

  document.getElementById('loginError').style.display = 'none';

  const userInitials = username.substring(0, 2).toUpperCase();
  document.getElementById('sidebarAvatar').textContent = userInitials;
  document.getElementById('sidebarName').textContent = username.split('@')[0];
  document.getElementById('sidebarRole').textContent = currentRole;
  document.getElementById('topbarDate').textContent = new Date().toLocaleDateString('es-CO', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('appShell').style.display = 'flex';

  onLoginSuccess();
}

/**
 * Cierra la sesión y regresa a la pantalla de login.
 */
export function doLogout() {
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('appShell').style.display = 'none';
}
