import type { TypeUstensil } from "../../../../client/src/types/TypeFiles";
import databaseClient from "../../../database/client";

class ustensilRepository {
  async recipeUstensil(id: number) {
    const result = await databaseClient.query<TypeUstensil>(
      /* sql */ `
        SELECT
          u.id AS ustensil_id,
          u.name AS ustensil_name
        FROM recipe_utensil ru
        JOIN utensil u ON u.id = ru.utensil_id
        WHERE ru.recipe_id = $1;
      `,
      [id],
    );
    //on renvoi une ligne par ustensile
    return result.rows;
  }
}

export default new ustensilRepository();
