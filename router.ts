import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "./controllers/recipe.controller.ts";
import {
  getIngredients,
  getIngredient,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} from "./controllers/ingredient.controller.ts";

const router = new Router();

router

    // route recipes
  .get("/recipes", getRecipes)
  .get("/recipes/:id", getRecipe)
  .post("/recipes", createRecipe)
  .put("/recipes/:id", updateRecipe)
  .delete("/recipes/:id", deleteRecipe)


  // route ingredients
  .get("/ingredients", getIngredients)
  .get("/ingredients/:id", getIngredient)
  .post("/ingredients", createIngredient)
  .put("/ingredients/:id", updateIngredient)
  .delete("/ingredients/:id", deleteIngredient);

export default router;