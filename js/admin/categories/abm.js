'use strict'

import { getCategoriesFromLS, setFirstLetterToUpperCase } from '../../utilities.js';
import { Category } from './Category.js';
import { loadCategoriesList } from './utilities.js';
  
export const createCategory = (name) => {
// 1. Obtener categorias de LS
const categories = getCategoriesFromLS();
  
// 2. Crear categoria (como obj)
const newCategory = new Category(name);
categories.push(newCategory);
  
// 3. Actualizar categorias en LS
localStorage.setItem('categories', JSON.stringify(categories));
  
// 4. Mensaje de exito
swal.fire({
    title: '¡Categoría guardada con éxito!',
    timer: 1500,
    width: 600,
    padding: '3em',
    color: '#f9f9f9',
    background: '#202020',
    backdrop: `
      url("../../assets/movie.gif")
      left top
      no-repeat
    `,
    timerProgressBar: false,
    showConfirmButton: false,
  });
  loadCategoriesList();
};
  
  export const editCategory = (name) => {
    // 1. Traer ID de sessionStorage
    const categoryId = sessionStorage.getItem('categoryId');
  
    // 2. Obtener categorias de LS
    const categories = getCategoriesFromLS();
  
    // 3. Buscar categoria por ID
    const categoryIndex = categories.findIndex((item) => item.id === categoryId);
  
    // 4. Editar categoria
    categories[categoryIndex].name = setFirstLetterToUpperCase(name).trim();
  
    // 5. Guardar nuevamente en LS
    localStorage.setItem('categories', JSON.stringify(categories));
  
    // 6. Mensaje de exito
    swal.fire({
      title: `¡La categoría ${name} se ha editado!`,
      icon: 'success',
      timer: 1500,
      timerProgressBar: false,
      showConfirmButton: false,
      background: '#202020',
        color: '#f9f9f9',
    });

    // 7. Recargar listado
    loadCategoriesList();

    // falta limpiar formulario y quitar clase is-valid

    // 8. Ocultar warning de edicion
    const editingWarning = document.getElementById('alert-editing');
    editingWarning.classList.add('d-none');

    categoriesInput.classList.remove('is-valid');
  
    // 9. Limpiar id del sessionStorage
    sessionStorage.removeItem('categoryId');
    
  };
    
  
  export const deleteCategory = (categoryId) => {
    // 1. Confirmar eliminacion
    swal
      .fire({
        title: '¿Estás seguro?',
        text: 'Esta opción no será reversible',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sí, eliminar',
        background: '#202020',
        color: '#f9f9f9',
      })
      .then((action) => {
        if (action.isConfirmed) {
          // 2. Traer lista
          const categories = getCategoriesFromLS();
  
          // 3. Filtrar lista (tambien se puede con splice)
          const filteredList = categories.filter(
            (item) => item.id !== categoryId
          );
  
          // 4. Actualizamos la lista en LS
          localStorage.setItem('categories', JSON.stringify(filteredList));
  
          // 5. Mensaje de exito
          swal.fire({
            title: 'Éxito',
            text: 'La categoría se eliminó correctamente',
            icon: 'success',
            background: '#202020',
            color: '#f9f9f9',
          });
  
          // 6. Recargar datos en tabla
          loadCategoriesList();
          formCategories.reset();
        }
    });
};