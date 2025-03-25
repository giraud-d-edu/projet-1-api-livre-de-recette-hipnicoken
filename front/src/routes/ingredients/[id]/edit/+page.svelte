<script lang="ts">
    import { page } from '$app/stores';
    import { get } from 'svelte/store';
    import { fetchIngredientById, updateIngredient } from '$lib/services/api';
    import { goto } from '$app/navigation';
  
    const id = get(page).params.id;
    let name = '';
    let erreur = '';
    let message = '';
  
    const charger = async () => {
      try {
        const ingr = await fetchIngredientById(id);
        name = ingr.name;
      } catch (e) {
        erreur = 'Erreur lors du chargement.';
      }
    };
  
    const modifier = async () => {
      try {
        await updateIngredient(id, { name });
        message = 'Ingrédient modifié avec succès !';
        goto('/ingredients');
      } catch (e) {
        erreur = 'Erreur lors de la modification.';
      }
    };
  
    charger();
  </script>
  
  <h1>Modifier l'ingrédient</h1>
  
  {#if erreur}
    <p style="color:red">{erreur}</p>
  {:else if message}
    <p style="color:green">{message}</p>
  {/if}
  
  <form on:submit|preventDefault={modifier}>
    <label>Nom :</label>
    <input bind:value={name} required />
    <button type="submit">Mettre à jour</button>
  </form>
  