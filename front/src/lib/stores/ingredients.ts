import { writable } from 'svelte/store';
import { fetchIngredients } from '../services/api.js';

export const ingredients = writable([]);

export async function loadIngredients() {
    try {
      const data = await fetchIngredients();
      console.log("Données reçues depuis l'API /ingredients :", data);
      ingredients.set(data);
    } catch (err) {
      console.error("Erreur lors du chargement des ingrédients:", err);
    }
  }
  
