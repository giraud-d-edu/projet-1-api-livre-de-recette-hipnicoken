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

<h1 class="text-3xl font-bold text-center text-orange-500 mb-6">Ajouter un ingrédient</h1>

{#if erreur}
  <p class="text-red-500 text-center mb-4">{erreur}</p>
{/if}
{#if message}
  <p class="text-green-500 text-center mb-4">{message}</p>
{/if}

<form on:submit|preventDefault={envoyer} class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
  <div class="mb-4">
    <label class="block text-gray-700 font-medium mb-2">Nom :</label>
    <input
      bind:value={name}
      required
      class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
    />
  </div>

  <button
    type="submit"
    class="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
  >
    Créer
  </button>
</form>
