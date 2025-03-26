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

<h1 class="text-3xl font-bold text-center text-orange-500 mb-6">Modifier l'ingrédient</h1>

{#if erreur}
  <p class="text-red-500 text-center mb-4">{erreur}</p>
{:else if message}
  <p class="text-green-500 text-center mb-4">{message}</p>
{/if}

<form on:submit|preventDefault={modifier} class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
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
    Mettre à jour
  </button>
</form>
