<script lang="ts">
    import { fetchRecetteById } from '$lib/services/api';
  
    let rechercheId = '';
    let recette = null;
    let erreur = '';
  
    const rechercherParId = async () => {
      if (!rechercheId.trim()) return;
      erreur = '';
      recette = null;
  
      try {
        recette = await fetchRecetteById(rechercheId.trim());
        if (!recette) erreur = 'Recette introuvable.';
      } catch (err) {
        erreur = 'Erreur lors du chargement.';
        console.error(err);
      }
    };
  </script>
  
  <h1>Recherche de recette par ID</h1>
  
  <form on:submit|preventDefault={rechercherParId}>
    <input type="text" placeholder="ID de la recette" bind:value={rechercheId} />
    <button type="submit">Rechercher</button>
  </form>
  
  {#if erreur}
    <p style="color: red;">{erreur}</p>
  {:else if recette}
    <h2>{recette.nom}</h2>
    <p>{recette.description}</p>
  {/if}
  