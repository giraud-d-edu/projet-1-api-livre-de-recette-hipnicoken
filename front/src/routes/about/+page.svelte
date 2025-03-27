<!-- src/routes/about/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  // Emojis liés à la cuisine
  const emojis = ['🍳', '🥘', '🍲', '🥗', '🍕', '🍔', '🥦', '🥕', '🍅', '🧁', '🍰', '🍎'];
  let emojiElements = [];
  
  // Textes à animer
  const paragraphs = [
    "L'histoire commence toujours par un début, mais qu'en est-il des débuts qui n'ont jamais été commencés ? On dit souvent que le passé forge l'avenir, mais si l'avenir était déjà écrit dans le passé, alors que reste-t-il du présent ? Cette page, bien qu'elle soit dédiée à des informations, est en réalité un paradoxe temporel où les mots ne suivent pas nécessairement la logique du temps.",
    
    "Imaginez un oiseau qui vole à reculons, un arbre qui pousse vers le bas, ou encore une rivière qui remonte à sa source non pas par caprice, mais par un étrange jeu de gravité inversée. Et si tout cela était normal dans un autre univers, où chaque pixel de cette page serait un fragment de mémoire d'un futur oublié ?",
    
    "Notre application, bien que réelle, pourrait être le fruit d'une pensée abstraite, un rêve d'algorithme cherchant à comprendre l'essence même de l'existence numérique. Elle n'a pas de début, ni de fin, elle est simplement là, comme un chat endormi sur le clavier d'un programmeur distrait.",
    
    "Ainsi, tandis que les lignes de code défilent et que les idées flottent dans l'éther du développement, nous vous laissons méditer sur cette question fondamentale : est-ce que cette page existe parce qu'elle a un sens, ou trouve-t-elle son sens dans le simple fait d'exister ?"
  ];
  
  const conclusion = "Merci de visiter notre application. Bonne réflexion !";
  
  // Variables pour l'animation de frappe
  let visibleTexts = paragraphs.map(() => "");
  let visibleConclusion = "";
  let currentParagraph = 0;
  let currentChar = 0;
  let typingInterval;
  let isTyping = true;

  // Initialiser les animations
  onMount(() => {
    createEmojiRain();
    startTyping();
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
  
  // Animation de frappe au clavier
  function startTyping() {
    typingInterval = setInterval(() => {
      if (currentParagraph < paragraphs.length) {
        if (currentChar < paragraphs[currentParagraph].length) {
          // Ajouter une lettre au paragraphe actuel
          visibleTexts[currentParagraph] += paragraphs[currentParagraph][currentChar];
          currentChar++;
          
          // Ajouter un délai aléatoire pour un effet plus naturel
          if (Math.random() < 0.05) {
            clearInterval(typingInterval);
            setTimeout(startTyping, 300); // Pause plus longue de temps en temps
          }
        } else {
          // Passer au paragraphe suivant
          currentParagraph++;
          currentChar = 0;
          clearInterval(typingInterval);
          setTimeout(startTyping, 800); // Pause plus longue entre les paragraphes
        }
      } else if (visibleConclusion.length < conclusion.length) {
        // Taper la conclusion
        visibleConclusion += conclusion[visibleConclusion.length];
      } else {
        // Animation terminée
        clearInterval(typingInterval);
        isTyping = false;
      }
    }, 30); // Vitesse de frappe (30ms par caractère)
  }
</script>

<style>
  /* Styles pour la pluie d'emoji */
  .emoji-container {
    position: fixed;
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
  
  /* Style pour le contenu principal */
  .content-container {
    position: relative;
    z-index: 1;
  }
  
  /* Styles pour l'effet de frappe */
  .typing-paragraph {
    position: relative;
    min-height: 1.5em;
  }
  
  .typing-text::after {
    content: '|';
    display: inline-block;
    animation: cursor-blink 1s step-end infinite;
    margin-left: 2px;
    font-weight: 500;
  }
  
  @keyframes cursor-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  
  .paragraph-container {
    min-height: 100px;
    margin-bottom: 1.5rem;
  }
</style>

<div class="relative min-h-screen">
  <!-- Pluie d'emoji en arrière-plan -->
  <div class="emoji-container">
    {#each emojiElements as item}
      <span class="falling-emoji" style={item.style}>{item.emoji}</span>
    {/each}
  </div>

  <!-- Contenu de la page -->
  <div class="content-container">
    <h1 class="text-4xl font-bold text-orange-500 text-center mb-8 mt-12">
      À propos
    </h1>
    
    <div class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      {#each visibleTexts as text, i}
        <div class="paragraph-container">
          <p class="text-gray-700 text-lg leading-relaxed typing-paragraph">
            <span class={i === currentParagraph && isTyping ? "typing-text" : ""}>
              {text}
            </span>
          </p>
        </div>
      {/each}
      
      <div class="mt-8 text-center italic text-gray-500 typing-paragraph">
        <span class={currentParagraph >= paragraphs.length && isTyping ? "typing-text" : ""}>
          {visibleConclusion}
        </span>
      </div>
    </div>
  </div>
</div>