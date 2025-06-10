import databaseClient from "../../../database/client"; // On suppose que c’est un client pg déjà configuré

type Item = {
  id: number;
  title: string;
  user_id: number;
};

class ItemRepository {
  // Création (C de CRUD)
  async create(item: Omit<Item, "id">) {
    // En PG, on utilise $1, $2 comme placeholders, et on ajoute RETURNING id
    const result = await databaseClient.query<{ id: number }>(
      /* sql */ `
        INSERT INTO item (title, user_id)
        VALUES ($1, $2)
        RETURNING id
      `,
      [item.title, item.user_id],
    );

    // result.rows[0].id contient l'ID retourné
    return result.rows[0].id;
  }

  // Lecture d’un seul élément (R de CRUD)
  async read(id: number) {
    const result = await databaseClient.query<Item>(
      /* sql */ `
        SELECT * FROM item
        WHERE id = $1
      `,
      [id],
    );

    // On renvoie la première ligne, castée en Item
    return result.rows[0];
  }

  // Lecture de tous les éléments
  async readAll() {
    const result = await databaseClient.query<Item>(
      /* sql */ `
        SELECT * FROM item
      `,
      [], // Pas de paramètres ici
    );

    return result.rows;
  }

  // (U de CRUD) -- Exemple de squelette pour la mise à jour, si tu veux t’entraîner :
  // async update(item: Item) {
  //   const result = await databaseClient.query(
  //     `
  //       UPDATE item
  //       SET title = $1, user_id = $2
  //       WHERE id = $3
  //       RETURNING *
  //     `,
  //     [item.title, item.user_id, item.id],
  //   );
  //   return result.rows[0] as Item;
  // }

  // (D de CRUD) -- Exemple de squelette pour la suppression :
  // async delete(id: number) {
  //   const result = await databaseClient.query(
  //     `
  //       DELETE FROM item
  //       WHERE id = $1
  //     `,
  //     [id],
  //   );
  //   return result.rowCount; // renvoie 1 si un enregistrement a bien été supprimé
  // }
}

export default new ItemRepository();
