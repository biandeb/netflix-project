'use strict'

export const generateRandomId = () => {
  return self.crypto.randomUUID();
  };

export const getCategoriesFromLS = () => {
  return JSON.parse(localStorage.getItem('categories')) || [];
  };