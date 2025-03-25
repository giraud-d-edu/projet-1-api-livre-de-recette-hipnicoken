<script lang="ts">
  import { createRecette } from '$lib/services/api';
  import { goto } from '$app/navigation';

  let title = '';
  let description = '';
  let category = 'Entrée';
  let instructions = '';
  let ingredients = [];

  let erreur = '';
  let message = '';

  const envoyer = async () => {
    erreur = '';
    message = '';

    try {
      await createRecette({
        title,
        description,
        category,
        instructions,
        ingredients, // tu pourras l'ajouter plus tard
      });

      message = 'Recette créée avec succès !';
      goto('/recettes');
    } catch (e) {
      erreur = 'Erreur lors de la création.';
      console.error(e);
    }
  };
</script>

<h1>Créer une recette</h1>

{#if erreur}
  <p style="color:red">{erreur}</p>
{:else if message}
  <p style="color:green">{message}</p>
{/if}

<form on:submit|preventDefault={envoyer}>
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

  <!-- Tu pourras ajouter les ingrédients ici plus tard -->

  <button type="submit">Créer</button>
</form>
