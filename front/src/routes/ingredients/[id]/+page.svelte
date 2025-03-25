<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { get } from 'svelte/store';
    import { fetchIngredientById } from '$lib/services/api';
  
    let ingredient = null;
    let erreur = '';
    const id = get(page).params.id;
  
    onMount(async () => {
      try {
        ingredient = await fetchIngredientById(id);
      } catch (e) {
        erreur = 'Erreur lors du chargement.';
        console.error(e);
      }
    });
  </script>
  
  <h1>📄 Détail de l’ingrédient</h1>
  
  {#if erreur}
    <p style="color:red">{erreur}</p>
  {:else if ingredient}
    <h2>{ingredient.name}</h2>
    <p><strong>ID :</strong> {ingredient._id}</p>
    <p><strong>Créé le :</strong> {new Date(ingredient.createdAt).toLocaleString()}</p>
    <p><strong>Mis à jour le :</strong> {new Date(ingredient.updatedAt).toLocaleString()}</p>
  {:else}
    <p>Chargement...</p>
  {/if}
  