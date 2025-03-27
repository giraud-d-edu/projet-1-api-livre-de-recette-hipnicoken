<script lang="ts">
  import { goto } from '$app/navigation';
  import { fetchRecettes } from '$lib/services/api.js';
  import { onMount } from 'svelte';

  let recettes = [];

  // Charger les 3 dernières recettes au chargement de la page
  onMount(async () => {
    try {
      const allRecettes = await fetchRecettes();
      recettes = allRecettes.slice(-3).reverse(); // Prendre les 3 dernières recettes
    } catch (error) {
      console.error('Erreur lors du chargement des recettes :', error);
    }
  });
</script>

<style>
  .background-image {
    background-image: url('/cuisine.jpg'); 
    background-size: cover;
    background-position: center;
    filter: blur(5px)  brightness(60%);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1; 
  }
</style>

<div class="relative min-h-screen flex flex-col items-center justify-center text-white">
  <!-- Image de fond -->
  <div class="background-image"></div>

  <!-- Contenu principal -->
  <h1 class="text-5xl font-bold mb-6 text-center drop-shadow-lg">
    Bienvenue sur le Livre de Recettes
  </h1>
  <p class="text-lg mb-8 text-center drop-shadow-lg">
    Découvrez, créez et partagez vos recettes préférées !
  </p>
  <div class="flex gap-4">
    <button
      on:click={() => goto('/recettes')}
      class="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
    >
      Voir les recettes
    </button>
    <button
      on:click={() => goto('/recettes/create')}
      class="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      Ajouter une recette
    </button>
  </div>

  <!-- Section "Nos dernières recettes" -->
  <section class="mt-12 w-full px-4">
    <h2 class="text-3xl font-bold mb-6 text-center drop-shadow-lg">Nos dernières recettes</h2>
    <div class="card-container">
      {#if recettes.length > 0}
        {#each recettes as recette}
          <div class="card">
            <img src={recette.image} alt={recette.titre} style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px;" />
            <h3>{recette.titre}</h3>
            <p>{recette.description}</p>
            <div class="card-actions">
              <button class="view" on:click={() => goto(`/recettes/${recette.id}`)}>Voir la recette</button>
            </div>
          </div>
        {/each}
      {:else}
        <p class="text-center">Chargement des recettes...</p>
      {/if}
    </div>
  </section>
</div>