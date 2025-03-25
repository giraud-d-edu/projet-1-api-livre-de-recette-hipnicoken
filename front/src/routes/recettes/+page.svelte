<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchRecettes, deleteRecette } from '$lib/services/api';
  import { goto } from '$app/navigation';

  let recettes = [];
  let erreur = '';

  const charger = async () => {
    try {
      recettes = await fetchRecettes();
    } catch (e) {
      erreur = 'Erreur lors du chargement des recettes.';
      console.error(e);
    }
  };

  const supprimer = async (id: string) => {
    if (!confirm('Supprimer cette recette ?')) return;
    try {
      await deleteRecette(id);
      recettes = recettes.filter(r => r._id !== id);
    } catch (e) {
      erreur = 'Erreur lors de la suppression.';
      console.error(e);
    }
  };

  onMount(charger);
</script>

<style>
 
</style>

<h1>Liste des recettes</h1>

{#if erreur}
  <p style="color: red;">{erreur}</p>
{/if}

{#if recettes.length > 0}
  <div class="card-container">
    {#each recettes as recette}
      <div class="card">
        <h3>{recette.title}</h3>
        <p>{recette.description}</p>
        <div class="card-actions">
          <button class="view" on:click={() => goto(`/recettes/${recette._id}`)}>Voir</button>
          <button class="edit" on:click={() => goto(`/recettes/${recette._id}/edit`)}>Modifier</button>
          <button class="delete" on:click={() => supprimer(recette._id)}>Supprimer</button>
        </div>
      </div>
    {/each}
  </div>
{:else}
  <p>Aucune recette trouvée.</p>
{/if}

<button on:click={() => goto('/recettes/create')}>➕ Ajouter une recette</button>
