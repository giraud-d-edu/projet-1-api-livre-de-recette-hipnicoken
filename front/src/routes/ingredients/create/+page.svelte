<script lang="ts">
    import { createIngredient } from '$lib/services/api';
    import { goto } from '$app/navigation';
  
    let name = '';
    let erreur = '';
    let message = '';
  
    const envoyer = async () => {
      erreur = '';
      message = '';
      try {
        await createIngredient({ name });
        message = 'Ingrédient créé avec succès !';
        goto('/ingredients');
      } catch (e) {
        erreur = 'Erreur lors de la création.';
        console.error(e);
      }
    };
  </script>
  
  <h1>Ajouter un ingrédient</h1>
  
  {#if erreur}
    <p style="color:red">{erreur}</p>
  {/if}
  {#if message}
    <p style="color:green">{message}</p>
  {/if}
  
  <form on:submit|preventDefault={envoyer}>
    <label>Nom :</label>
    <input bind:value={name} required />
  
    <button type="submit">Créer</button>
  </form>
  