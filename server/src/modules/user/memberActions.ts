import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
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
      //création du token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
      res
        .status(201) // Statuts creation Ok

        //Renvoi au client les info {}
        .send({ token: token, userId: user.id });
      return;
    }
    res.status(401).send("membre inconnu");
  } catch (err) {
    next(err);
  }
};

const deleteAccount: RequestHandler = async (req, res, next) => {
  try {
    const memberId = Number.parseInt(req.params.id);

    const deleted = await memberRepository.delete(memberId);

    if (!deleted) {
      res.status(404).json({ message: "Utilisateur introuvable" });
      return;
    }

    res.status(200).json({ message: "Compte supprimé avec succès" });

//Permet de contrôler si l'ID est à bien associé au token
const checkId: RequestHandler = async (req, res, next) => {
  try {
    const user = await memberRepository.read(Number(req.userId));

    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }

  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, login, checkId, deleteAccount };
