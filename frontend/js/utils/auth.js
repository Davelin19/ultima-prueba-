// Utilidades de autenticación y sesión
// Provee initLogoutButton() y verificación simple de sesión

(function(){
  // Inicializa el botón de logout si existe en el DOM
  function initLogoutButton() {
    try {
      const btn = document.getElementById('logoutBtn');
      if (!btn) return;
      btn.addEventListener('click', function(e){
        e.preventDefault();

        const doLogout = () => {
          try {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('adminData');
            sessionStorage.removeItem('clienteData');
            sessionStorage.removeItem('empleadaData');
            localStorage.removeItem('clienteId');
            localStorage.removeItem('clienteNombre');
            localStorage.removeItem('empleadaId');
            localStorage.removeItem('empleadaNombre');
          } catch (err) {
            console.warn('Error limpiando almacenamiento:', err);
          }
          window.location.href = 'index.html';
        };

        // Usa el sistema de confirmación con el mismo diseño de usuario o fallbacks
        if (typeof window.showConfirmation === 'function') {
          // showConfirmation(mensaje, titulo, onConfirm, onCancel)
          window.showConfirmation('Se cerrará tu sesión actual', '¿Cerrar sesión?', doLogout);
        } else if (typeof window.showConfirm === 'function') {
          window.showConfirm('¿Cerrar sesión?', 'Se cerrará tu sesión actual', 'Sí, salir', 'Cancelar')
            .then(res => { if (res.isConfirmed) doLogout(); });
        } else if (typeof Swal !== 'undefined') {
          Swal.fire({
            title: '¿Cerrar sesión?',
            text: 'Se cerrará tu sesión actual',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
          }).then(r => { if (r.isConfirmed) doLogout(); });
        } else {
          if (confirm('¿Seguro que deseas cerrar sesión?')) doLogout();
        }
      });
    } catch (err) {
      console.error('Error inicializando logout:', err);
    }
  }

  // Exponer en window
  window.initLogoutButton = window.initLogoutButton || initLogoutButton;

  // Auto-init cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLogoutButton);
  } else {
    initLogoutButton();
  }
})();
