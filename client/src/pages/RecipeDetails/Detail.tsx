import Edit_Recipe from "@/components/Admin/Edit_Recipe";
import CommentRecipe from "@/components/CommentRecipe";
import StepsRecipe from "@/components/StepsRecipe";
import UstensilRecipe from "@/components/UstensilRecipe";
import { useUser } from "@/context/UserContext";
import { useHandleFavorite } from "@/hooks/useHandleFavorite";
import type {
  TypeIngredient,
  TypeRecipe,
  TypeUstensil,
} from "@/types/TypeFiles";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router";

function DetailsRecipe() {
  const recipeId = Number(localStorage.getItem("recipeId"));
  const { isFavorite, toggleFavorite } = useHandleFavorite(recipeId, false);
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<TypeRecipe | null>(null);
  const [ingredients, setIngredients] = useState<TypeIngredient[]>([]);
  const [ustensils, setUstensils] = useState<TypeUstensil[]>([]);
  const [numberPersons, setNumberPersons] = useState<number>(1);
  const [rate, setRate] = useState<number>(0);
  const [comments, setComments] = useState<{ text: string; member: string }[]>(
    [],
  );
  const { isConnected, idUserOnline, isAdmin } = useUser();
  const [showEdit, setShowEdit] = useState(false);

  // Fetch the recipe details using the recipeId
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/recipe/detail/${recipeId}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data);
      });
    fetch(`${import.meta.env.VITE_API_URL}/api/ingredient/recipe/${recipeId}`)
      .then((response) => response.json())
      .then((data) => {
        setIngredients(data);
      });
    fetch(`${import.meta.env.VITE_API_URL}/api/ustensil/recipe/${recipeId}`)
      .then((response) => response.json())
      .then((data) => {
        setUstensils(data);
      });
    fetch(`${import.meta.env.VITE_API_URL}/api/rate/recipe/${recipeId}`)
      .then((response) => response.json())
      .then((data) => {
        setRate(data.rate);
        setComments(data.comments);
      });
  }, [recipeId]);

  function handleLess() {
    if (numberPersons > 1) {
      setNumberPersons(numberPersons - 1);
    } else {
      setNumberPersons(1);
    }
  }

  function handleUserRate(rate: number) {
    if (!isConnected) {
      alert("Vous devez être connecté pour donner une note.");
      navigate("/Compte");
    } else {
      fetch(`${import.meta.env.VITE_API_URL}/api/rate/recipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipeId,
          userId: idUserOnline,
          rate: rate,
        }),
      }).then((response) => {
        if (response.ok) {
          alert("Note ajoutée avec succès");
        } else {
          alert("Erreur lors de l'ajout de la note");
        }
      });
    }
  }

  function handleShopping(recipeId: number, numberPersons: number) {
    if (!isConnected) {
      alert(
        "Vous devez être connecté pour ajouter des ingrédients à votre liste de courses.",
      );
      navigate("/Compte");
    } else {
      const currentList = JSON.parse(
        localStorage.getItem("currentList") || "[]",
      );
      const thisRecipePersonns = {
        recipeId: recipeId,
        userId: idUserOnline,
        numberPersons: numberPersons,
      };
      currentList.push(thisRecipePersonns);
      localStorage.setItem("currentList", JSON.stringify(currentList));
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const renderStars = (rate: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rate) {
        stars.push(<span key={i}>⭐</span>);
      }
    }
    return stars;
  };

  return (
    <>
      {/* Bouton d'édition visible seulement pour l'admin */}
      {isAdmin && (
        <div className="flex justify-end m-4">
          <button
            className="bg-primary text-white px-4 py-2 rounded"
            onClick={() => setShowEdit((v) => !v)}
            type="button"
          >
            {showEdit ? "Annuler la modification" : "Modifier la recette"}
          </button>
        </div>
      )}
      {/* Formulaire d'édition */}
      {showEdit && (
        <Edit_Recipe
          recipe={recipe}
          ingredients={ingredients}
          ustensils={ustensils}
          onClose={() => setShowEdit(false)}
          onUpdate={() => {
            // Recharge la recette et ses ingrédients/ustensiles
            fetch(
              `${import.meta.env.VITE_API_URL}/api/recipe/detail/${recipeId}`,
            )
              .then((response) => response.json())
              .then((data) => setRecipe(data));
            fetch(
              `${import.meta.env.VITE_API_URL}/api/ingredient/recipe/${recipeId}`,
            )
              .then((response) => response.json())
              .then((data) => setIngredients(data));
            fetch(
              `${import.meta.env.VITE_API_URL}/api/ustensil/recipe/${recipeId}`,
            )
              .then((response) => response.json())
              .then((data) => setUstensils(data));
          }}
        />
      )}
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
          <div className="bg-white h-10 min-w-56 rounded-2xl border-2 border-secondary flex items-center justify-center m-auto ">
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
          <button onClick={toggleFavorite} type="button">
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </article>
      </section>
      <section className="flex mb-20">
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
            onClick={() => handleShopping(recipeId, numberPersons)}
            type="button"
            className="bg-primary h-10 w-80 cursor-pointer rounded-full flex justify-around px-2 items-center m-auto my-8"
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
      <section className="flex">
        <CommentRecipe comments={comments} />
        <section className="flex items-center m-auto">
          <img
            className="h-20 w-20"
            src="/cook-bonjour.png"
            alt="logo qui donneune note"
          />
          <h3>
            Donnez votre avis
            <button
              onClick={() => handleUserRate(1)}
              type="button"
              className="cursor-pointer hover:text-2xl"
            >
              ⭐
            </button>
            <button
              onClick={() => handleUserRate(2)}
              type="button"
              className="cursor-pointer hover:text-2xl"
            >
              ⭐
            </button>
            <button
              onClick={() => handleUserRate(3)}
              type="button"
              className="cursor-pointer hover:text-2xl"
            >
              ⭐
            </button>
            <button
              onClick={() => handleUserRate(4)}
              type="button"
              className="cursor-pointer hover:text-2xl"
            >
              ⭐
            </button>
            <button
              onClick={() => handleUserRate(5)}
              type="button"
              className="cursor-pointer hover:text-2xl"
            >
              ⭐
            </button>
          </h3>
        </section>
      </section>
    </>
  );
}

export default DetailsRecipe;
