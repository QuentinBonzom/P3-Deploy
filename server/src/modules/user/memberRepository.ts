import type { TypeUser } from "../../../../client/src/types/TypeFiles";
import databaseClient from "../../../database/client";

const TABLE_NAME = "member";

class userRepository {
  async read(id: number) {
    const result = await databaseClient.query<TypeUser>(
      /* sql */ `
        SELECT * FROM member
        WHERE id = $1
      `,
      [id],
    );

    return result.rows[0];
  }

  async readAll() {
    const result = await databaseClient.query<TypeUser>(
      `
      SELECT * FROM member`,
      [],
    );
    return result.rows;
  }

  // Création (C de CRUD)
  async create(newMember: Omit<TypeUser, "id">) {
    // En PG, on utilise $1, $2 comme placeholders, et on ajoute RETURNING id
    const result = await databaseClient.query<{ id: number }>(
      /* sql */ `
          INSERT INTO member (name, email, password)
          VALUES ($1, $2, $3)
          RETURNING id
        `,
      [newMember.name, newMember.email, newMember.password],
    );

    // result.rows[0].id contient l'ID retourné
    return result.rows[0].id;
  }

  // Async quand tu le sais tu l'attend avec Await
  async login(email: string, password: string) {
    const result = await databaseClient.query(
      `SELECT id, email, admin, password FROM member
        WHERE email = $1
        AND password = $2`,
      [email, password],
    );
    //retourn la ligne crée
    return result.rows[0];
  }

  async delete(memberId: number) {
    const result = await databaseClient.query(
      "DELETE FROM member WHERE id = $1 RETURNING id, email",
      [memberId],
    );

    return result.rows[0];
  }

  async update(
    memberId: number,
    fields: { name?: string; email?: string; password?: string },
  ) {
    // Tableau qui va contenir les fragments de la requête SQL "SET"
    const updates = [];
    // Tableau qui va contenir les valeurs à passer à la requête paramétrée
    const values = [];
    // Commence à 1 car $1 est le premier paramètre
    // dans la requête SQL, et on va ajouter les valeurs dans l'ordre
    // où elles apparaissent dans la requête.
    // On utilise un index pour construire les placeholders $1, $2, etc.
    let idx = 1;
    // On vérifie chaque champ et on ajoute les fragments de mise à jour (updates et values)
    if (fields.name) {
      updates.push(`name = $${idx++}`);
      values.push(fields.name);
    }
    // Si le champ email est défini, on l'ajoute à la requête
    if (fields.email) {
      updates.push(`email = $${idx++}`);
      values.push(fields.email);
    }
    // Si le champ password est défini, on l'ajoute à la requête
    if (fields.password) {
      updates.push(`password = $${idx++}`);
      values.push(fields.password);
    }
    // Si aucun champ n'est défini, on ne fait rien : null est retourné.
    //values.push permet de stocker les valeurs à passer à la requête paramétrée pour éviter les injections SQL.
    if (!updates.length) return null;
    values.push(memberId);
    const result = await databaseClient.query(
      // join les fragments de mise à jour avec des virgules.
      //where clause pour mettre à jour uniquement le membre avec l'ID spécifié
      //returning clause pour retourner l'ID, le nom et l'email du membre mis à jour
      `UPDATE member SET ${updates.join(", ")} WHERE id = $${idx} RETURNING id, name, email`,
      values,
    );
    return result.rows[0];
  }

  async favoriteList(user_id: number) {
    const result = await databaseClient.query(
      `SELECT DISTINCT ON (r.id) r.name, r.picture, a.is_favorite 
      FROM recipe r
      JOIN action a ON r.id = a.recipe_id
      WHERE user_id=$1 
      AND a.is_favorite=true`,
      [user_id],
    );

    return result.rows;
  }

  async rated(user_id: number) {
    const result = await databaseClient.query(
      `SELECT recipe_id, rate
      FROM action 
      WHERE user_id=$1 
      AND rate`,
      [user_id],
    );

    return result.rows;
  }

  async comments(user_id: number) {
    const result = await databaseClient.query(
      `SELECT recipe_id, a.comment
      FROM action a
      WHERE user_id=$1 
      AND comment`,
      [user_id],
    );

    return result.rows;
  }
}

export default new userRepository();
