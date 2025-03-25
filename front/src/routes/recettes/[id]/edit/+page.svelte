<script lang="ts">
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  import { fetchRecetteById, updateRecette } from '$lib/services/api';
  import { goto } from '$app/navigation';

  const id = get(page).params.id;

  let title = '';
  let description = '';
  let category = 'Entrée';
  let instructions = '';
  let ingredients = [];

  let erreur = '';
  let message = '';

  const charger = async () => {
    try {
      const recette = await fetchRecetteById(id);
      title = recette.title;
      description = recette.description;
      category = recette.category;
      instructions = recette.instructions;
      ingredients = recette.ingredients || [];
    } catch (e) {
      erreur = 'Erreur lors du chargement de la recette.';
    }
  };

  const modifier = async () => {
    try {
      await updateRecette(id, {
        title,
        description,
        category,
        instructions,
        ingredients,
      });

      message = 'Recette mise à jour avec succès !';
      goto('/recettes');
    } catch (e) {
      erreur = 'Erreur lors de la mise à jour.';
    }
  };

  charger();
</script>

<h1>Modifier la recette</h1>

{#if erreur}
  <p style="color:red">{erreur}</p>
{:else if message}
  <p style="color:green">{message}</p>
{/if}

<form on:submit|preventDefault={modifier}>
  <label>Titre :</label>
  <input bind:value={title} required />

  <label>Description :</label>
  <input bind:value={description} required />

  <label>Catégorie :</label>
  <select bind:value={category}>
    <option>Entrée</option>
    <option>Plat</option>
    <option>Dessert</option>
  </select>

  <label>Instructions :</label>
  <textarea bind:value={instructions}></textarea>

  <button type="submit">Mettre à jour</button>
</form>
