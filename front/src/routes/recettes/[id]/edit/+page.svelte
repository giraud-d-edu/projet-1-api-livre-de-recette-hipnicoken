<script lang="ts">
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  import { fetchRecetteById, fetchIngredients, updateRecette } from '$lib/services/api';
  import { goto } from '$app/navigation';

  const id = get(page).params.id;

  let title = '';
  let description = '';
  let category = 'Entrée';
  let instructions = '';
  let recetteIngredients = []; // Liste des ingrédients de la recette
  let allIngredients = []; // Liste des ingrédients disponibles
  let selectedIngredientId = '';
  let quantity = '';

  let erreur = '';
  let message = '';

  const charger = async () => {
    try {
      const recette = await fetchRecetteById(id);
      title = recette.title;
      description = recette.description;
      category = recette.category;
      instructions = recette.instructions;

      // Enrichir les ingrédients avec leurs noms
      allIngredients = await fetchIngredients();
      recetteIngredients = recette.ingredients.map((ing) => {
        const ingredient = allIngredients.find((i) => i._id === ing.ingredientId);
        return {
          ingredientId: ing.ingredientId,
          ingredientName: ingredient ? ingredient.name : '(introuvable)',
          quantity: ing.quantity,
        };
      });
    } catch (e) {
      erreur = 'Erreur lors du chargement de la recette ou des ingrédients.';
      console.error(e);
    }
  };

  const ajouterIngredient = () => {
    if (!selectedIngredientId || !quantity) {
      erreur = 'Veuillez sélectionner un ingrédient et indiquer une quantité.';
      return;
    }

    const ingredient = allIngredients.find((ing) => ing._id === selectedIngredientId);
    if (!ingredient) {
      erreur = 'Ingrédient introuvable.';
      return;
    }

    // Ajouter l'ingrédient à la liste avec `ingredientId`, `ingredientName` et `quantity`
    recetteIngredients = [
      ...recetteIngredients,
      {
        ingredientId: selectedIngredientId,
        ingredientName: ingredient.name,
        quantity: quantity,
      },
    ];

    // Réinitialiser les champs
    selectedIngredientId = '';
    quantity = '';
    erreur = '';
  };

  const supprimerIngredient = (index: number) => {
    recetteIngredients = recetteIngredients.filter((_, i) => i !== index);
  };

  const modifier = async () => {
    erreur = '';
    message = '';

    try {
      await updateRecette(id, {
        title,
        description,
        category,
        instructions,
        ingredients: recetteIngredients.map(({ ingredientId, quantity }) => ({
          ingredientId,
          quantity,
        })),
      });

      message = 'Recette mise à jour avec succès !';
      goto('/recettes');
    } catch (e) {
      erreur = 'Erreur lors de la mise à jour.';
      console.error(e);
    }
  };

  charger();
</script>

<h1 class="text-3xl font-bold text-center text-orange-500 mb-6">Modifier la recette</h1>

{#if erreur}
  <p class="text-red-500 text-center mb-4">{erreur}</p>
{:else if message}
  <p class="text-green-500 text-center mb-4">{message}</p>
{/if}

<form on:submit|preventDefault={modifier} class="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
  <div class="mb-4">
    <label class="block text-gray-700 font-medium mb-2">Titre :</label>
    <input bind:value={title} required class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
  </div>

  <div class="mb-4">
    <label class="block text-gray-700 font-medium mb-2">Description :</label>
    <input bind:value={description} required class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
  </div>

  <div class="mb-4">
    <label class="block text-gray-700 font-medium mb-2">Catégorie :</label>
    <select bind:value={category} class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500">
      <option>Entrée</option>
      <option>Plat</option>
      <option>Dessert</option>
    </select>
  </div>

  <div class="mb-4">
    <label class="block text-gray-700 font-medium mb-2">Instructions :</label>
    <textarea bind:value={instructions} class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"></textarea>
  </div>

  <h3 class="text-xl font-semibold text-gray-700 mb-4">Ajouter des ingrédients</h3>
  <div class="flex items-center gap-4 mb-4">
    <div class="flex-1">
      <label class="block text-gray-700 font-medium mb-2">Ingrédient :</label>
      <select bind:value={selectedIngredientId} class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500">
        <option value="" disabled selected>-- Sélectionner un ingrédient --</option>
        {#each allIngredients as ingredient}
          <option value={ingredient._id}>{ingredient.name}</option>
        {/each}
      </select>
    </div>

    <div class="flex-1">
      <label class="block text-gray-700 font-medium mb-2">Quantité :</label>
      <input type="text" bind:value={quantity} class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
    </div>

    <button type="button" on:click={ajouterIngredient} class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
      Ajouter
    </button>
  </div>

  <h3 class="text-xl font-semibold text-gray-700 mb-4">Ingrédients sélectionnés :</h3>
  {#if recetteIngredients.length > 0}
    <ul class="list-disc pl-6 mb-4">
      {#each recetteIngredients as { ingredientName, quantity }, index}
        <li class="flex items-center justify-between">
          <span>{ingredientName} — {quantity}</span>
          <button type="button" on:click={() => supprimerIngredient(index)} class="text-red-500 hover:underline">
            Supprimer
          </button>
        </li>
      {/each}
    </ul>
  {:else}
    <p class="text-gray-500">Aucun ingrédient ajouté.</p>
  {/if}

  <button type="submit" class="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
    Mettre à jour
  </button>
</form>
