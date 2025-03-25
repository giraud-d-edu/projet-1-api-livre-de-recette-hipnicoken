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

<h1>Liste des recettes</h1>

{#if erreur}
  <p style="color: red;">{erreur}</p>
{/if}

{#if recettes.length > 0}
  <ul>
    {#each recettes as recette}
      <li>
        <strong>{recette.title}</strong> — {recette.description}  
        <button on:click={() => goto(`/recettes/${recette._id}`)}>Voir</button>
        <button on:click={() => goto(`/recettes/${recette._id}/edit`)}>Modifier</button>
        <button on:click={() => supprimer(recette._id)}>Supprimer</button>
      </li>
    {/each}
  </ul>
{:else}
  <p>Aucune recette trouvée.</p>
{/if}

<button on:click={() => goto('/recettes/create')}>➕ Ajouter une recette</button>
