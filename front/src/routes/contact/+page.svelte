<script>
    let nom = '';
    let email = '';
    let message = '';
    let erreurs = { nom: '', email: '', message: '' };
    let success = false;
  
    const validerFormulaire = async () => {
      erreurs = { nom: '', email: '', message: '' };
      success = false;
  
      if (!nom.trim()) erreurs.nom = 'Le nom est requis.';
      if (!email.trim()) {
        erreurs.email = 'L\'email est requis.';
      } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        erreurs.email = 'Email invalide.';
      }
      if (!message.trim()) erreurs.message = 'Le message est requis.';
  
      if (erreurs.nom || erreurs.email || erreurs.message) return;
  
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nom, email, message })
        });
  
        if (res.ok) {
          success = true;
          nom = '';
          email = '';
          message = '';
        } else {
          alert("Erreur lors de l’envoi.");
        }
      } catch (err) {
        console.error("❌ Erreur fetch :", err);
        alert("Erreur de communication avec l'API.");
      }
    };
  </script>
  
  <h1>Contact</h1>
  
  {#if success}
    <p style="color: green;">✅ Message envoyé avec succès !</p>
  {/if}
  
  <form on:submit|preventDefault={validerFormulaire}>
    <div>
      <label>Nom :</label><br />
      <input type="text" bind:value={nom} />
      {#if erreurs.nom}
        <p style="color: red;">{erreurs.nom}</p>
      {/if}
    </div>
  
    <div>
      <label>Email :</label><br />
      <input type="email" bind:value={email} />
      {#if erreurs.email}
        <p style="color: red;">{erreurs.email}</p>
      {/if}
    </div>
  
    <div>
      <label>Message :</label><br />
      <textarea bind:value={message}></textarea>
      {#if erreurs.message}
        <p style="color: red;">{erreurs.message}</p>
      {/if}
    </div>
  
    <button type="submit">Envoyer</button>
  </form>
  