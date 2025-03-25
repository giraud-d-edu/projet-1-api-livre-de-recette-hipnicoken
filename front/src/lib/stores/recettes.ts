import { writable } from 'svelte/store';
import { fetchRecettes } from '../services/api.js';

export const recettes = writable([]);

export async function loadRecettes() {
  try {
    const data = await fetchRecettes();
    recettes.set(data);
  } catch (err) {
    console.error("Erreur lors du chargement des recettes:", err);
  }
}
