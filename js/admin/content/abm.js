'use strict'

import {
    getContentFromLS,
    setFirstLetterToUpperCase,
  } from '../../utilities.js';
  import { Content } from './Content.js';
  import { addContentToLS, loadContentTable } from './utilities.js';
  
  export const createContent = (
    name,
    type,
    category,
    cover,
    trailer,
    description,
    isPublished
  ) => {
    const newContent = new Content(
      name,
      type,
      category,
      cover,
      trailer,
      description,
      isPublished
    );
  
    addContentToLS(newContent);

    swal.fire({
        title: `¡${setFirstLetterToUpperCase(type)} agregado exitosamente!`,
        timer: 1500,
        width: 600,
        padding: '3em',
        color: '#f9f9f9',
        background: '#202020',
        backdrop: `url("../../assets/movie.gif") left top no-repeat`,
        timerProgressBar: false,
        showConfirmButton: false,
        customClass: {
          container: 'custom-swal'
        }
      });
      };
  
  export const editContent = (
    name,
    type,
    category,
    cover,
    trailer,
    description,
    isPublished
  ) => {
    // 1. Traer ID de sessionStorage
    const contentId = sessionStorage.getItem('contentId');
  
    // 2. Obtener categorias de LS
    const contentList = getContentFromLS();
  
    // 3. Buscar categoria por ID
    const contentIndex = contentList.findIndex((item) => item.id === contentId);
  
    // ESTO podría mejorarse, porque resetea el formulario
    if (contentIndex === -1) {
      swal.fire({
        title: 'Error',
        text: `Ocurrió un error inesperado. Contenido no se ha encontrado`,
        icon: 'error',
        timer: 2000,
        timerProgressBar: false,
        showConfirmButton: false,
        color: '#f9f9f9',
        background: '#202020'
      });
      return;
    }
  
    // 4. Editar contenido
    contentList[contentIndex].name = name.trim();
    contentList[contentIndex].type = type;
    contentList[contentIndex].category = category;
    contentList[contentIndex].cover = cover;
    contentList[contentIndex].trailer = trailer;
    contentList[contentIndex].description = description;
    contentList[contentIndex].isPublished = isPublished;
  
    // 5. Guardar nuevamente en LS
    localStorage.setItem('contents', JSON.stringify(contentList));
  
    // 6. Mensaje de exito
    swal.fire({
      title: '¡Contenido editado!',
      icon: 'success',
      timer: 1500,
      timerProgressBar: false,
      showConfirmButton: false,
      color: '#f9f9f9',
      background: '#202020'
    });
  
    // 7. Ocultar warning de edicion
    const editingWarning = document.getElementById('alert-editing');
    editingWarning.classList.add('d-none');
  
    // 8. Limpiar id del sessionStorage
    sessionStorage.removeItem('contentId');
  };
  
  export const deleteContent = (contentId) => {
    // 1. Confirmar eliminacion
    swal
      .fire({
        title: '¿Estás seguro?',
        text: 'Esta opcion no será reversible',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sí, eliminar',
        color: '#f9f9f9',
        background: '#202020'
      })
      .then((action) => {
        if (action.isConfirmed) {
          // 2. Traer lista
          const content = getContentFromLS();
  
          // 3. Filtrar lista (tambien se puede con splice)
          const filteredList = content.filter((item) => item.id !== contentId);
  
          // 4. Actualizamos la lista en LS
          localStorage.setItem('contents', JSON.stringify(filteredList));
  
          // 5. Mensaje de exito
          swal.fire({
            title: 'Éxito',
            text: 'El contenido se eliminó correctamente',
            icon: 'success',
          });
  
          // 6. Recargar datos en tabla
          loadContentTable();
        }
      });
  };
  