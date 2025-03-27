<script lang="ts">
  import { goto } from '$app/navigation';
  import { fetchRecettes } from '$lib/services/api.js';
  import { onMount } from 'svelte';

  let recettes = [];

  // Emojis liés à la cuisine
  const emojis = ['🍳', '🥘', '🍲', '🥗', '🍕', '🍔', '🥦', '🥕', '🍅', '🧁', '🍰', '🍎'];
  let emojiElements = [];

  // Charger les données et initialiser les animations
  onMount(async () => {
    try {
      const allRecettes = await fetchRecettes();
      recettes = allRecettes.slice(-3).reverse(); // Prendre les 3 dernières recettes
    } catch (error) {
      console.error('Erreur lors du chargement des recettes :', error);
    }
    createEmojiRain();
  });

  // Générer les émojis en arrière-plan
  function createEmojiRain() {
    emojiElements = Array(50).fill(0).map(() => {
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      const size = Math.floor(Math.random() * 30) + 20;
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 15 + 10;
      const animationDelay = Math.random() * 15;
      const opacity = Math.random() * 0.4 + 0.1;
      
      return {
        emoji: randomEmoji,
        style: `
          left: ${left}%;
          font-size: ${size}px;
          animation-duration: ${animationDuration}s;
          animation-delay: -${animationDelay}s;
          opacity: ${opacity};
        `
      };
    });
  }
</script>

<style>
  /* Styles de base et de mise en page */
  .background-image {
    background-image: url('/cuisine.jpg'); 
    background-size: cover;
    background-position: center;
    filter: blur(5px) brightness(60%);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1; 
  }

  /* Styles pour la pluie d'emoji */
  .emoji-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
    pointer-events: none;
  }
  
  .falling-emoji {
    position: absolute;
    top: -5%;
    animation: emojiRain linear infinite;
    z-index: -1;
    filter: blur(1px);
    user-select: none;
  }
  
  @keyframes emojiRain {
    0% { transform: translateY(-10vh) rotate(0deg); }
    100% { transform: translateY(110vh) rotate(360deg); }
  }

  /* Styles pour le titre magique */
  .magic-title {
    display: inline-block;
    position: relative;
    filter: drop-shadow(0 0 10px rgba(100, 255, 150, 0.5));
    overflow: visible;
    perspective: 800px;
  }
  
  .char {
    display: inline-block;
    --delay: calc(var(--i) * 0.08s);
    animation: 
      crazyBounceIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) var(--delay) both,
      crazyFloat 4s ease-in-out calc(0.8s + var(--delay)) infinite alternate;
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.7), 0 0 25px rgba(50, 255, 100, 0.5);
    font-family: 'Comic Sans MS', 'Brush Script MT', cursive;
    transform-style: preserve-3d;
    font-size: 4rem;
  }
  
  .char:nth-child(3n) {
    animation-name: crazyBounceIn, crazyWave;
    animation-duration: 0.8s, 3s;
    animation-delay: var(--delay), calc(0.8s + var(--delay));
    filter: hue-rotate(calc(var(--i) * 15deg));
  }
  
  .char:nth-child(3n+1) {
    animation-name: crazyBounceIn, crazyPulse;
    animation-duration: 0.8s, 2s;
    animation-delay: var(--delay), calc(0.8s + var(--delay));
  }
  
  .char:is(:nth-child(1), :nth-child(3), :nth-child(7), :nth-child(11)) {
    animation: 
      crazyBounceIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) var(--delay) both,
      crazySpin 5s linear calc(0.8s + var(--delay)) infinite;
    transform-origin: center;
    filter: saturate(1.5) brightness(1.2);
  }

  /* Effets spéciaux du titre */
  .glow-effect {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(ellipse at center, rgba(80, 255, 120, 0.7) 0%, rgba(50, 255, 100, 0.5) 40%, transparent 70%);
    border-radius: 40%;
    z-index: -1;
    filter: blur(25px);
    animation: ultraPulse 5s infinite alternate;
    transform-origin: center;
  }
  
  .fire-effect {
    position: absolute;
    bottom: -20px;
    left: 0; right: 0;
    height: 40px;
    background: linear-gradient(0deg, rgba(0, 200, 50, 0.8) 0%, rgba(150, 255, 100, 0.4) 50%, transparent 100%);
    z-index: -2;
    filter: blur(15px);
    animation: flicker 0.5s ease-in-out infinite alternate;
    transform-origin: bottom;
  }
  
  .sparkles {
    position: absolute;
    top: -30px; left: -30px; right: -30px; bottom: -30px;
    z-index: -3;
    background-image: 
      radial-gradient(circle at 10% 10%, white 1px, transparent 2px),
      radial-gradient(circle at 30% 40%, white 1px, transparent 2px),
      radial-gradient(circle at 50% 20%, white 1px, transparent 2px),
      radial-gradient(circle at 70% 60%, white 1px, transparent 2px),
      radial-gradient(circle at 90% 30%, white 1px, transparent 2px);
    animation: sparkleMove 5s linear infinite;
  }

  /* Animations du titre */
  @keyframes crazyBounceIn {
    0% { opacity: 0; transform: scale(0.3) translateY(80px) rotateX(90deg); }
    30% { transform: scale(1.3) translateY(-30px) rotateX(-20deg); }
    50% { transform: scale(0.8) translateY(15px) rotateX(10deg); }
    70% { transform: scale(1.1) translateY(-10px) rotateX(-5deg); }
    100% { opacity: 1; transform: scale(1) translateY(0) rotateX(0); }
  }
  
  @keyframes crazyFloat {
    0% { transform: translateY(0) rotate(0) scale(1); }
    25% { transform: translateY(-15px) rotate(5deg) scale(1.1); }
    50% { transform: translateY(0) rotate(-3deg) scale(1); }
    75% { transform: translateY(10px) rotate(5deg) scale(0.95); }
    100% { transform: translateY(0) rotate(0) scale(1); }
  }
  
  @keyframes crazyWave {
    0% { transform: translateY(0) rotate(-5deg) translateX(-2px); }
    25% { transform: translateY(-15px) rotate(10deg) translateX(5px); }
    50% { transform: translateY(5px) rotate(-8deg) translateX(-3px); }
    75% { transform: translateY(-10px) rotate(12deg) translateX(4px); }
    100% { transform: translateY(0) rotate(-5deg) translateX(-2px); }
  }
  
  @keyframes crazySpin {
    0% { transform: rotateY(0deg) rotateX(0deg) scale(1); }
    25% { transform: rotateY(180deg) rotateX(30deg) scale(1.2); }
    50% { transform: rotateY(360deg) rotateX(0deg) scale(1); }
    75% { transform: rotateY(540deg) rotateX(-30deg) scale(1.2); }
    100% { transform: rotateY(720deg) rotateX(0deg) scale(1); }
  }
  
  @keyframes crazyPulse {
    0%, 100% { transform: scale(1); filter: brightness(1); }
    50% { transform: scale(1.2); filter: brightness(1.5); }
  }
  
  @keyframes ultraPulse {
    0% { transform: scale(1) rotate(0deg); opacity: 0.5; }
    25% { transform: scale(1.2) rotate(5deg); opacity: 0.7; }
    50% { transform: scale(1.1) rotate(-5deg); opacity: 0.9; }
    75% { transform: scale(1.3) rotate(10deg); opacity: 0.6; }
    100% { transform: scale(1) rotate(0deg); opacity: 0.5; }
  }
  
  @keyframes flicker {
    0%, 80%, 100% { transform: scaleY(1.0); opacity: 0.7; }
    20% { transform: scaleY(1.1); opacity: 0.9; }
    40% { transform: scaleY(0.9); opacity: 0.6; }
    60% { transform: scaleY(1.2); opacity: 0.8; }
  }
  
  @keyframes sparkleMove {
    0% { background-position: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%; opacity: 0.5; }
    50% { background-position: 10% 10%, 20% 20%, 30% 30%, 40% 40%, 50% 50%; opacity: 1; }
    100% { background-position: 20% 20%, 40% 40%, 60% 60%, 80% 80%, 100% 100%; opacity: 0.5; }
  }
