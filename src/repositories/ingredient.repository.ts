import { db } from "../db.ts";
import { IngredientDBO } from "./dbo/ingredient.dbo.ts"; 
import { ObjectId } from "../../deps.ts";

const collection = db.collection<IngredientDBO>("ingredients");

export const IngredientRepository = {
  async findAll() {
    try {
      return await collection.find().toArray();
    } catch (error) {
      console.error("Erreur lors de la récupération des ingrédients :", error);
      throw new Error("Erreur interne lors de la récupération des ingrédients.");
    }
  },

  async findById(id: string) {
    try {
        const objectId = new ObjectId(id);
        const ingredient = await collection.findOne({ _id: objectId });
        
        if (!ingredient) {
            console.warn(`⚠️ Aucun ingrédient trouvé avec l'ID ${id}`);
            return null; // Retourne `null` si aucun ingrédient trouvé
        }

        return ingredient;
    } catch (error) {
        console.error(`❌ Erreur lors de la recherche de l'ingrédient avec l'ID ${id} :`, error);
        return null; // Retourne `null` en cas d'erreur au lieu de tous les ingrédients
    }
},

  async findByName(name: string) {
    try {
      return await collection.findOne({ name });
    } catch (error) {
      console.error(`Erreur lors de la recherche de l'ingrédient ${name} :`, error);
      throw new Error("Erreur interne lors de la recherche par nom.");
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
      console.error(`Erreur lors de l'insertion de l'ingrédient ${ingredient.name} :`, error);
      throw new Error("Erreur interne lors de la création de l'ingrédient.");
    }
  },

  async delete(id: string) {
    try {
      const objectId = new ObjectId(id);
      return await collection.deleteOne({ _id: objectId });
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'ingrédient ${id} :`, error);
      throw new Error("Erreur interne lors de la suppression.");
    }
  },
};
