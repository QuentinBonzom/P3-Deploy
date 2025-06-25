import CommentRecipe from "@/components/CommentRecipe";
import StepsRecipe from "@/components/StepsRecipe";
import UstensilRecipe from "@/components/UstensilRecipe";
import type {
  TypeIngredient,
  TypeRecipe,
  TypeUstensil,
} from "@/types/TypeFiles";
import { useEffect, useState } from "react";
interface CommentInterface {
  text: string;
  member: string;
}

function DetailsRecipe() {
  const recipeId = Number(localStorage.getItem("recipeId"));
  const [recipe, setRecipe] = useState<TypeRecipe | null>(null);
  const [ingredients, setIngredients] = useState<TypeIngredient[]>([]);
  const [ustensils, setUstensils] = useState<TypeUstensil[]>([]);
  const [numberPersons, setNumberPersons] = useState<number>(1);
  const [rate, setRate] = useState<number>(0);
  const [comments, setComments] = useState<CommentInterface[]>([]);

  // Fetch the recipe details using the recipeId
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/recipe/detail/${recipeId}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data);
      });
    //Fetch the ingredients for recipe
    fetch(`${import.meta.env.VITE_API_URL}/api/ingredient/recipe/${recipeId}`)
      .then((response) => response.json())
      .then((data) => {
        setIngredients(data);
      });
    //Fetch the ustensils for recipe
    fetch(`${import.meta.env.VITE_API_URL}/api/ustensil/recipe/${recipeId}`)
      .then((response) => response.json())
      .then((data) => {
        setUstensils(data);
      });
    //fetch rate and comments
    fetch(`${import.meta.env.VITE_API_URL}/api/rate/recipe/${recipeId}`)
      .then((response) => response.json())
      .then((data) => {
        setRate(data.rate);
        setComments(data.comments);
        // console.log(data.rate);
        // console.log(data.comments);
      });
  }, [recipeId]);

  const renderStars = (rate: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rate) {
        stars.push(<span key={i}>⭐</span>);
      }
    }
    return stars;
  };

  //diminuer le nbr de personnes avec limite basse a 1
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
      <h2 className="p-8 pt-20 text-3xl">
        {recipe?.name} {renderStars(rate)}
      </h2>
      <section className="flex text-secondary justify-between m-4">
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
      <section className="flex">
        <section className="flex flex-col w-2/5">
          <article>
            <h3 className="m-4">Ingrédients</h3>
            {ingredients?.map((ingredient) => (
              <div
                key={ingredient.ingredient_id}
                className="flex justify-between m-6"
              >
                <div className="flex gap-4 items-center">
                  <img
                    className="w-14 h-14 bg-white rounded-full"
                    src={ingredient.ingredient_picture}
                    alt={ingredient.ingredient_name}
                  />
                  <h3>{ingredient.ingredient_name}</h3>
                </div>
                <div className="text-secondary text-lg font-bold flex items-center">
                  {ingredient.ingredient_quantity * numberPersons}
                  {ingredient.unit_name}
                </div>
              </div>
            ))}
          </article>
          <button
            type="button"
            className="bg-primary h-10 w-80 cursor-pointer rounded-full flex justify-between px-2 items-center m-auto my-8"
          >
            Ajouter à ma liste de courses{" "}
            <img src="/caddy.png" alt="caddy" className="w-8 h-8" />
          </button>
          <article>
            <UstensilRecipe ustensil={ustensils} />
          </article>
        </section>
        <section className="w-3/5 bg-primary/20 m-4 p-4 rounded-lg ">
          <h3 className="my-4">Préparation</h3>
          <StepsRecipe recipe={recipe} />
        </section>
      </section>
      <CommentRecipe comments={comments} />
      <section className="flex items-center">
        <img
          className="h-20 w-20"
          src="/cook-bonjour.png"
          alt="logo qui donneune note"
        />
        <h3>Donnez votre avis</h3>
      </section>
    </>
  );
}

export default DetailsRecipe;