</style>

<div class="relative min-h-screen flex flex-col items-center justify-center text-white">
  <!-- Arrière-plan -->
  <div class="background-image"></div>
  
  <!-- Pluie d'emoji -->
  <div class="emoji-container">
    {#each emojiElements as item}
      <span class="falling-emoji" style={item.style}>{item.emoji}</span>
    {/each}
  </div>

  <!-- Titre principal animé -->
  <div class="text-center mb-8">
    <h1 class="text-5xl font-bold mb-6 text-center drop-shadow-lg">
      <div class="magic-title">
        <div class="sparkles"></div>
        <div class="glow-effect"></div>
        <div class="fire-effect"></div>
        {#each "Popote Magique".split("") as char, i}
          <span class="char" style="--i: {i};">{char}</span>
        {/each}
      </div>
    </h1>
    <p class="text-lg drop-shadow-lg">
      Découvrez, créez et partagez vos recettes préférées !
    </p>
  </div>

  <!-- Boutons d'action -->
  <div class="flex gap-4 mb-12">
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
  <section class="w-full px-4 mb-12">
    <h2 class="text-3xl font-bold mb-6 text-center drop-shadow-lg">Nos dernières recettes</h2>
    <div class="card-container flex flex-wrap justify-center gap-6">
      {#if recettes.length > 0}
        {#each recettes as recette}
          <div class="card">
            <h3>{recette.title}</h3>
            <p>{recette.description}</p>
            <div class="card-actions">
              <button class="view" on:click={() => goto(`/recettes/${recette._id}`)}>
                Voir la recette
              </button>
            </div>
          </div>
        {/each}
      {:else}
        <p class="text-center py-8">Chargement des recettes...</p>
      {/if}
    </div>
  </section>
</div>