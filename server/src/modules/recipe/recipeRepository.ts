import type {
  TypeRandom,
  TypeRecipe,
} from "../../../../client/src/types/TypeFiles";
import databaseClient from "../../../database/client"; // On suppose que c’est un client pg déjà configuré

class recipeRepository {
  //   // Création (C de CRUD)
  //   async create(item: Omit<Item, "id">) {
  //     // En PG, on utilise $1, $2 comme placeholders, et on ajoute RETURNING id
  //     const result = await databaseClient.query<{ id: number }>(
  //       /* sql */ `
  //         INSERT INTO item (title, user_id)
  //         VALUES ($1, $2)
  //         RETURNING id
  //       `,
  //       [item.title, item.user_id],
  //     );

  //     // result.rows[0].id contient l'ID retourné
  //     return result.rows[0].id;
  //   }

  // Lecture d’un seul élément (R de CRUD)
  async read(id: number) {
    const result = await databaseClient.query<TypeRecipe>(
      /* sql */ `
        SELECT * FROM recipe
        WHERE id = $1
      `,
      [id],
    );

    // On renvoie la première ligne, castée en Item
    return result.rows[0];
  }

  // Lecture de tous les éléments
  async readAll() {
    const result = await databaseClient.query<TypeRecipe>(
      /* sql */ `
        SELECT * FROM recipe
      `,
      [], // Pas de paramètres ici
    );

    return result.rows;
  }

  // // (U de CRUD) -- Exemple de squelette pour la mise à jour, si tu veux t’entraîner :
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

  // // (D de CRUD) -- Exemple de squelette pour la suppression :
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

  async search(id: string) {
    const searchWord = `%${id}%`; // On utilise le caractère de pourcentage pour la recherche partielle
    const result = await databaseClient.query<TypeRecipe>(
      `
      SELECT DISTINCT r.id, r.picture, r.name AS recipe_name , d.name AS diet_name, r.difficulty, r.time_preparation, r.kcal, a.rate
      FROM recipe r
      JOIN recip_ingredient ri ON r.id = ri.recipe_id
      JOIN ingredient i ON ri.ingredient_id = i.id
      LEFT JOIN action a ON r.id = a.recipe_id
      JOIN diet d ON r.id_diet = d.id
      WHERE r.name ILIKE $1 OR i.name ILIKE $1;
      `,
      [searchWord], // Pas de paramètres ici
    );

    return result.rows;
  }

  async category(id: string) {
    const result = await databaseClient.query<TypeRecipe>(
      `
      SELECT DISTINCT r.id, r.picture, r.name AS recipe_name, d.name AS diet_name, r.difficulty, r.time_preparation, r.kcal, a.rate
      FROM recipe r
      JOIN recip_ingredient ri ON r.id = ri.recipe_id
      JOIN ingredient i ON ri.ingredient_id = i.id
      LEFT JOIN action a ON r.id = a.recipe_id
      JOIN diet d ON r.id_diet = d.id
      LEFT JOIN category c ON r.id_category = c.id
      WHERE c.name ILIKE $1;
    `,
      [id],
    );
    return result.rows;
  }

  async diet(id: string) {
    const searchWord = `%${id}%`;
    const result = await databaseClient.query<TypeRecipe>(
      `
      SELECT DISTINCT r.id, r.picture, r.name AS recipe_name, d.name AS diet_name, r.difficulty, r.time_preparation, r.kcal, a.rate
      FROM recipe r
      JOIN recip_ingredient ri ON r.id = ri.recipe_id
      JOIN ingredient i ON ri.ingredient_id = i.id
      LEFT JOIN action a ON r.id = a.recipe_id
      JOIN diet d ON r.id_diet = d.id
      WHERE d.name ILIKE $1;
    `,
      [searchWord],
    );
    return result.rows;
  }

  async difficulty(id: string) {
    const result = await databaseClient.query<TypeRecipe>(
      `
      SELECT DISTINCT r.id, r.picture, r.name AS recipe_name, d.name AS diet_name, r.difficulty, r.time_preparation, r.kcal, a.rate
      FROM recipe r
      JOIN recip_ingredient ri ON r.id = ri.recipe_id
      JOIN ingredient i ON ri.ingredient_id = i.id
      LEFT JOIN action a ON r.id = a.recipe_id
      JOIN diet d ON r.id_diet = d.id
      WHERE r.difficulty ILIKE $1;
    `,
      [id],
    );
    return result.rows;
  }

  async random() {
    const result = await databaseClient.query<TypeRandom>(
      /* sql */ `
        SELECT r.id, r.picture, r.name, r.time_preparation, AVG(a.rate) as rate
        FROM recipe r
        LEFT JOIN action a ON r.id = a.recipe_id
        GROUP BY r.id
        ORDER BY RANDOM()
        LIMIT 4;
        
      `,
      [], // Pas de paramètres ici
    );
    return result.rows;
  }
}

export default new recipeRepository();
