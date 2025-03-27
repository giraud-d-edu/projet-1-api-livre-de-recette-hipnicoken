<script>
  import { page } from '$app/stores';
</script>

<nav>
  <div class="nav-container">
    <!-- Logo -->
    <a href="/" class="logo">
      <img src="/logo.png" alt="Logo" />
    </a>

    <!-- Navigation Links -->
    <ul>
      <li class:active={$page.url.pathname === '/'}>
        <a href="/">Accueil</a>
      </li>
      <li class:active={$page.url.pathname === '/about'}>
        <a href="/about">À propos</a>
      </li>
      <li class:active={$page.url.pathname === '/recettes'}>
        <a href="/recettes">Recettes</a>
      </li>
      <li class:active={$page.url.pathname === '/ingredients'}>
        <a href="/ingredients">Ingrédients</a>
      </li>
    </ul>
  </div>
</nav>

<main>
  <slot />
</main>

<style>
  nav {
    background-color:#dac89e;
    padding: 1rem 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  .nav-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
  }

  .logo img {
    height: 50px;
    width: auto;
  }

  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 2rem;
  }

  li {
    margin: 0;
  }

  a {
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    color: white;
    transition: color 0.3s ease;
  }

  a:hover {
    color: var(--color-orange);
  }

  .active a {
    color: var(--color-orange);
    border-bottom: 2px solid var(--color-orange);
    padding-bottom: 0.2rem;
  }

  body {
    background-color: var(--color-beige-cream);
  }
</style>    
