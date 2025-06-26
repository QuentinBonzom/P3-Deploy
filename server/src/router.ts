import express from "express";
import security from "./modules/middleware/security";
const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define recipe-related routes
import recipeActions from "./modules/recipe/recipeActions";

router.get("/api/recipe/random", recipeActions.random);
router.get("/api/recipe", recipeActions.browse);
router.get("/api/recipe/detail/:id", recipeActions.read);
router.get("/api/recipe/search/:id", recipeActions.search);
router.get("/api/recipe/category/:id", recipeActions.category);
router.get("/api/recipe/diet/:id", recipeActions.diet);
router.get("/api/recipe/time/:id", recipeActions.time);
router.get("/api/recipe/difficulty/:id", recipeActions.difficulty);
router.get("/api/accueil/category", recipeActions.accueilCategory);

router.get("/api/ingredients", ingredientActions.browse);
router.get("/api/recipe/by-ingredients", recipeActions.byIngredients);
router.get("/api/ingredients/by-type", ingredientActions.browseWithType);
router.get("/api/rate/recipe/:id", recipeActions.rate); //pour afficher la note et les commentaires d'une recette
router.post("/api/comment/recipe", recipeActions.addComment); //pour ajouter un commentaire sur une recette
router.post("/api/favorite/recipe", recipeActions.addFavorite); //pour ajouter une recette aux favoris")
router.post("/api/rate/recipe", recipeActions.addRate); //pour ajouter une note sur une recette

// Define member-related routes
import memberActions from "./modules/user/memberActions";

router.get("/api/member", security.checkToken, memberActions.checkId);
router.post("/api/signin", memberActions.add, memberActions.login); // le "Add" permet de rajouter le compte et l'action "login" de ce log directement avec un token.
router.post("/api/login", memberActions.login); //l'action "login" permet de ce log directement avec un token si membre existant.  -----rajouter securité (middleware) ?-----
// Method = ( post, get, patch (petit update), put(Gros update), delete)
// Module Actions (on fait appel a la methode crée dans le module actions : login)
// router.get("api/user/:id", userActions.read);
// router.put("api/user/:id", userActions.editAccount); //mdp, email, nom
router.delete("/api/member/:id", memberActions.deleteAccount); //supression compte
// router.use("api/user/admin/:id", userActions.admin); //acces page admin
// router.put("api/user/admin/:id", userActions.adminEdit); //  modifier tout
// router.delete("api/user/admin:id", userActions.adminDelete); // suprimer tout
// router.post("api/user/admin:id", userActions.adminCreate); // Ajouter recettes

// Define ingredient-related routes

import ingredientActions from "./modules/ingredient/ingredientActions";

router.get("/api/ingredient", ingredientActions.browse);
router.get("/api/ingredient/recipe/:id", ingredientActions.recipeIngredient); //tout les ingrediends, quantité et unite pour une recette(id)

// Define ustensil-related routes
import ustensilActions from "./modules/ustensil/ustensilActions";

router.get("/api/ustensil/recipe/:id", ustensilActions.recipeUstensil); //tout les ustensiles pour une recette(id)

/* ************************************************************************* */

export default router;
