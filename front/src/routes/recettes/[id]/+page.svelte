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

<h1 class="text-3xl font-bold text-center text-orange-500 mb-6">📄 Détail de la recette</h1>

{#if erreur}
  <p class="text-red-500 text-center mb-4">{erreur}</p>
{:else if recette}
  <div class="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">{recette.title}</h2>
    <p class="text-gray-600 mb-4">{recette.description}</p>

    <h3 class="text-lg font-semibold text-gray-700">Catégorie :</h3>
    <p class="text-gray-600 mb-4">{recette.category}</p>

    <h3 class="text-lg font-semibold text-gray-700">Instructions :</h3>
    <p class="text-gray-600 mb-4">{recette.instructions}</p>

    <h3 class="text-lg font-semibold text-gray-700">Ingrédients :</h3>
    <ul class="list-disc pl-6">
      {#each recette.ingredients as ingr}
        <li class="text-gray-600">{ingr.name} — {ingr.quantity}</li>
      {/each}
    </ul>
  </div>
{:else}
  <p class="text-gray-500 text-center">Chargement...</p>
{/if}
