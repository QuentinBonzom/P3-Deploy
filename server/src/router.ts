import express from "express";
const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

//Define ingredient routes
import ingredientActions from "./modules/ingredient/ingredientActions";

router.get("/api/ingredient", ingredientActions.browse);

// Define recipe-related routes
import recipeActions from "./modules/recipe/recipeActions";

router.get("/api/recipe/random", recipeActions.random);
router.get("/api/recipe", recipeActions.browse);
router.get("/api/recipe/:id", recipeActions.read);
router.get("/api/recipe/search/:id", recipeActions.search);
router.get("/api/recipe/category/:id", recipeActions.category);
router.get("/api/recipe/diet/:id", recipeActions.diet);
router.get("/api/recipe/time/:id", recipeActions.time);
router.get("/api/recipe/difficulty/:id", recipeActions.difficulty);
router.get("/api/accueil/category", recipeActions.accueilCategory);

// Define member-related routes
import memberActions from "./modules/user/memberActions";

router.post("/api/signin", memberActions.add);
// Method = ( post, get, patch (petit update), put(Gros update), delete)
// Module Actions (on fait appel a la methode crée dans le module actions : login)
router.post("/api/login", memberActions.login); //rajouter securité (middleware)
// router.get("api/user", userActions.browse);
// router.get("api/user/:id", userActions.read);
// router.put("api/user/:id", userActions.editAccount); //mdp, email, nom
// router.delete("api/user/:id", userActions.deleteAccount) //supression compte
// router.use("api/user/admin/:id", userActions.admin); //acces page admin
// router.put("api/user/admin/:id", userActions.adminEdit); //  modifier tout
// router.delete("api/user/admin:id", userActions.adminDelete); // suprimer tout
// router.post("api/user/admin:id", userActions.adminCreate); // Ajouter recettes

// router.post("/api/items", recipeActions.add);

/* ************************************************************************* */

export default router;
