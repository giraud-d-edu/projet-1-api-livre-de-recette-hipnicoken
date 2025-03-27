<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchIngredients, deleteIngredient } from '$lib/services/api';
  import { goto } from '$app/navigation';

  let ingredients = [];
  let ingredientsFiltres = []; 
  let erreur = '';
  let recherche = '';

  const charger = async () => {
    try {
      ingredients = await fetchIngredients();
      ingredientsFiltres = ingredients; // Initialiser les ingrédients filtrés
    } catch (e) {
      erreur = 'Erreur lors du chargement des ingrédients.';
      console.error(e);
    }
  };

  const rechercher = () => {
    ingredientsFiltres = ingredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(recherche.toLowerCase())
    );
  };

  const supprimer = async (id: string) => {
    if (!confirm('Supprimer cet ingrédient ?')) return;
    try {
      await deleteIngredient(id);
      ingredients = ingredients.filter(i => i._id !== id);
      ingredientsFiltres = ingredientsFiltres.filter(i => i._id !== id); // Mise à jour de la liste filtrée
    } catch (e) {
      erreur = 'Erreur lors de la suppression.';
      console.error(e);
    }
  };

  onMount(charger);
</script>
  
<div class="container mx-auto px-4 py-6">
  <h1 class="text-3xl font-bold text-center text-orange-500 mb-8">Liste des ingrédients</h1>
  <div class="max-w-4xl mx-auto mb-8">
    <div class="flex flex-col sm:flex-row gap-4 items-center mb-6">

      <div class="relative w-full">
        <input
          type="text"
          placeholder="Rechercher un ingrédient..."
          bind:value={recherche}
          on:input={rechercher}
          class="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>

      <button 
        on:click={() => goto('/ingredients/create')}
        class="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors w-full sm:w-auto whitespace-nowrap"
      >
        ➕ Ajouter un ingrédient
      </button>
    </div>
    
    {#if erreur}
      <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
        <p>{erreur}</p>
      </div>
    {/if}
  </div>
  
  {#if ingredientsFiltres.length > 0}
    <div class="card-container flex flex-wrap justify-center gap-8">
      {#each ingredientsFiltres as ingredient}
        <div class="card" style="min-width: 250px; max-width: 350px; margin-bottom: 1.5rem;">
          <h3>{ingredient.name}</h3>
          
          <div class="card-actions">
            <button 
              on:click={() => goto(`/ingredients/${ingredient._id}`)}
              class="view"
            >
              Voir
            </button>
            <button 
              on:click={() => goto(`/ingredients/${ingredient._id}/edit`)}
              class="edit"
            >
              Modifier
            </button>
            <button 
              on:click={() => supprimer(ingredient._id)}
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
      <p class="text-gray-500 text-lg">Aucun ingrédient trouvé.</p>
      <p class="text-gray-400 mt-2">Essayez avec un terme de recherche différent ou ajoutez un nouvel ingrédient.</p>
    </div>
  {/if}
</div>
  
