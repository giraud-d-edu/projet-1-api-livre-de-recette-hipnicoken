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
- **Dotenv** : Gestion des variables d'environnement.
- **Newman** : Exécution automatisée des tests Postman.

## 📂 Structure du Projet

projet-1-api-livre-de-recette-hipnicoken/
├── src/
│   ├── config.ts
│   ├── db.ts
│   ├── controllers/
│   │   ├── ingredient.controller.ts
│   │   ├── recipe.controller.ts
│   ├── models/
│   │   ├── dbo/
│   │   │   ├── ingredient.dbo.ts
│   │   │   ├── recipe.dbo.ts
│   │   ├── dto/
│   │       ├── ingredient.dto.ts
│   │       ├── recipe.dto.ts
│   ├── repositories/
│   │   ├── ingredient.repository.ts
│   │   ├── recipe.repository.ts
│   ├── routes/
│   │   ├── ingredient.routes.ts
│   │   ├── recipe.routes.ts
│   ├── services/
│       ├── ingredient.service.ts
│       ├── recipe.service.ts
├── tests/
│   ├── ingredient.test.ts
│   ├── recipe.test.ts
├── deps.ts
├── main.ts
├── deno.json
├── deno.lock
├── README.md

## Installation

1. **Cloner le dépôt :**

    ```bash
    git clone https://github.com/votre-repo/projet-1-api-livre-de-recette-hipnicoken.git
    cd projet-1-api-livre-de-recette-hipnicoken
    ```

2. **Configurer les variables d'environnement :**

    Créez un fichier `.env` à la racine du projet et ajoutez-y les variables suivantes :

    ```env
    MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/recettes_db?retryWrites=true&w=majority&appName=projetrecettes
    MONGO_DB_NAME=recettes_db
    ```

3. **Installer les dépendances :**

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

    Importez le fichier [recipes.json](http://_vscodecontentref_/21) dans Postman pour tester les différentes routes de l'API.

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
- **POST /recipes** : Créer une nouvelle recette.
- **DELETE /recipes/:id** : Supprimer une recette par ID.
- **GET /recipes?title=...** : Rechercher une recette par titre.
- **GET /recipes?category=...** : Rechercher une recette par catégorie.
- **GET /recipes?ingredientName=...** : Rechercher une recette par ingrédient (nom).
- **PUT /recipes/** : Mettre à jour une recette.