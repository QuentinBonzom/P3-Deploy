import type { RequestHandler } from "express";

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
    // Fetch all items

    const recipies = await recipeRepository.accueilCategory();
    // Respond with the items in JSON format
    res.json(recipies);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

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
  byIngredients,
};
