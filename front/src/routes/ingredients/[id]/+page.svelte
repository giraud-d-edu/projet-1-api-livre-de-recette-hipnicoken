<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  import { fetchIngredientById, fetchRecettes } from '$lib/services/api';
  import { goto } from '$app/navigation';

  let ingredient = null;
  let recettesAssociees = [];
  let erreur = '';
  const id = get(page).params.id;

  onMount(async () => {
    try {
      ingredient = await fetchIngredientById(id);
      
      // Récupérer toutes les recettes et filtrer celles qui contiennent cet ingrédient
      const toutesRecettes = await fetchRecettes();
      recettesAssociees = toutesRecettes.filter(recette => 
        recette.ingredients && recette.ingredients.some(ing => 
          ing.ingredientId === id || ing.name === ingredient.name
        )
      );
    } catch (e) {
      erreur = 'Erreur lors du chargement.';
      console.error(e);
    }
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
</script>

<h1 class="text-3xl font-bold text-center text-orange-500 mb-6">📄 Détail de l'ingrédient</h1>

{#if erreur}
  <p class="text-red-500 text-center mb-4">{erreur}</p>
{:else if ingredient}
  <div class="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">{ingredient.name}</h2>

    <div class="mb-6">
      <h3 class="text-lg font-semibold text-gray-700">Informations :</h3>
      <p class="text-gray-600 mb-2"><strong>Créé le :</strong> {formatDate(ingredient.createdAt)}</p>
      <p class="text-gray-600 mb-2"><strong>Mis à jour le :</strong> {formatDate(ingredient.updatedAt)}</p>
    </div>

    <div>
      <h3 class="text-lg font-semibold text-gray-700 mb-2">Recettes utilisant cet ingrédient :</h3>
      {#if recettesAssociees.length > 0}
        <ul class="list-disc pl-6">
          {#each recettesAssociees as recette}
            <li class="text-gray-600 mb-2">
              <a 
                href={`/recettes/${recette._id}`} 
                class="text-orange-500 hover:underline"
              >
                {recette.title}
              </a>
              <span class="text-sm ml-2 category-badge" style="background-color: 
                {recette.category === 'Entrée' ? '#FF7F50' : 
                recette.category === 'Plat' ? '#FF7F50' : 
                '#FF7F50'}">
                {recette.category}
              </span>
            </li>
          {/each}
        </ul>
      {:else}
        <p class="text-gray-500 italic">Aucune recette n'utilise cet ingrédient.</p>
      {/if}
    </div>
    
    <div class="mt-8 flex justify-between">
      <button 
        on:click={() => history.back()} 
        class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
      >
        ← Retour
      </button>
    </div>
  </div>
{:else}
  <p class="text-gray-500 text-center">Chargement...</p>
{/if}
