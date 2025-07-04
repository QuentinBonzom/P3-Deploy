import type { RequestHandler } from "express";
import listRepository from "./listRepository";

const addList: RequestHandler = async (req, res, next) => {
  try {
    // Extract user ID from the request parameters
    const userId = Number(req.params.id);
    // Extract the list from the request body
    const { list } = req.body;
    console.log("Received list:", list, "for user ID:", userId);

    // Validate that the list is an array
    if (!Array.isArray(list)) {
      res.status(400).json({ error: "Invalid list format" });
      return;
    }

    // Add the list to the database
    const addedList = await listRepository.addList(userId);
    console.log(addedList);
    const addListRecipe = await listRepository.addListRecipe(addedList, list);
    // Respond with the added list in JSON format
    res.json(addedList);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const memberList: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const lists = await listRepository.memberList(userId);
    res.json(lists);
  } catch (err) {
    next(err);
  }
};

export default { addList, memberList };
