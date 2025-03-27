export const CATEGORIES = ["Entrée", "Plat", "Dessert"] as const;
export type Category = (typeof CATEGORIES)[number];

export function validateCategory(category: string): category is Category {
  return CATEGORIES.includes(category as Category);
}
