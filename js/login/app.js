'use strict'

import { User, UserWithoutPassword } from './User.js';
import { validatePassword, validateEmail } from '../validators.js';

// -----------------------------------------
// 1. Proteger ruta
// -----------------------------------------

const isLogged = JSON.parse(sessionStorage.getItem('isLogged'));
if (isLogged) {

window.location.href = './admin/admin.html';
}

// -----------------------------------------
// 2. Crear usuario por defecto
// -----------------------------------------

const adminUser = new User('admin@gmail.com', 'admin');

// -----------------------------------------
// 3. Seleccionar elementos del DOM
// -----------------------------------------

const formLogin = document.getElementById('form-login');
const emailInput = document.getElementById('email-login');
const passwordInput = document.getElementById('password-login');
const credentialsAlert = document.getElementById('credentials-alert');

// -----------------------------------------
// 4. Manejar el submit
// -----------------------------------------

formLogin.addEventListener('submit', (e) => {
  // A. Prevenimos comportamiento por defecto
  e.preventDefault();

  // B. Leer valores de los campos
  const email = emailInput.value;
  const password = passwordInput.value;

  // C. Validar los campos (solo el contenido)
  if (
    validateEmail(email, emailInput) &&
    validatePassword(password, passwordInput)
  ) {
    // los campos estan OK pero no sabemos aun si son las credenciales

    // i. Resetear las clases
    emailInput.classList.remove('is-invalid');
    passwordInput.classList.remove('is-invalid');

    // ii. Validamos credenciales
    if (email === adminUser.email && password === adminUser.password) {

      // 1. Ocultar alert
      credentialsAlert.classList.add('d-none');

      // 2. Crear usuario sin contraseña p/ guardarlo
      const loggedUser = new UserWithoutPassword('admin@gmail.com');

      // 3. Guardar estado
      sessionStorage.setItem('isLogged', true);
      sessionStorage.setItem('user', JSON.stringify(loggedUser));

      // 4. Mensaje de exito
      swal.fire({
        title: 'BIENVENIDO',
        timer: 1500,
        text: '¡Qué alegría verte de nuevo!',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Netflix_logo.svg/2560px-Netflix_logo.svg.png',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'foto bienvenida Netflix',
        showConfirmButton: false,
      })
      .then(() => {
        // 5. Redireccion a admin
        window.location.href = '../admin/admin.html';
    });
    } else {
      // Credenciales no validas
      credentialsAlert.classList.remove('d-none');
    }
  }
});
