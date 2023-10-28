'use strict'

// -----------------------------------------
// 1. Selecciono el botón
// -----------------------------------------

const logoutButton = document.getElementById('logout-button');

// -----------------------------------------
// 2. Agregarle acción al botón
// -----------------------------------------

logoutButton.addEventListener('click', (e) => {
  swal.fire({
      title: '¿Estás seguro?',
      text: 'Cerrarás tu sesión',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
    })
    .then((result) => {
      if (result.isConfirmed) {
        // 1. Limpiar sessionStorage
        sessionStorage.removeItem('isLogged');
        sessionStorage.removeItem('user');

        // 2. Redireccionar
      }
    });
});
