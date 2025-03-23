
export interface Recipe {
  _id?: string; // En string car les services ne manipulent pas d'ObjectId directement
  title: string;
  description: string;
  category: "Entrée" | "Plat" | "Dessert"; // Que se passe t'il si on ajoute une nouvelle catégorie ?
  ingredients: { ingredientId: string; quantity: number }[]; // IDs sous forme de string
  instructions: string;
  createdAt?: Date;
  updatedAt?: Date;
}
