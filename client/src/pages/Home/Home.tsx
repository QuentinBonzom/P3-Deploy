import type { TypeIngredient } from "@/types/TypeFiles";
import { useEffect, useState } from "react";

function Accueil() {
  //const [recipes, setRecipies] = useState([] as TypeRecipe[]);
  const [ingredients, setIngredients] = useState([] as TypeIngredient[]);

  useEffect(() => {
    // fetch("http://localhost:3310/api/recipe")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setRecipies(data);
    //   });
    fetch("http://localhost:3310/api/ingredient")
      .then((response) => response.json())
      .then((data) => {
        setIngredients(data);
      });
  }, []);

  return (
    <>
      <h1>liste des recettes</h1>
      {ingredients.map((ingredient) => (
        <section key={ingredient.id}>
          <h1>{ingredient.name}</h1>
        </section>
      ))}
      ;
    </>
  );
}

export default Accueil;

// APP_PORT=3310
// DATABASE_URL=postgresql://postgres.pybwvhylthnzyfhwgacr:Ilovefood2025!@aws-0-eu-west-3.pooler.supabase.com:6543/postgres

// useEffect(() => {
//     fetch(API_URL)
//       .then((response) => response.json())
//       .then((data) => {
//         setItems(data);
//         setItemsApi(data);
//       });
//   }, []);
