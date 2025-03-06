# Projet API de Recettes de Cuisine

## 📌 Description

Ce projet est une API de gestion de recettes de cuisine, développée dans le cadre d'un exercice étudiant pour s'exercer sur la technologie Deno. L'API permet de gérer des recettes et des ingrédients, avec des fonctionnalités de **création, lecture, mise à jour et suppression (CRUD)**, ainsi que des **recherches avancées**.

## 👥 Équipe

- **Kenza**
- **Hippolyte**
- **Nicolas**

## 🛠️ Technologies Utilisées

- **Deno** : Environnement d'exécution JavaScript et TypeScript.
- **Oak** : Framework HTTP pour Deno.
- **MongoDB Atlas** : Base de données NoSQL.
- **Zod** : Validation des schémas d'objets.
- **Newman** : Exécution automatisée des tests Postman.

## 📂 Structure du Projet

projet-1-api-livre-de-recette-hipnicoken/
├── src/
│   ├── config.ts
│   ├── db.ts
│   ├── controllers/
│   │   ├── ingredient.controller.ts
│   │   ├── recipe.controller.ts
│   │   ├── dto/
│   │       ├── ingredient.dto.ts
│   │       ├── recipe.dto.ts
│   ├── models/
│   │   ├── ingredient.model.ts
│   │   ├── recipe.model.ts
│   ├── repositories/
│   │   ├── ingredient.repository.ts
│   │   ├── recipe.repository.ts
│   │   ├── dbo/
│   │   │   ├── ingredient.dbo.ts
│   │   │   ├── recipe.dbo.ts
│   ├── routes/
│   │   ├── ingredient.routes.ts
│   │   ├── recipe.routes.ts
│   ├── services/
│       ├── ingredient.service.ts
│       ├── recipe.service.ts
├── deps.ts
├── main.ts
├── deno.json
├── postman_collection.json
├── deno.lock
├── README.md

## Installation

1. **Cloner le dépôt :**

    ```bash
    git clone https://github.com/votre-repo/projet-1-api-livre-de-recette-hipnicoken.git
    cd projet-1-api-livre-de-recette-hipnicoken
    ```


2. **Installer les dépendances :**

    ```bash
    deno task start
    ```

## Utilisation

1. **Lancer le serveur :**

    ```bash
    deno main.ts
    ```

    Le serveur sera lancé sur `http://localhost:8000`.

2. **Tester les routes avec Postman :**

    Importez le fichier [postman_collection.json] dans Postman pour tester les différentes routes de l'API.

## Routes de l'API

### Ingrédients

- **GET /ingredients** : Récupérer tous les ingrédients.
- **GET /ingredients/:id** : Récupérer un ingrédient par ID.
- **GET /ingredients?name=...** : Rechercher un ingrédient par nom.
- **PUT /ingredients/:id** : Mettre à jour un ingrédient.
- **POST /ingredients** : Créer un nouvel ingrédient.
- **DELETE /ingredients/** : Supprimer un ingrédient par ID.

### Recettes

- **GET /recipes** : Récupérer toutes les recettes.
- **GET /recipes/:id** : Récupérer une recette par ID.
- **GET /recipes?title=...** : Rechercher une recette par titre.
- **GET /recipes?category=...** : Rechercher une recette par catégorie.
- **GET /recipes?ingredientName=...** : Rechercher une recette par nom    d'ingredient.
- **PUT /recipes/** : Mettre à jour une recette.
- **POST /recipes** : Créer une nouvelle recette.
- **DELETE /recipes/:id** : Supprimer une recette par ID.

