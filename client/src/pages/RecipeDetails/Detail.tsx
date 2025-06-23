import type {
  TypeIngredient,
  TypeRecipe,
  TypeUstencil,
} from "@/types/TypeFiles";
import { useEffect, useState } from "react";

function DetailsRecipe() {
  const recipeId = Number(localStorage.getItem("recipeId"));
  const [recipe, setRecipe] = useState<TypeRecipe | null>(null);
  const [ingredients, setIngredients] = useState<TypeIngredient[]>([]);
  const [ustensils, setUstensils] = useState<TypeUstencil[]>([]);
  const [numberPersons, setNumberPersons] = useState<number>(1);

  // Fetch the recipe details using the recipeId
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/recipe/detail/${recipeId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRecipe(data);
      });
    fetch(`${import.meta.env.VITE_API_URL}/api/ingredient/recipe/${recipeId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIngredients(data);
      });
    fetch(`${import.meta.env.VITE_API_URL}/api/ustensil/recipe/${recipeId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUstensils(data);
      });
  }, [recipeId]);

  function handleLess() {
    if (numberPersons > 1) {
      setNumberPersons(numberPersons - 1);
    } else {
      setNumberPersons(1);
    }
  }

  return (
    <>
      <img
        className="h-72 absolute top-20 left-1/2 transform -translate-x-1/2 z-1"
        src={recipe?.picture}
        alt={recipe?.name}
      />
      <h2 className="p-12 ">{recipe?.name}</h2>
      <section className="flex text-secondary justify-between mx-4">
        <article className="flex">
          <img
            className="w-14 h-14"
            src="/horlogeIcone.png"
            alt="icone d'horloge"
          />
          <article className="text-lg font-bold m-auto">
            {recipe?.time_preparation} min
          </article>
        </article>

        <article className="flex">
          <img
            className="w-14 h-14 "
            src="/torseIcone.png"
            alt="icone de torse"
          />
          <div className="bg-white h-10 min-w-56 rounded-2xl border-2 border-secondary flex items-center justify-center m-auto">
            <button
              onClick={() => handleLess()}
              type="button"
              className="cursor-pointer"
            >
              <img
                className="w-8 h-8 "
                src="/moins.png"
                alt="soustraire une personne"
              />
            </button>
            <span className="px-4 ">{numberPersons} personne(s)</span>
            <button
              onClick={() => setNumberPersons(numberPersons + 1)}
              type="button"
              className="cursor-pointer"
            >
              <img
                className="w-8 h-8"
                src="/ajouter.png"
                alt="ajouter une personne"
              />
            </button>
          </div>
        </article>
        <article className="flex">
          <h3 className="m-auto px-2">Ajouter aux favoris</h3>
          <img
            className="w-14 h-14 cursor-pointer"
            src="/coeur.png"
            alt="icone en coeur"
          />
        </article>
      </section>
      <section className="flex flex-row">
        <article>
          <h3>Ingrédients</h3>
          {ingredients?.map((ingredient) => (
            <div key={ingredient.id} className="flex justify-between">
              <img
                className="w-14 h-14 bg-white rounded-full"
                src={ingredient.ingredient_picture}
                alt={ingredient.ingredient_name}
              />
              <h3>{ingredient.ingredient_name}</h3>
              <div className="text-secondary text-lg font-bold">
                {ingredient.ingredient_quantity * numberPersons}
              </div>
              <div className="text-secondary text-lg font-bold">
                {ingredient.unit_name}
              </div>
            </div>
          ))}
        </article>
        <article>
          {ustensils?.map((ustensil) => (
            <div key={ustensil.id} className="flex justify-between">
              {/* <img className="w-14 h-14 bg-white rounded-full"
              src={ustensil.ustensil_picture} alt={ustensil.ustensil_name} /> */}
              <h3>{ustensil.ustensil_name}</h3>
            </div>
          ))}
        </article>
        <article>
          <h3>Préparation</h3>
          {recipe?.step6 ? <h3>{recipe?.step6}</h3> : null}
        </article>
      </section>
    </>
  );
}

export default DetailsRecipe;
