<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchRecettes, deleteRecette } from '$lib/services/api';
  import { goto } from '$app/navigation';

  let recettes = [];
  let recettesFiltrees = []; // Liste des recettes filtrées
  let erreur = '';
  let recherche = ''; // Champ de recherche

  const charger = async () => {
    try {
      recettes = await fetchRecettes();
      recettesFiltrees = recettes; // Initialiser les recettes filtrées avec toutes les recettes
    } catch (e) {
      erreur = 'Erreur lors du chargement des recettes.';
      console.error(e);
    }
  };

  const rechercher = () => {
    recettesFiltrees = recettes.filter((recette) =>
      recette.title.toLowerCase().includes(recherche.toLowerCase())
    );
  };

  const supprimer = async (id: string) => {
    if (!confirm('Supprimer cette recette ?')) return;
    try {
      await deleteRecette(id);
      recettes = recettes.filter((r) => r._id !== id);
      recettesFiltrees = recettes.filter((r) => r._id !== id); // Mettre à jour les recettes filtrées
    } catch (e) {
      erreur = 'Erreur lors de la suppression.';
      console.error(e);
    }
  };

  onMount(charger);
</script>

<style>
  .search-container {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .search-container input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
  }

  .search-container button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .search-container button:hover {
    background-color: #0056b3;
  }
</style>

<h1 class="text-3xl font-bold text-center text-orange-500 mb-6">Liste des recettes</h1>

<div class="search-container">
  <input
    type="text"
    placeholder="Rechercher par nom..."
    bind:value={recherche}
    on:input={rechercher}
    class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
  />
</div>

<button
  on:click={() => goto('/recettes/create')}
  class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mb-4"
>
  ➕ Ajouter une recette
</button>

{#if erreur}
  <p class="text-red-500 text-center mb-4">{erreur}</p>
{/if}

{#if recettesFiltrees.length > 0}
  <div class="card-container">
    {#each recettesFiltrees as recette}
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
  <p class="text-gray-500 text-center">Aucune recette trouvée.</p>
{/if}