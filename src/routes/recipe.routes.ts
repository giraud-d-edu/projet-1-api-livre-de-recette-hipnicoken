import { Router } from "../../deps.ts";
import { RecipeController } from "../controllers/recipe.controller.ts";

const router = new Router();

router.get("/recipes", RecipeController.getAll);

export default router;
