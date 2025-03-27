# Recipe API Project

## 📌 Description

Ce projet est une API de gestion de recettes de cuisine, développée dans le cadre d'un exercice étudiant pour s'exercer sur la technologie Deno. L'API permet de gérer des recettes et des ingrédients, avec des fonctionnalités de **création, lecture, mise à jour et suppression (CRUD)**, ainsi que des **recherches avancées**, telles que la recherche par nom d'ingrédient, par titre de recette, ou encore par catégorie.

## 👥 Team

- **Kenza**
- **Hippolyte**
- **Nicolas**

## 🛠️ Technologies Used

- **Deno**: JavaScript and TypeScript runtime environment.
- **Oak**: HTTP framework for Deno.
- **MongoDB Atlas**: NoSQL database.
- **Zod**: Object schema validation.
- **Newman**: A command-line tool for running Postman collections, enabling automated API testing.

## 📂 Project Structure
```
projet-1-api-livre-de-recette-hipnicoken/
├── src/
│   ├── config.ts                # Configuration settings for the application.
│   ├── db.ts                    # Database connection and initialization.
│   ├── controllers/             # Contains logic for handling HTTP requests.
│   │   ├── ingredient.controller.ts  # Controller for ingredient-related operations.
│   │   ├── recipe.controller.ts      # Controller for recipe-related operations.
│   │   ├── dto/                 # Data Transfer Objects for request validation.
│   │       ├── ingredient.dto.ts     # DTO for ingredient-related requests.
│   │       ├── recipe.dto.ts         # DTO for recipe-related requests.
│   ├── models/                  # Defines the data models for the application.
│   │   ├── ingredient.model.ts       # Ingredient data model.
│   │   ├── recipe.model.ts           # Recipe data model.
│   ├── repositories/            # Handles database operations.
│   │   ├── ingredient.repository.ts  # Repository for ingredient-related database operations.
│   │   ├── recipe.repository.ts      # Repository for recipe-related database operations.
│   │   ├── dbo/                 # Database objects for mapping data.
│   │   │   ├── ingredient.dbo.ts     # Database object for ingredients.
│   │   │   ├── recipe.dbo.ts         # Database object for recipes.
│   ├── routes/                  # Defines API routes.
│   │   ├── ingredient.routes.ts      # Routes for ingredient-related endpoints.
│   │   ├── recipe.routes.ts          # Routes for recipe-related endpoints.
│   ├── services/                # Business logic and service layer.
│       ├── ingredient.service.ts    # Service for ingredient-related operations.
│       ├── recipe.service.ts        # Service for recipe-related operations.
├── deps.ts                      # External dependencies.
├── main.ts                      # Entry point of the application.
├── deno.json                    # Deno configuration file.
├── postman_collection.json      # Postman collection for API testing.
├── deno.lock                    # Lock file for dependencies.
├── README.md                    # Documentation for the project.
```
## Installation

1. **Cloner le dépôt :**

    ```bash
    git clone https://github.com/votre-repo/projet-1-api-livre-de-recette-hipnicoken.git
    cd projet-1-api-livre-de-recette-hipnicoken
    ```


2. **Installer les dépendances :**

    ```bash
    deno task install
    ```

    *(Si cette commande démarre l'application, remplacez-la par une commande appropriée pour installer les dépendances, ou précisez qu'elle démarre l'application.)*

## Utilisation

1. **Lancer le serveur :**
    deno run --allow-net --watch main.ts

    - `--allow-net`: Grants the application access to the network.
    - `--watch`: Automatically restarts the server when file changes are detected.
    ```bash
    deno run --allow-net --watch main.ts
    ```

    Le serveur sera lancé sur `http://localhost:8000`.

2. **Tester les routes avec Postman :**

    Importez le fichier [postman_collection.json] dans Postman pour tester les différentes routes de l'API.

## Routes de l'API

### Ingrédients

- **GET /ingredients** : Récupérer tous les ingrédients.
- **GET /ingredients/:id** : Récupérer un ingrédient par ID.
- **DELETE /ingredients/:id** : Supprimer un ingrédient par ID.
- **PUT /ingredients/:id** : Mettre à jour un ingrédient.
- **POST /ingredients** : Créer un nouvel ingrédient.
- **DELETE /ingredients/** : Supprimer un ingrédient par ID.

### Recettes

- **GET /recipes** : Récupérer toutes les recettes.
- **GET /recipes/:id** : Récupérer une recette par ID.
- **GET /recipes?title=...** : Rechercher une recette par titre.
- **GET /recipes?category=...** : Rechercher une recette par catégorie.
- **GET /recipes?ingredientname=...** : Rechercher une recette par nom    d'ingredient.
- **PUT /recipes/:id** : Mettre à jour une recette par ID.
- **POST /recipes** : Créer une nouvelle recette.
- **DELETE /recipes/:id** : Supprimer une recette par ID.

