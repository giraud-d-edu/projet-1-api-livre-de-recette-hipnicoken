<script lang="ts">
  import { goto } from '$app/navigation';
  import { recettes, loadRecettes } from '$lib/stores/recettes';
  import { ingredients, loadIngredients } from '$lib/stores/ingredients';
  import { fetchRecetteById } from '$lib/services/api';


  let rechercheId = '';
  let recette = null;
  let erreur = '';

  const rechercherParId = async () => {
    if (!rechercheId.trim()) return;
    erreur = '';
    recette = null;

    try {
      recette = await fetchRecetteById(rechercheId.trim());
      if (!recette) erreur = 'Recette introuvable.';
    } catch (err) {
      erreur = 'Erreur lors du chargement.';
      console.error(err);
    }
  };
  loadRecettes();
  loadIngredients();
</script>

<h1>Liste des recettes</h1>
<ul>
  {#each $recettes as recette}
    <li>
      <strong>{recette.nom}</strong> - {recette.description}</li>
  {/each}
</ul>

<h1>Liste des ingrédients</h1>
{#if $ingredients.length > 0}
  <ul>
    {#each $ingredients as ingredient}
      <li>{ingredient.name}</li>
    {/each}
  </ul>
{:else}
  <p>Aucun ingrédient trouvé.</p>
{/if}

<h1>Recherche de recette par ID</h1>

<form on:submit|preventDefault={rechercherParId}>
  <input class="block w-50 px-4 py-2 mb-3 border rounded-md" type="text" placeholder="ID de la recette" bind:value={rechercheId} />
  <button type="submit">Rechercher</button>
</form>

{#if erreur}
  <p style="color: red;">{erreur}</p>
{:else if recette}
  <h2>{recette.nom}</h2>
  <p>{recette.description}</p>
{/if}