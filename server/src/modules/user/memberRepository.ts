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

  async login(email: string, password: string) {
    const result = await databaseClient.query(
      `SELECT id, email, password FROM member
        WHERE email = $1
        AND password = $2`,
      [email, password],
    );
    //console.log(result.rows[0])
    return result.rows[0];
  }
}

export default new userRepository();
