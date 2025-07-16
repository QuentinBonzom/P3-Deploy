import Edit_Recipe from "@/components/Admin/Edit_Recipe";
import CommentRecipe from "@/components/CommentRecipe";
import RatingStars from "@/components/RatingStars";
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
import { FaMinus } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
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

  //diminuer le nbr de personnes avec limite basse a 1
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

          <article className="flex items-center">
            <button
              type="button"
              onClick={toggleFavorite}
              className="flex items-center space-x-1"
            >
              {isFavorite ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
            </button>
          </article>
        </article>

        <article className="flex justify-center items-center">
          <img
            className="w-10 h-10 md:w-14 md:h-14"
            src="/torseIcone.png"
            alt="personnes"
          />
          <div className="bg-white h-8 md:h-10 min-w-[250px] md:min-w-[224px] rounded-2xl border-2 border-secondary flex items-center justify-between px-2 md:px-4 mx-2">
            <button type="button" onClick={handleLess} className="p-1">
              <FaMinus />
            </button>
            <span className="text-sm md:text-base">
              {numberPersons} personnes
            </span>
            <button
              type="button"
              onClick={() => setNumberPersons((n) => n + 1)}
              className="p-1"
            >
              <IoMdAdd />
            </button>
          </div>
        </article>
      </section>

      <section className="flex flex-col mb-20 ">
        <div className="m-4 overflow-x-auto">
          <table className="min-w-full bg-primary/20 rounded-lg">
            {/* En-têtes masquées en mobile, visibles en md+ */}
            <thead className="hidden md:table-header-group">
              <tr className="bg-primary/30">
                <th className="px-4 py-2 text-left">Ingrédient</th>
                <th className="px-4 py-2 text-left">Quantité</th>
              </tr>
            </thead>

            {/* Corps du tableau */}
            <tbody className="block md:table-row-group">
              {ingredients?.map((ing) => (
                <tr
                  key={ing.ingredient_id}
                  className="block md:table-row border-b md:border-0"
                >
                  {/* Colonne “Ingrédient” */}
                  <td className="block md:table-cell px-4 py-3">
                    <div className="flex items-center gap-4 justify-between">
                      <img
                        className="w-12 h-12 bg-white rounded-full"
                        src={ing.ingredient_picture}
                        alt={ing.ingredient_name}
                      />
                      <p className="font-medium">{ing.ingredient_name}</p>
                    </div>
                    {/* Quantité affichée sous le nom en mobile */}
                    <span className="md:hidden block mt-2 text-secondary font-bold">
                      {ing.ingredient_quantity * numberPersons}
                      {ing.unit_name}
                    </span>
                  </td>

                  {/* Colonne “Quantité” masquée en mobile, visible en md+ */}
                  <td className="hidden md:table-cell px-4 py-3 text-secondary font-bold">
                    {ing.ingredient_quantity * numberPersons}
                    {ing.unit_name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section>
          <h4 className="my-4 text-2xl text-secondary text-center">
            Ustensiles
          </h4>
          <article className="bg-primary/20 m-4 p-4 rounded-lg ">
            <UstensilRecipe ustensil={ustensils} />
          </article>
        </section>

        <h4 className="my-4 text-2xl text-secondary text-center">
          Préparation
        </h4>
        <article className=" bg-primary/20 m-4 p-2 rounded-lg ">
          <StepsRecipe recipe={recipe} />
        </article>
      </section>

      <section className="flex flex-col">
        <section className="flex items-center justify-center">
          <img
            className="h-20 w-20"
            src="/cook-bonjour.png"
            alt="logo qui donne une note"
          />
          <article className="text-center">
            <p>Donnez votre avis</p>
            <RatingStars onRate={handleUserRate} rating={rate} />
          </article>
        </section>

        <article className="flex justify-center">
          <CommentRecipe comments={comments} />
        </article>
      </section>
      <div className="flex justify-center">
        <button
          onClick={() => handleShopping(recipeId, numberPersons)}
          type="button"
          className=" bg-primary h-10 w-full cursor-pointer rounded-full flex justify-around px-2 items-center m-4 my-8"
        >
          Ajouter à ma liste de courses{" "}
          <img src="/caddy.png" alt="caddy" className="w-8 h-8" />
        </button>
      </div>
    </>
  );
}

export default DetailsRecipe;
