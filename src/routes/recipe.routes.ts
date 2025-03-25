import { Router } from "../deps.ts";
import { RecipeController } from "../controllers/recipe.controller.ts";

const router = new Router();

router
.get("/recipes", RecipeController.getAll)
.get("/recipes/:id", RecipeController.getById)
.post("/recipes", RecipeController.create)
.put("/recipes", RecipeController.update)
.delete("/recipes", RecipeController.delete);

export default router;
