import { Application } from "./deps.ts";
import recipeRoutes from "./src/routes/recipe.routes.ts";

const app = new Application();
app.use(recipeRoutes.routes());

console.log("🚀 Serveur lancé sur http://localhost:8000");
await app.listen({ port: 8000 });
