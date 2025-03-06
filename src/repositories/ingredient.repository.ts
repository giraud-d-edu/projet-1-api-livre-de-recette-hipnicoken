import { db } from "../db.ts";
import { IngredientDBO } from "../models/dbo/ingredient.dbo.ts";
import { ObjectId } from "../../deps.ts";

const collection = db.collection<IngredientDBO>("ingredients");

export const IngredientRepository = {
  async findAll() {
    try {
      return await collection.find().toArray();
    } catch (error) {
      console.error("❌ Erreur lors de la récupération de tous les ingrédients :", error);
      throw new Error("Erreur interne du serveur lors de la récupération des ingrédients.");
    }
  },

  async findById(id: string) {
    try {
      const objectId = new ObjectId(id);
      const ingredient = await collection.findOne({ _id: objectId });
      if (!ingredient) throw new Error("Ingrédient non trouvé.");
      return ingredient;
    } catch (error) {
      console.error(`❌ Erreur lors de la recherche de l'ingrédient avec l'ID ${id} :`, error);
      throw new Error("ID invalide ou ingrédient introuvable.");
    }
  },

  async findByName(name: string) {
    try {
      const ingredient = await collection.findOne({ name });
      return ingredient;
    } catch (error) {
      console.error(`❌ Erreur lors de la recherche de l'ingrédient avec le nom ${name} :`, error);
      throw new Error("Erreur interne du serveur lors de la recherche par nom.");
    }
  },

  async insert(ingredient: Omit<IngredientDBO, "_id" | "createdAt" | "updatedAt">) {
    try {
      const existing = await this.findByName(ingredient.name);
      if (existing) throw new Error("Cet ingrédient existe déjà.");

      const newIngredient: IngredientDBO = {
        ...ingredient,
        _id: new ObjectId(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await collection.insertOne(newIngredient);
      return newIngredient;
    } catch (error) {
      console.error(`❌ Erreur lors de l'insertion de l'ingrédient ${ingredient.name} :`, error);
      throw new Error("Erreur interne du serveur lors de la création de l'ingrédient.");
    }
  },

  async delete(id: string) {
    try {
      const objectId = new ObjectId(id);
      const deleted = await collection.deleteOne({ _id: objectId });
      if (!deleted) throw new Error("Aucun ingrédient supprimé, ID introuvable.");
      return { message: "Ingrédient supprimé avec succès." };
    } catch (error) {
      console.error(`❌ Erreur lors de la suppression de l'ingrédient avec l'ID ${id} :`, error);
      throw new Error("Erreur interne du serveur lors de la suppression de l'ingrédient.");
    }
  },
};
