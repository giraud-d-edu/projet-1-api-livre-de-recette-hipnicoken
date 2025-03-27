# Architecture Frontend - Projet Recettes & Ingrédients

## 📁 Structure

- `routes/` : pages SvelteKit responsables de la gestion des routes et de la logique de rendu
- `lib/components/` : composants UI réutilisables
- `lib/services/` : appels API centralisés
- `lib/types/` : interfaces TypeScript
- `lib/utils/` : gestion des erreurs, incluant la journalisation et le formatage des erreurs

## 📐 Conventions

- CamelCase pour les composants (`Button.svelte`)
- kebab-case pour les routes (`/recettes/create`)
- Interfaces avec suffixe `DTO` (Data Transfer Object) pour les formulaires

## 🧩 Composants réutilisables

- `Button`: Utilisé pour les actions cliquables.
- `Input`: Permet la saisie de données utilisateur.
- `Card`: Affiche des informations regroupées dans un format visuel.

## 📄 Modèles

- `Recette`
- `Ingredient`
