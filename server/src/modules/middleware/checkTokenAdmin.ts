import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

interface JWTPayload {
  AdminId: number;
}

const checkTokenAdmin: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization;
  //fetch client /api/admin/:id?idToDelete=${idToDelete}
  const idToDelete = req.query.idToDelete;
  if (!token) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      // console.error("Token verification failed:", err);
      res.status(401).send({ message: "Unauthorized" });
      return;
    }
    const { AdminId } = decoded as JWTPayload;

    req.userId = AdminId;
    console.log("Token Admin fonctionnel");
    next();
  });
};

export default { checkTokenAdmin };
