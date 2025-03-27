<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchRecettes, deleteRecette } from '$lib/services/api';
  import { goto } from '$app/navigation';

  interface Recette {
    _id: string;
    title: string;
    description: string;
    category: string;
  }

  let recettes: Recette[] = [];
  let recettesFiltrees: Recette[] = [];
  let erreur = '';
  let recherche = '';
  let filtreCategorie = '';

  const charger = async () => {
    try {
      recettes = await fetchRecettes();
      recettesFiltrees = recettes;
    } catch (e) {
      erreur = 'Erreur lors du chargement des recettes.';
      console.error(e);
    }
  };

  const filtrer = () => {
    recettesFiltrees = recettes.filter((recette) => {
      const matchTitre = recette.title.toLowerCase().includes(recherche.toLowerCase());
      const matchCategorie = !filtreCategorie || recette.category === filtreCategorie;
      return matchTitre && matchCategorie;
    });
  };

  const rechercher = () => {
    filtrer();
  };

  const supprimer = async (id: string) => {
    if (!confirm('Supprimer cette recette ?')) return;
    try {
      await deleteRecette(id);
      recettes = recettes.filter((r) => r._id !== id);
      recettesFiltrees = recettesFiltrees.filter((r) => r._id !== id);
    } catch (e) {
      erreur = 'Erreur lors de la suppression.';
      console.error(e);
    }
  };

  onMount(charger);
</script>

<div class="container mx-auto px-4 py-6">
  <h1 class="text-3xl font-bold text-center text-orange-500 mb-8">Liste des recettes</h1>

  <div class="max-w-4xl mx-auto mb-8">
    <div class="flex flex-col sm:flex-row gap-4 items-center mb-6">
      <div class="relative w-full">
        <input
          type="text"
          placeholder="Rechercher une recette..."
          bind:value={recherche}
          on:input={rechercher}
          class="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>
      
      <select 
        bind:value={filtreCategorie} 
        on:change={filtrer} 
        class="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full sm:w-auto"
      >
        <option value="">Toutes les catégories</option>
        <option value="Entrée">Entrées</option>
        <option value="Plat">Plats</option>
        <option value="Dessert">Desserts</option>
      </select>
      
      <button 
        on:click={() => goto('/recettes/create')}
        class="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors w-full sm:w-auto whitespace-nowrap"
      >
        ➕ Ajouter une recette
      </button>
    </div>
    
    {#if erreur}
      <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
        <p>{erreur}</p>
      </div>
    {/if}
  </div>
  
  {#if recettesFiltrees.length > 0}
    <div class="card-container flex flex-wrap justify-center gap-8">
      {#each recettesFiltrees as recette}
        <div class="card" style="min-width: 300px; max-width: 350px; margin-bottom: 1.5rem;">
          <h3>{recette.title}</h3>
          
          <div class="category-badge mb-3" style="background-color: 
            {recette.category === 'Entrée' ? 'var(--color-orange)' : 
            recette.category === 'Plat' ? 'var(--color-orange)' : 
            'var(--color-orange)'}">
            {recette.category}
          </div>
          
          <p>{recette.description}</p>
          
          <div class="card-actions">
            <button 
              on:click={() => goto(`/recettes/${recette._id}`)}
              class="view"
            >
              Voir
            </button>
            <button 
              on:click={() => goto(`/recettes/${recette._id}/edit`)}
              class="edit"
            >
              Modifier
            </button>
            <button 
              on:click={() => supprimer(recette._id)}
              class="delete"
            >
              Supprimer
            </button>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="text-center py-12 bg-gray-50 rounded-lg">
      <p class="text-gray-500 text-lg">Aucune recette trouvée.</p>
      <p class="text-gray-400 mt-2">Essayez avec un terme de recherche différent ou ajoutez une nouvelle recette.</p>
    </div>
  {/if}
</div>