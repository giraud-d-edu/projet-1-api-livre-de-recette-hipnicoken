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
  let modeCookingParty = false;
  let pizzaEmojis = [];

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
    if (recherche.toLowerCase() === "pizza" && !modeCookingParty) {
      activateCookingParty();
    }
    
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

  // Créer la pluie d'emojis pizza
  const createPizzaRain = () => {
    pizzaEmojis = Array(50).fill(0).map(() => {
      const size = Math.floor(Math.random() * 30) + 20;
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 10 + 5; 
      const animationDelay = Math.random() * 2;  
      const opacity = Math.random() * 0.3 + 0.7;  
      const rotation = Math.floor(Math.random() * 360);  
      
      return {
        style: `
          left: ${left}%;
          font-size: ${size}px;
          animation-duration: ${animationDuration}s;
          animation-delay: -${animationDelay}s;
          opacity: ${opacity};
          transform: rotate(${rotation}deg);
        `
      };
    });
  };

  // Activer le mode spécial
  const activateCookingParty = () => {
    modeCookingParty = true;
    createPizzaRain();
    
    // Désactiver après 15 secondes
    setTimeout(() => {
      modeCookingParty = false;
      pizzaEmojis = [];
    }, 15000);
  };

  onMount(() => {
    charger();

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

<style>

  .cooking-party {
    animation: discoBg 1.5s infinite;
  }
  
  .cooking-party .card {
    animation: dance 1s infinite alternate;
    transition: all 0.3s ease;
  }
  
  .cooking-party h1, .cooking-party h3 {
    animation: rainbow 2s linear infinite;
  }
  
  .cooking-party button {
    animation: pulse 1s infinite alternate;
  }
  
  @keyframes dance {
    0% { transform: rotate(-2deg) translateY(0); }
    50% { transform: rotate(0deg) translateY(-5px); }
    100% { transform: rotate(2deg) translateY(0); }
  }
  
  @keyframes rainbow {
    0% { color: #ff0000; }
    16.6% { color: #ff8800; }
    33.3% { color: #ffff00; }
    50% { color: #00ff00; }
    66.6% { color: #0000ff; }
    83.3% { color: #8800ff; }
    100% { color: #ff0000; }
  }
  
  @keyframes pulse {
    from { transform: scale(1); }
    to { transform: scale(1.1); }
  }
  
  @keyframes discoBg {
    0% { background-color: rgba(255, 200, 200, 0.1); }
    33% { background-color: rgba(200, 255, 200, 0.1); }
    66% { background-color: rgba(200, 200, 255, 0.1); }
    100% { background-color: rgba(255, 200, 200, 0.1); }
  }
  
  .easter-egg-message {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    z-index: 1000;
    animation: slideUp 0.5s ease-out;
    text-align: center;
  }
  
  @keyframes slideUp {
    from { transform: translate(-50%, 100px); opacity: 0; }
    to { transform: translate(-50%, 0); opacity: 1; }
  }
  
  .pizza-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 10;
    pointer-events: none;
  }
  
  .falling-pizza {
    position: absolute;
    top: -5%;
    animation: pizzaRain linear infinite;
    z-index: 10;
    user-select: none;
  }
  
  @keyframes pizzaRain {
    0% { transform: translateY(-10vh) rotate(0deg); }
    100% { transform: translateY(110vh) rotate(720deg); }
  }
</style>

<div class={`container mx-auto px-4 py-6 ${modeCookingParty ? 'cooking-party' : ''}`}>
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

  {#if modeCookingParty}
    <div class="pizza-container">
      {#each pizzaEmojis as pizza}
        <div class="falling-pizza" style={pizza.style}>🍕</div>
      {/each}
    </div>
    

    <div class="easter-egg-message">
      <h3 class="font-bold mb-2">🍕 MODE PIZZA PARTY ACTIVÉ! 🍕</h3>
      <p>Les recettes sont en train de faire la fête pendant 15 secondes! Profitez du spectacle!</p>
    </div>
  {/if}
</div>