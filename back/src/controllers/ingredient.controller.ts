import { IngredientService } from "../services/ingredient.service.ts";
import { IngredientSchema } from "./dto/ingredient.dto.ts"; 
import { Context } from "../deps.ts";

export const IngredientController = {
  async getAll(ctx: Context) {
    try {
      ctx.response.body = await IngredientService.getAll();
    } catch (error) {
      console.error("Erreur lors de la récupération des ingrédients :", error);
      ctx.response.status = 500;
      ctx.response.body = { error: "Erreur interne du serveur", details: (error as Error).message };
    }
  },

  async getById(ctx: Context) {
    const id = ctx.params.id; // ✅ Récupérer l'ID depuis l'URL dynamique "/ingredients/:id"
    
    if (!id) {
        ctx.response.status = 400;
        ctx.response.body = { error: "ID requis" };
        return;
    }

    try {
        const ingredient = await IngredientService.getById(id);
        if (!ingredient) {
            ctx.response.status = 404;
            ctx.response.body = { error: "Ingrédient non trouvé." };
            return;
        }

        ctx.response.body = ingredient;
    } catch (error) {
        console.error(`❌ Erreur lors de la récupération de l'ingrédient avec ID ${id} :`, error);
        ctx.response.status = 400;
        ctx.response.body = { error: "ID invalide." };
    }
},


  async create(ctx: Context) {
    try {
      const body = await ctx.request.body.json();
      const parsed = IngredientSchema.safeParse(body);
      if (!parsed.success) {
        ctx.response.status = 400;
        ctx.response.body = parsed.error;
        return;
      }

      const ingredient = await IngredientService.create(parsed.data.name);
      ctx.response.status = 201; 
      ctx.response.body = ingredient;
    } catch (error) {
      console.error("Erreur lors de la création de l'ingrédient :", error);
      ctx.response.status = 500;
      ctx.response.body = { error: "Erreur interne du serveur", details: (error as Error).message };
    }
  },

  async delete(ctx: Context) {
    try {
      const id = ctx.request.url.searchParams.get("id");
      if (!id) {
        ctx.response.status = 400;
        ctx.response.body = { error: "ID requis" };
        return;
      }

      // Vérifier si l'ingrédient existe avant suppression
      const ingredient = await IngredientService.getById(id);
      if (!ingredient) {
        ctx.response.status = 404;
        ctx.response.body = { error: "Ingrédient non trouvé." };
        return;
      }

      const isUsed = await IngredientService.isIngredientUsed(id);
      if (isUsed) {
        ctx.response.status = 409;
        ctx.response.body = { error: "Impossible de supprimer cet ingrédient, il est utilisé dans des recettes." };
        return;
      }

      await IngredientService.delete(id);
      ctx.response.body = { message: "Ingrédient supprimé avec succès." };
    } catch (error) {
      console.error("Erreur lors de la suppression de l'ingrédient :", error);
      ctx.response.status = 500;
      ctx.response.body = { error: "Erreur interne du serveur", details: (error as Error).message };
    }
  },
  async update(ctx: Context) {
    const id = ctx.request.url.searchParams.get("id");
    if (!id) {
      ctx.response.status = 400;
      ctx.response.body = { error: "ID requis" };
      return;
    }
  
    try {
      const body = await ctx.request.body.json();
      const parsed = IngredientSchema.safeParse(body);
  
      if (!parsed.success) {
        ctx.response.status = 400;
        ctx.response.body = parsed.error;
        return;
      }
  
      const updated = await IngredientService.update(id, parsed.data.name);
      if (!updated) {
        ctx.response.status = 404;
        ctx.response.body = { error: "Ingrédient non trouvé." };
        return;
      }
  
      ctx.response.body = { message: "Ingrédient mis à jour." };
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      ctx.response.status = 500;
      ctx.response.body = { error: "Erreur interne", details: (error as Error).message };
    }
  },
};
