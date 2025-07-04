import express from "express";
import security from "./modules/middleware/checkToken";
import securityAdmin from "./modules/middleware/checkTokenAdmin";
const router = express.Router();
import categoryActions from "./modules/category/categoryActions";
import dietActions from "./modules/diet/dietActions";
import ingredientActions from "./modules/ingredient/ingredientActions";
import recipeActions from "./modules/recipe/recipeActions";
import memberActions from "./modules/user/memberActions";
import ustensilActions from "./modules/ustensil/ustensilActions";

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Mur Middleware Securité-------------------------

router.use("/api/member", security.checkToken); // middleware pour les routes membres
router.use("/api/admin", securityAdmin.checkTokenAdmin); // middleware pour les routes admin

import unityActions from "./modules/unity/unityActions";

router.get("/api/unity", unityActions.browse);

import categoryActions from "./modules/category/categoryActions";

router.get("/api/diet", dietActions.browse);
router.get("/api/category", categoryActions.browse);
router.get("/api/recipe/random", recipeActions.random);
router.get("/api/recipe", recipeActions.browse);
router.get("/api/recipe/detail/:id", recipeActions.read);
router.get("/api/recipe/search/:id", recipeActions.search);
router.get("/api/recipe/category/:id", recipeActions.category);
router.get("/api/recipe/diet/:id", recipeActions.diet);
router.get("/api/recipe/time/:id", recipeActions.time);
router.get("/api/recipe/difficulty/:id", recipeActions.difficulty);
router.get("/api/accueil/category", recipeActions.accueilCategory);

//ingredient + ustencils

router.get("/api/ingredient", ingredientActions.browse);
router.get("/api/ingredients", ingredientActions.browse);
router.get("/api/ingredients/by-type", ingredientActions.browseWithType);
router.get("/api/recipe/by-ingredients", recipeActions.byIngredients);
router.get("/api/ingredient/recipe/:id", ingredientActions.recipeIngredient); //tout les ingrediends, quantité et unite pour une recette(id)
router.get("/api/ustensil/recipe/:id", ustensilActions.recipeUstensil); //tout les ustensiles pour une recette(id)

//rate + comment + favorite

router.post("/api/rate/recipe", recipeActions.addRate); //pour ajouter une note sur une recette
router.get("/api/rate/recipe/:id", recipeActions.rate); //pour afficher la note et les commentaires d'une recette
router.post("/api/comment/recipe", recipeActions.addComment); //pour ajouter un commentaire sur une recette
router.post("/api/favorite/recipe", recipeActions.updateFavorite); //pour ajouter une recette aux favoris")

// CRUD pour modifier recipe

router.get("/api/admin/member", security.checkToken, memberActions.browse);
router.get("/api/member", security.checkToken, memberActions.checkId); // token Check
router.patch("/api/member", security.checkToken, memberActions.editMember); // modification du profile membre
router.get("/api/member/:id", security.checkToken, memberActions.favorite); // liste des recettes favorites d'un membre
router.patch("/api/member/:id", memberActions.UpdateAdminStatus); // Change le status d'un membre en (admin:true ou admin:false)
// router.get("/api/member/:id", security.checkToken, memberActions.comments); // liste des commentaires d'un membre
// router.get("/api/member/:id", security.checkToken, memberActions.rated); // liste des recettes notées d'un membre

router.delete("/api/recipe/:id", recipeActions.deleteRecipe);
router.post("/api/recipe", recipeActions.add);

//Authentification

router.post("/api/signup", memberActions.add, memberActions.login); // le "Add" permet de rajouter le compte et l'action "login" de ce log directement avec un token.
router.post("/api/login", memberActions.login); //l'action "login" permet de ce log directement avec un token si membre existant.

//Zone Membre ----------------------

router.get("/api/member", memberActions.checkId); // token Check
router.patch("/api/member", memberActions.editMember); // modification du profile membre
router.get("/api/member/:id/profile", memberActions.readMemberProfile); // pour afficher le profile d'un membre
router.get("/api/member/:id/favorite", memberActions.readFavorite); // liste des recettes favorites d'un membre
router.get("/api/member/:id/comments", memberActions.readCommented); //pour afficher les commentaires d'une recette
router.delete("/api/member/:id", memberActions.deleteAccount); //supression compte

//Zone Admin ----------------------

router.get("/api/admin/member", memberActions.browse);
router.get("/api/admin/recipes", recipeActions.listRecipesAdmin);
router.delete("/api/admin/:id", memberActions.deleteMemberAsAdmin);

// router.get("/api/member/:id", security.checkToken, memberActions.rated); // liste des recettes notées d'un membre
// router.get("/api/member/:id", security.checkToken, memberActions.comments); // liste des commentaires d'un membre

// Method = ( post, get, patch (petit update), put(Gros update), delete)

// Module Actions (on fait appel a la methode crée dans le module actions : login)
// router.get("api/user/:id", userActions.read);
// router.put("api/user/:id", userActions.editAccount); //mdp, email, nom
// router.use("api/user/admin/:id", userActions.admin); //acces page admin
// router.put("api/user/admin/:id", userActions.adminEdit); //  modifier tout
// router.delete("api/user/admin:id", userActions.adminDelete); // suprimer tout
// router.post("api/user/admin:id", userActions.adminCreate); // Ajouter recettes

/* ************************************************************************* */

// Define list-related routes
import listActions from "./modules/list/listActions";

router.post("/api/list/:id", security.checkToken, listActions.addList); //ajouter une liste

router.get("/api/list/:id", security.checkToken, listActions.memberList); //recuperer les listes d'un membre

export default router;
