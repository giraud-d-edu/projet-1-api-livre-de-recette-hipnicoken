import { db } from "../db.ts";
import { RecipeDBO } from "./dbo/recipe.dbo.ts";
import { ObjectId } from "../deps.ts";

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

  async findByTitle(title: string) {
    return await collection.findOne({ title });
  },

  async findByCategory(category: string) {
    // Retourne toutes les recettes dont la catégorie correspond
    return await collection.find({ category }).toArray();
  },

  async findByIngredient(ingredientId: string) {
    try {
        const objectId = new ObjectId(ingredientId);
        return await collection.find({ ingredients: { $elemMatch: { ingredientId: objectId } } }).toArray();
    } catch (error) {
        console.error(`❌ Erreur lors de la recherche de recettes avec l'ID ingrédient ${ingredientId} :`, error);
        return [];
    }
  },
  

  async insert(recipe: Omit<RecipeDBO, "_id" | "createdAt" | "updatedAt">) {
    const newRecipe: RecipeDBO = {
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
// la désormais c'est le repository qui gère le tout et rien dans le service
  async update(id: string, data: Partial<Recipe>) {
    try {
      const objectId = new ObjectId(id);
      const { _id, createdAt, updatedAt, ...safeData } = data;
  
      const updateData: any = {
        ...safeData,
        updatedAt: new Date(), // le repository s’en occupe
      };
  
      if (safeData.ingredients) {
        updateData.ingredients = safeData.ingredients.map((ing) => ({
          ingredientId: new ObjectId(ing.ingredientId),
          quantity: Number(ing.quantity),
        }));
      }
  
      const result = await collection.updateOne(
        { _id: objectId },
        { $set: updateData }
      );
      return result;
    } catch (error) {
      console.error("Erreur update():", error);
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
