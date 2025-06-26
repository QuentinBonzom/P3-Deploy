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

// Define member-related routes
import memberActions from "./modules/user/memberActions";

router.get("/api/member", security.checkToken, memberActions.checkId);
router.patch("/api/member", security.checkToken, memberActions.editMember);
router.get("/api/member/:id", security.checkToken, memberActions.readFavorite); // liste des recettes favorites d'un membre
router.delete(
  "/api/member/:id",
  security.checkToken,
  memberActions.deleteAccount,
); //supression compte
router.post("/api/signin", memberActions.add, memberActions.login); // le "Add" permet de rajouter le compte et l'action "login" de ce log directement avec un token.
router.post("/api/login", memberActions.login); //l'action "login" permet de ce log directement avec un token si membre existant.  -----rajouter securité (middleware) ?-----
// Method = ( post, get, patch (petit update), put(Gros update), delete)
// Module Actions (on fait appel a la methode crée dans le module actions : login)
// router.get("api/user/:id", userActions.read);
// router.put("api/user/:id", userActions.editAccount); //mdp, email, nom
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
