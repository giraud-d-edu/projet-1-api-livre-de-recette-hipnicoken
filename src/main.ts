import { Application } from "./deps.ts";
import { config } from "./config.ts";
import recipeRoutes from "./routes/recipe.routes.ts";
import ingredientRoutes from "./routes/ingredient.routes.ts"; 
import { db } from "./db.ts"; 

const app = new Application();
// 📌 Vérification de la connexion MongoDB avant de démarrer le serveur
(async () => {
  try {
    console.log("🔄 Connexion à MongoDB en cours...");
    const collections = await db.listCollections().toArray();
    console.log("✅ Connexion réussie à MongoDB.");
    console.log("📂 Collections disponibles :", collections.map(c => c.name));
  } catch (error) {
    console.error("❌ Impossible de se connecter à MongoDB :", error);
    Deno.exit(1); // Arrêter le serveur en cas d'échec
  }
})();

// 📌 Middleware pour log des requêtes HTTP
app.use(async (ctx, next) => {
  console.log(`🔹 ${ctx.request.method} ${ctx.request.url}`);
  await next();
});

// 📌 Middleware pour gérer les erreurs globales
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error("❌ Erreur détectée :", err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Erreur interne du serveur" };
  }
});
app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  if (ctx.request.method === "OPTIONS") {
    ctx.response.status = 204;
    return;
  }

  await next();
});


// 📌 Utilisation des routes
app.use(recipeRoutes.routes());
app.use(recipeRoutes.allowedMethods());

app.use(ingredientRoutes.routes()); // Ajout des routes pour ingrédients
app.use(ingredientRoutes.allowedMethods());

console.log(`🚀 Serveur lancé sur http://localhost:8000`);
await app.listen({ port: 8000 });
