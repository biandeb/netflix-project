'use strict'

// -----------------------------------------
// 1. Selecciono el botón
// -----------------------------------------

const logoutButton = document.getElementById('logout-button');

// -----------------------------------------
// 2. Agregarle acción al botón
// -----------------------------------------

logoutButton.addEventListener('click', (e) => {
  swal
    .fire({
      title: '¿Estás seguro?',
      text: 'Cerrarás tu sesión',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        // 1. Limpiar sessionStorage
        sessionStorage.removeItem('isLogged');
        sessionStorage.removeItem('user');

        // 2. Redireccionar
        window.location.href = '/';
      }
    });
});
