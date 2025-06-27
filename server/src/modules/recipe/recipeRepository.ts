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
      SELECT DISTINCT ON (r.id) r.id, r.picture, r.name AS recipe_name, d.name AS diet_name, r.difficulty, r.description, r.time_preparation, r.kcal, AVG(a.rate) as rate
      FROM recipe r
      JOIN recip_ingredient ri ON r.id = ri.recipe_id
      JOIN ingredient i ON ri.ingredient_id = i.id
      LEFT JOIN action a ON r.id = a.recipe_id
      JOIN diet d ON r.id_diet = d.id
      LEFT JOIN category c ON r.id_category = c.id
      GROUP BY r.id, d.name
      ORDER BY r.id;
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
  async checkCombo(recipeId: number, userId: number) {
    const result = await databaseClient.query(
      `
        SELECT * FROM action
        WHERE recipe_id = $1 AND user_id = $2
      `,
      [recipeId, userId],
    );
    return (result.rowCount ?? 0) > 0; // renvoie true si le combo existe
  }

  async updateComment(recipeId: number, userId: number, commentText: string) {
    const result = await databaseClient.query(
      `
        UPDATE action
        SET comment = $1
        WHERE recipe_id = $2 AND user_id = $3
      `,
      [commentText, recipeId, userId],
    );
    return result.rowCount; // renvoie 1 si un enregistrement a bien été mis à jour
  }

  async updateFavorite(recipeId: number, userId: number) {
    const result = await databaseClient.query(
      `
        UPDATE action
        SET is_favorite = true
        WHERE recipe_id = $1 AND user_id = $2
      `,
      [recipeId, userId],
    );
    return result.rowCount; // renvoie 1 si un enregistrement a bien été mis à jour
  }

  async updateRate(recipeId: number, userId: number, rate: number) {
    const result = await databaseClient.query(
      `
        UPDATE action
        SET rate = $1
        WHERE recipe_id = $2 AND user_id = $3
      `,
      [rate, recipeId, userId],
    );
    return result.rowCount; // renvoie 1 si un enregistrement a bien été mis à jour
  }

  async search(id: string) {
    const searchWord = `%${id}%`; // On utilise le caractère de pourcentage pour la recherche partielle
    const result = await databaseClient.query<TypeRecipe>(
      `
      SELECT DISTINCT ON (r.id) r.id, r.picture, r.name AS recipe_name , d.name AS diet_name, r.difficulty, r.time_preparation, r.kcal, a.rate
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
      SELECT DISTINCT ON (r.id) r.id, r.picture, r.name AS recipe_name, d.name AS diet_name, r.difficulty, r.time_preparation, r.kcal, a.rate
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
      SELECT DISTINCT ON (r.id) r.id, r.picture, r.name AS recipe_name, d.name AS diet_name, r.difficulty, r.time_preparation, r.kcal, a.rate
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
      SELECT DISTINCT ON (r.id) r.id, r.picture, r.name AS recipe_name, d.name AS diet_name, r.difficulty, r.time_preparation, r.kcal, a.rate
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

  async time(id: string) {
    const result = await databaseClient.query<TypeRecipe>(
      `
      SELECT DISTINCT ON (r.id) r.id, r.picture, r.name AS recipe_name, d.name AS diet_name, r.difficulty, r.time_preparation, r.kcal, a.rate
      FROM recipe r
      JOIN recip_ingredient ri ON r.id = ri.recipe_id
      JOIN ingredient i ON ri.ingredient_id = i.id
      LEFT JOIN action a ON r.id = a.recipe_id
      JOIN diet d ON r.id_diet = d.id
      WHERE r.time_preparation ILIKE $1;
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

  async accueilCategory() {
    const result = await databaseClient.query<TypeRandom>(
      `
        SELECT c.id , c.name , r.picture
    FROM category c
    JOIN LATERAL (
      SELECT r.picture
      FROM recipe r
      WHERE r.id_category = c.id
      ORDER BY random()
      LIMIT 1
    ) r ON true
    WHERE c.id IN (2, 3, 4);
        
      `,
      [], // Pas de paramètres ici
    );
    return result.rows;
  }

<<<<<<< US_BONUS
  async byIngredients(ingredients: number[]) {
    if (!ingredients.length) return [];

    const result = await databaseClient.query<TypeRecipe>(
      `
    SELECT r.id, r.picture, r.description, r.name, d.name AS diet_name, r.difficulty, r.time_preparation, r.kcal, AVG(a.rate) as rate
    FROM recipe r
    JOIN recip_ingredient ri ON r.id = ri.recipe_id
    JOIN ingredient i ON ri.ingredient_id = i.id
    LEFT JOIN action a ON r.id = a.recipe_id
    JOIN diet d On r.id_diet = d.id
    WHERE i.id = ANY($1)
    GROUP BY r.id, d.name
    HAVING COUNT(DISTINCT i.id) = $2
    ORDER BY r.id;
    `,
      [ingredients, ingredients.length],
    );
    return result.rows;
  }
=======
  async note(id: number) {
    const result = await databaseClient.query(
      `
      SELECT AVG(rate) as rate
      FROM action
      WHERE recipe_id = $1;
    `,
      [id],
    );
    return result.rows[0].rate;
  }

  async comment(id: number) {
    const result = await databaseClient.query(
      `
      SELECT comment, member.name AS name
      FROM action
      JOIN member ON action.user_id = member.id
      WHERE recipe_id = $1;
    `,
      [id],
    );
    return result.rows;
  }

  async addComment(recipeId: number, userId: number, comment: string) {
    console.log({ recipeId, userId, comment });

    const result = await databaseClient.query(
      `
      INSERT INTO action (recipe_id, user_id, comment)
      VALUES ($1, $2, $3)      
    `,
      [recipeId, userId, comment],
    );
    return { recipeId, userId }; // Retourne les id clefs primaires de la table action
  }

  async addFavorite(recipeId: number, userId: number) {
    const result = await databaseClient.query(
      `
      INSERT INTO action (recipe_id, user_id, is_favorite)
      VALUES ($1, $2, true)
    `,
      [recipeId, userId],
    );
    return { recipeId, userId }; // Retourne les id clefs primaires de la table action
  }

  async addRate(recipeId: number, userId: number, rate: number) {
    const result = await databaseClient.query(
      `
      INSERT INTO action (recipe_id, user_id, rate)
      VALUES ($1, $2, $3)
    `,
      [recipeId, userId, rate],
    );
    return { recipeId, userId }; // Retourne les id clefs primaires de la table action
  }
>>>>>>> dev
}

export default new recipeRepository();
