import type { RequestHandler } from "express";
import memberRepository from "./memberRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const members = await memberRepository.readAll();

    // Respond with the items in JSON format
    res.json(members);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const membersId = Number(req.params.id);
    const member = await memberRepository.read(membersId);

    if (member == null) {
      res.sendStatus(404);
    } else {
      res.json(member);
    }
  } catch (err) {
    next(err);
  }
};

// // The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const newMember = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    // Create the item
    const insertId = await memberRepository.create(newMember);

    //Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// RequestHandler = Typage de gestion de requete. Async doit etre toujour etre accompagné de await.

const login: RequestHandler = async (req, res, next) => {
  try {
    // Recupere les inputs(infos) du Form(body du fetch) et l'envoi dans une requete Body.
    const { email, password } = req.body;

    // Declaration d'une variable en Attente de la reponse du Repository.login pour la stocker.
    const user = await memberRepository.login(email, password);

    //conditions
    if (user) {
      res
        .status(201) // Statuts creation Ok

        //Renvoi au client les info {}
        .json({ id: user.id, email: user.email, password: user.password });
      return;
    }
    res.status(401).send("membre inconnu");
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, login };
