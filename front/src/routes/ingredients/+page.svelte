<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchIngredients, deleteIngredient } from '$lib/services/api';
    import { goto } from '$app/navigation';
  
    let ingredients = [];
    let erreur = '';
  
    const charger = async () => {
      try {
        ingredients = await fetchIngredients();
      } catch (e) {
        erreur = 'Erreur lors du chargement des ingrédients.';
        console.error(e);
      }
    };
  
    const supprimer = async (id: string) => {
      if (!confirm('Supprimer cet ingrédient ?')) return;
      try {
        await deleteIngredient(id);
        ingredients = ingredients.filter(i => i._id !== id);
      } catch (e) {
        erreur = 'Erreur lors de la suppression.';
        console.error(e);
      }
    };
  
    onMount(charger);
  </script>
  
  <h1>Liste des ingrédients</h1>
  
  {#if erreur}
    <p style="color:red">{erreur}</p>
  {/if}
  
  {#if ingredients.length > 0}
    <ul>
      {#each ingredients as ingredient}
        <li>
          {ingredient.name}
          <button on:click={() => goto(`/ingredients/${ingredient._id}`)}>Voir</button>
          <button on:click={() => goto(`/ingredients/${ingredient._id}/edit`)}>Modifier</button>
          <button on:click={() => supprimer(ingredient._id)}>Supprimer</button>
        </li>
      {/each}
    </ul>
  {:else}
    <p>Aucun ingrédient trouvé.</p>
  {/if}
  
  <button on:click={() => goto('/ingredients/create')}>
    ➕ Ajouter un ingrédient
  </button>
  