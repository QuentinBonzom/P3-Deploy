import type { TypeIngredient } from "../../../../client/src/types/TypeFiles";
import databaseClient from "../../../database/client";

class ingredientRepository {
  async readAll() {
    const result = await databaseClient.query<TypeIngredient>(
      /* sql */ `
        SELECT * FROM ingredient
      `,
      [], // Pas de paramètres ici
    );

    return result.rows;
  }
}

export default new ingredientRepository();
