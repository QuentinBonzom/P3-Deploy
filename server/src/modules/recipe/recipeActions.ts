import type { RequestHandler } from "express";

import ingredientsRepository from "../ingredient/ingredientsRepository";
// Import access to data
import recipeRepository from "./recipeRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const recipies = await recipeRepository.readAll();

    // Respond with the items in JSON format
    res.json(recipies);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const recipiesId = Number(req.params.id);
    const recipe = await recipeRepository.read(recipiesId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (recipe == null) {
      res.sendStatus(404);
    } else {
      res.json(recipe);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// // The A of BREAD - Add (Create) operation
// const add: RequestHandler = async (req, res, next) => {
//   try {
//     // Extract the item data from the request body
//     const newItem = {
//       title: req.body.title,
//       user_id: req.body.user_id,
//     };

//     // Create the item
//     const insertId = await itemRepository.create(newItem);

// Respond with HTTP 201 (Created) and the ID of the newly inserted item
//     res.status(201).json({ insertId });
//   } catch (err) {
//     // Pass any errors to the error-handling middleware
//     next(err);
//   }
// };

const search: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const searchWord = String(req.params.id);
    const recipies = await recipeRepository.search(searchWord);

    // Respond with the items in JSON format
    res.json(recipies);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const category: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const choosedCategory = String(req.params.id);
    const recipies = await recipeRepository.category(choosedCategory);

    // Respond with the items in JSON format
    res.json(recipies);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const diet: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const choosedDiet = String(req.params.id);
    const recipies = await recipeRepository.diet(choosedDiet);

    // Respond with the items in JSON format
    res.json(recipies);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const difficulty: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const choosedDifficulty = String(req.params.id);
    const recipies = await recipeRepository.difficulty(choosedDifficulty);

    // Respond with the items in JSON format
    res.json(recipies);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const time: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const choosedTime = String(req.params.id);
    const recipies = await recipeRepository.time(choosedTime);

    // Respond with the items in JSON format
    res.json(recipies);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const random: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items

    const recipies = await recipeRepository.random();
    // Respond with the items in JSON format
    res.json(recipies);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const accueilCategory: RequestHandler = async (req, res, next) => {
  try {
    const recipies = await recipeRepository.accueilCategory();
    // Respond  in JSON format
    res.json(recipies);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};


const listRecipesAdmin: RequestHandler = async (req, res, next) => {
  try {
    const recipes = await recipeRepository.listRecipes();

    res.json(recipes); // renvoie un tableau de noms
  } catch (err) {


const byIngredients: RequestHandler = async (req, res, next) => {
  try {
    const ings = req.query.ings as string;
    if (!ings) {
      res.json([]);
      return;
    }
    const ingredientsArray = ings.split(",").map(Number);
    const recipies = await recipeRepository.byIngredients(ingredientsArray);
    res.json(recipies);
  } catch (err) {

const rate: RequestHandler = async (req, res, next) => {
  try {
    const recipeId = Number(req.params.id);
    const note = await recipeRepository.note(recipeId);
    const comments = await recipeRepository.comment(recipeId);
    // Respond  in JSON format
    res.json({
      rate: note,
      comments: comments.map((comment) => ({
        text: comment.comment,
        member: comment.name,
      })),
    });
  } catch (err) {
    // Pass any errors to the error-handling middleware

    next(err);
  }
};


const deleteRecipe: RequestHandler = async (req, res, next) => {
  try {
    const recipeId = Number.parseInt(req.params.id);

    const deleted = await recipeRepository.deleteRecipe(recipeId);

    if (!deleted) {
      res.status(404).json({ message: "Recette introuvable" });
      return;
    }

    res.status(200).json({ message: "Recette supprimé avec succès" });
  } catch (err) {

const addComment: RequestHandler = async (req, res, next) => {
  try {
    const recipeId = Number(req.body.recipeId);
    const userId = Number(req.body.userId);
    const commentText = String(req.body.text);
    //verifier si le combo user/recipe existe deja
    const existingCombo = await recipeRepository.checkCombo(recipeId, userId);
    if (existingCombo) {
      // si le combo exist update comment
      await recipeRepository.updateComment(recipeId, userId, commentText);
      // Respond with a success message
      res.json({ message: "Comment updated successfully" });
      return;
    }
    // sinon creer combo avec comment si les variables existes
    if (!recipeId || !userId || !commentText) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    // creer combo et comment
    const comment = await recipeRepository.addComment(
      recipeId,
      userId,
      commentText,
    );
    // Respond  in JSON format
    res.json(comment);
  } catch (err) {
    // Pass any errors to the error-handling middleware

    next(err);
  }
};


const add: RequestHandler = async (req, res, next) => {
  try {
    const recipe = req.body.recipe;
    const ingredientDetails = req.body.ingredient || [];

    const newRecipeId = await recipeRepository.add(recipe, ingredientDetails);

    res.status(201).json({ id: newRecipeId });
  } catch (err) {
    console.error("Erreur lors de l'ajout de la recette :", err);

const addFavorite: RequestHandler = async (req, res, next) => {
  try {
    const recipeId = Number(req.body.recipeId);
    const userId = Number(req.body.userId);

    const existingCombo = await recipeRepository.checkCombo(recipeId, userId);
    if (existingCombo) {
      await recipeRepository.updateFavorite(recipeId, userId);
      // Respond with a success message
      res.json({ message: "favorite updated successfully" });
      return;
    }
    // If it doesn't exist, add the favorite
    const favorite = await recipeRepository.addFavorite(recipeId, userId);
    // Respond  in JSON format
    res.json(favorite);
  } catch (err) {
    next(err);
  }
};

const addRate: RequestHandler = async (req, res, next) => {
  try {
    const recipeId = Number(req.body.recipeId);
    const userId = Number(req.body.userId);
    const rate = Number(req.body.rate);
    //verifier si le combo user/recipe existe deja
    const existingCombo = await recipeRepository.checkCombo(recipeId, userId);
    if (existingCombo) {
      // si le combo exist update rate
      await recipeRepository.updateRate(recipeId, userId, rate);
      // Respond with a success message
      res.json({ message: "Rate updated successfully" });
      return;
    }
    // sinon creer combo avec rate si les variables existes
    if (!recipeId || !userId || !rate) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    // creer combo et rate
    const newRate = await recipeRepository.addRate(recipeId, userId, rate);
    // Respond  in JSON format
    res.json(newRate);
  } catch (err) {
    // Pass any errors to the error-handling middleware

    next(err);
  }
};

export default {
  browse,
  read,
  search,
  category,
  diet,
  difficulty,
  random,
  accueilCategory,
  time,
  deleteRecipe,
  add,
  byIngredients,
  rate,
  addComment,
  addFavorite,
  addRate,
};
