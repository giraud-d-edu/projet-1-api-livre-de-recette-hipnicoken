const API_BASE = "http://localhost:8000";

// 🔹 RECETTES

export async function fetchRecettes() {
  const response = await fetch(`${API_BASE}/recipes`);
  if (!response.ok) throw new Error("Erreur lors du chargement des recettes");
  return await response.json();
}

export async function fetchRecetteById(id) {
  const response = await fetch(`${API_BASE}/recipes?id=${id}`);
  if (!response.ok) throw new Error("Recette non trouvée");
  const data = await response.json();
  return Array.isArray(data) ? data[0] : data;
}

export async function fetchRecetteByIngredientName(ingredients) {
  const response = await fetch(
    `${API_BASE}/recipes?ingredientName=${ingredients}`
  );
  if (!response.ok) throw new Error("Recette non trouvée");
  const data = await response.json();
  return Array.isArray(data) ? data[0] : data;
}

export async function createRecette(data) {
  const response = await fetch(`${API_BASE}/recipes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Erreur lors de la création de la recette");
  return await response.json();
}

export async function updateRecette(id, data) {
  const response = await fetch(`${API_BASE}/recipes?id=${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok)
    throw new Error("Erreur lors de la mise à jour de la recette");
  return await response.json();
}

export async function deleteRecette(id) {
  const response = await fetch(`${API_BASE}/recipes?id=${id}`, {
    method: "DELETE",
  });
  if (!response.ok)
    throw new Error("Erreur lors de la suppression de la recette");
  return await response.json();
}
// 🔹 INGRÉDIENTS

export async function fetchIngredients() {
  const response = await fetch(`${API_BASE}/ingredients`);
  if (!response.ok)
    throw new Error("Erreur lors du chargement des ingrédients");
  return await response.json();
}

export async function fetchIngredientById(id) {
  const response = await fetch(`${API_BASE}/ingredients/${id}`);
  if (!response.ok) throw new Error("Ingrédient non trouvé");
  return await response.json();
}

export async function createIngredient(data) {
  const response = await fetch(`${API_BASE}/ingredients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok)
    throw new Error("Erreur lors de la création de l’ingrédient");
  return await response.json();
}
export async function updateIngredient(id, data) {
  const response = await fetch(`${API_BASE}/ingredients?id=${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok)
    throw new Error("Erreur lors de la mise à jour de l’ingrédient");
  return await response.json();
}

export async function deleteIngredient(id) {
  const response = await fetch(`${API_BASE}/ingredients?id=${id}`, {
    method: "DELETE",
  });
  if (!response.ok)
    throw new Error("Erreur lors de la suppression de l’ingrédient");
  return await response.json();
}
