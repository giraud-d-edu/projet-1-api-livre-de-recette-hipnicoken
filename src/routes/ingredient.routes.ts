import { Router } from "../deps.ts";
import { IngredientController } from "../controllers/ingredient.controller.ts";

const router = new Router();

router
  .get("/ingredients", IngredientController.getAll)
  .get("/ingredients/:id", IngredientController.getById)
  .post("/ingredients", IngredientController.create)
  .put("/ingredients", IngredientController.update)
  .delete("/ingredients", IngredientController.delete);

export default router;