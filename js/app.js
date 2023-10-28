'use strict'

import {
    contentElementInteractivity,
    createCategorySection,
    getCategoriesFromLS,
    getContentFromLS,
  } from './utilities.js';
  
  // ------------------------------
  // 1. Cargar elementos
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