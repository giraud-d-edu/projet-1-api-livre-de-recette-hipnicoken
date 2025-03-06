import { db } from "../db.ts";
import { IngredientDBO } from "../models/dbo/ingredient.dbo.ts";
import { ObjectId } from "../../deps.ts";

const collection = db.collection<IngredientDBO>("ingredients");

export const IngredientRepository = {
  async findAll() {
    return await collection.find().toArray();
  },

  async findById(id: string) {
    try {
      const objectId = new ObjectId(id);
      return await collection.findOne({ _id: objectId });
    } catch (error) {
      console.error("Erreur lors de la conversion de l'ID en ObjectId:", error);
      return null;
    }
  },

  async findByName(name: string) {
    return await collection.findOne({ name });
  },

  async insert(ingredient: Omit<IngredientDBO, "_id" | "createdAt" | "updatedAt">) {
    // ✅ Ajout automatique de `_id`, `createdAt`, et `updatedAt`
    const newIngredient: IngredientDBO = {
      ...ingredient,
      _id: new ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await collection.insertOne(newIngredient);
    return newIngredient;
  },

  async delete(id: string) {
    try {
      const objectId = new ObjectId(id);
      return await collection.deleteOne({ _id: objectId });
    } catch (error) {
      console.error("Erreur lors de la conversion de l'ID en ObjectId:", error);
      return null;
    }
  },
};
