'use strict'

import {
    contentElementInteractivity,
    createCategorySection,
    getCategoriesFromLS,
    getContentFromLS,
    loadFeatured,
  } from './utilities.js';
  
  // ------------------------------
  // 1. Cargar destacada
  // ------------------------------

  loadFeatured();

  // ------------------------------
  // 2. Cargar contenido
  // ------------------------------
  
  const categories = getCategoriesFromLS();
  const content = getContentFromLS();
  
  categories.forEach((category) => {
    createCategorySection(category);
  });
  
  // ------------------------------
  // 2. Agregar interactividad
  // ------------------------------
  
  contentElementInteractivity();