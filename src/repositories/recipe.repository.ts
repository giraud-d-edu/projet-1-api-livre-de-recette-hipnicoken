import db from "../db.ts";
import { RecipeDBO } from "../models/dbo/recipe.dbo.ts";
import { ObjectId } from "../../deps.ts";

const collection = db.collection<Omit<RecipeDBO, "_id"> & { _id?: ObjectId }>("recipes");

export const RecipeRepository = {
  async findAll(filters: any = {}) {
    return await collection.find(filters).toArray();
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

  async insert(recipe: RecipeDBO) {
    const newRecipe = {
      ...recipe,
      _id: new ObjectId(), 
      ingredients: recipe.ingredients.map((ing) => ({
        ingredientId: new ObjectId(ing.ingredientId), 
        quantity: ing.quantity,
      })),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await collection.insertOne(newRecipe);
    return { ...newRecipe, _id: newRecipe._id.toString() }; 
  },

  async update(id: string, data: Partial<RecipeDBO>) {
    try {
      const objectId = new ObjectId(id);
  
      
      const { _id, ...updateData } = data;
  
      if (updateData.ingredients) {
        updateData.ingredients = updateData.ingredients.map((ing) => ({
          ingredientId: new ObjectId(ing.ingredientId),
          quantity: ing.quantity,
        }));
      }
  
      return await collection.updateOne(
        { _id: objectId },
        { $set: updateData } 
      );
    } catch (error) {
      console.error("Erreur lors de la conversion de l'ID en ObjectId:", error);
      return null;
    }
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
