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
    const newMember = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    const insertId = await memberRepository.create(newMember);

    /*je creer une nouvelle variable (ID de la table member qui s'auto-incrémente) donc elle crée un nouvel utilisateur dans la BD et récupére
     directement les infos et continuer en temps que membre VIA le next(). */

    const memberSignUp = await memberRepository.read(insertId);
    // console.log("newComer ", memberSignUp);
    req.user = memberSignUp; // Attach user to req
    next(); // on bascule sur la prochaine etape.
  } catch (err) {
    next(err);
  }
};

// RequestHandler = Typage de gestion de requete. Async doit etre toujour etre accompagné de await.

const login: RequestHandler = async (req, res, next) => {
  try {
    const user =
      req.user ||
      (await memberRepository.login(req.body.email, req.body.password));
    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
      res.status(201).json({ token, userId: user.id });
    } else {
      res.status(401).send("membre inconnu");
    }
  } catch (err) {
    next(err);
  }
};

const deleteAccount: RequestHandler = async (req, res, next) => {
  try {
    // On récupère l'ID du membre à supprimer depuis les paramètres de la requête ou depuis le token
    const memberId = req.params.id ? Number(req.params.id) : Number(req.userId);
    // Si l'ID est dans les paramètres, on le prend, sinon on prend l'ID du token
    // On vérifie si l'utilisateur a le droit de supprimer le compte
    // Si l'ID est dans les paramètres et qu'il ne correspond pas à l'ID du token, on refuse l'action
    if (req.params.id && memberId !== Number(req.userId)) {
      res.status(403).json({ message: "Action interdite" });
      return;
    }
    const deleted = await memberRepository.delete(memberId);
    if (!deleted) {
      res.status(404).json({ message: "Utilisateur introuvable" });
      return;
    }
    res.status(200).json({ message: "Compte supprimé avec succès" });
  } catch (err) {
    next(err);
  }
};

//Securité Permettant de contrôler si l'ID est à bien associé au token
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

const editMember: RequestHandler = async (req, res, next) => {
  try {
    const memberId = Number(req.userId); // On prend l'ID du token
    const { name, email, password } = req.body;
    //  On vérifie si l'utilisateur a le droit de modifier le compte
    //  Si l'ID est dans les paramètres et qu'il ne correspond pas à l'ID du token, on refuse l'action
    const updated = await memberRepository.update(memberId, {
      name,
      email,
      password: password || undefined,
    });
    if (!updated) res.status(404).json({ message: "Utilisateur introuvable" });
    res.json(updated);
    return;
  } catch (err) {
    next(err);
  }
};

const readFavorite: RequestHandler = async (req, res, next) => {
  try {
    const memberId = Number(req.params.id);
    const favorites = await memberRepository.favoriteList(memberId);

    if (favorites == null) {
      res.sendStatus(404);
    } else {
      res.json(favorites);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  read,
  add,
  login,
  checkId,
  deleteAccount,
  editMember,
  readFavorite,
};
