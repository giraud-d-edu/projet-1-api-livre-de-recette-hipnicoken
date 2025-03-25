<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  import { fetchRecetteById, fetchIngredientById } from '$lib/services/api';

  let recette = null;
  let erreur = '';
  const id = get(page).params.id;

  onMount(async () => {
    try {
      const rawRecette = await fetchRecetteById(id);

      // Pour chaque ingrédient, on va chercher son nom
      const enrichedIngredients = await Promise.all(
        rawRecette.ingredients.map(async (ing) => {
          try {
            const ingredientData = await fetchIngredientById(ing.ingredientId);
            return {
              name: ingredientData.name,
              quantity: ing.quantity
            };
          } catch {
            return {
              name: '(introuvable)',
              quantity: ing.quantity
            };
          }
        })
      );

      recette = { ...rawRecette, ingredients: enrichedIngredients };
    } catch (e) {
      erreur = 'Erreur lors du chargement.';
      console.error(e);
    }
  });
</script>

<h1>📄 Détail de la recette</h1>

{#if erreur}
  <p style="color:red">{erreur}</p>
{:else if recette}
  <h2>{recette.title}</h2>
  <p>{recette.description}</p>

  <h3>Catégorie : {recette.category}</h3>
  <h3>Instructions :</h3>
  <p>{recette.instructions}</p>

  <h3>Ingrédients :</h3>
  <ul>
    {#each recette.ingredients as ingr}
      <li>{ingr.name} — {ingr.quantity} g</li>
    {/each}
  </ul>
{:else}
  <p>Chargement...</p>
{/if}
