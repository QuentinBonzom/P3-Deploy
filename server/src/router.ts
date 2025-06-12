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

router.get("/api/recipe", recipeActions.browse);
router.get("/api/recipe/:id", recipeActions.read);
router.get("/api/recipe/search/:id", recipeActions.search);
router.get("/api/recipe/category/:id", recipeActions.category);
router.get("/api/recipe/diet/:id", recipeActions.diet);
router.get("/api/recipe/difficulty/:id", recipeActions.difficulty);

// router.post("/api/items", recipeActions.add);

/* ************************************************************************* */

export default router;
