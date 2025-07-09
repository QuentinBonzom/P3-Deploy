import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";

import type { TypeIngredient, TypeRecipe } from "@/types/TypeFiles";

interface RecipeItem {
  recipeId: number;
  userId: number;
  numberPersons: number;
}

function List() {
  const { userOnline, isConnected } = useUser();
  const [currentList, setCurrentList] = useState<RecipeItem[]>([]);
  const [recipe, setRecipe] = useState<TypeRecipe[]>([]);
  const [ingredients, setIngredients] = useState<TypeIngredient[]>([]);

  useEffect(() => {
    const localList = JSON.parse(localStorage.getItem("currentList") || "[]");

    //regrouper le nbr de personne par recette de currentList
    const recipeGroupById: RecipeItem[] = Object.values(
      localList.reduce(
        (acc: { [x: string]: { numberPersons: number } }, item: RecipeItem) => {
          if (!acc[item.recipeId]) {
            acc[item.recipeId] = { ...item }; // on crée une boîte pour cette recette
          } else {
            acc[item.recipeId].numberPersons += item.numberPersons; // on ajoute le nombre de personnes dans la boîte
          }
          return acc;
        },
        {},
      ),
    );
    //console.log("recipeGroupById", recipeGroupById);
    //map recipeGroupById pour fetch chaque recette
    const recipeToMap: TypeRecipe[] = [];
    const ingredientsToMap: TypeIngredient[] = [];
    recipeGroupById.map((item) => {
      fetch(
        `${import.meta.env.VITE_API_URL}/api/recipe/detail/${item.recipeId}`,
      )
        .then((response) => response.json())
        .then((data) => {
          data.numberPersons = item.numberPersons;
          recipeToMap.push(data);
          //console.log(recipeToMap);
          setRecipe(recipeToMap);
        });
      fetch(
        `${import.meta.env.VITE_API_URL}/api/ingredient/recipe/${item.recipeId}`,
      )
        .then((response) => response.json())
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            data[i].numberPersons = item.numberPersons;
          }
          ingredientsToMap.push(data);
          console.log(ingredientsToMap);
          const flatIngredients = ingredientsToMap.flat();
          const newIngredients: TypeIngredient[] = Object.values(
            flatIngredients.reduce(
              (acc: { [key: number]: TypeIngredient }, item) => {
                if (!acc[item.ingredient_id]) {
                  acc[item.ingredient_id] = { ...item }; // on crée une boîte pour cette recette
                } else {
                  acc[item.ingredient_id].numberPersons += item.numberPersons; // on ajoute le nombre de personnes dans la boîte
                }
                return acc;
              },
              {} as { [key: number]: TypeIngredient },
            ),
          );

          console.log(newIngredients);
          setIngredients(newIngredients);
        });
    });

    setCurrentList(recipeGroupById);
  }, []);

  async function handleValidList() {
    //console.log("currentList", currentList);
    if (currentList.length > 0 && isConnected) {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/member/${userOnline?.id}/list`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            list: currentList,
          }),
        },
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Liste validée", data);
        alert("Liste validée avec succès");
        // vider la liste de courses
        localStorage.removeItem("currentList");
        setCurrentList([]);
      }
    }
  }
  //console.log("recette:", recipe, "ingredients:", ingredients);

  return (
    <>
      <h1>Mes courses</h1>
      <section className="text-secondary">
        <h2>Liste en cours</h2>
        {currentList.length > 0 ? (
          <>
            <section className="flex">
              <section>
                {recipe.map((item) => (
                  <article key={item.id}>
                    <img
                      className="w-40 h-40"
                      src={item.picture}
                      alt={item.name}
                    />
                    <h3>
                      {item.name}
                      <br />
                      pour {item.numberPersons} personnes
                    </h3>
                  </article>
                ))}
              </section>
              <section>
                {ingredients.map((item) => (
                  <article key={item.ingredient_id}>
                    <img
                      className="w-20 h-20"
                      src={item.ingredient_picture}
                      alt={item.ingredient_name}
                    />
                    <div>
                      <h3>{item.ingredient_name}</h3>
                      <div>
                        {item.ingredient_quantity * item.numberPersons}{" "}
                        {item.unit_name}
                      </div>
                    </div>
                  </article>
                ))}
              </section>
            </section>
            <section>
              <button
                onClick={() => {
                  localStorage.removeItem("currentList");
                  setCurrentList([]);
                }}
                className="btn btn-primary rounded-full m-6"
                type="button"
              >
                Annuler la liste
              </button>
              <button
                className="btn btn-primary rounded-full m-6"
                onClick={() => {
                  handleValidList();
                }}
                type="button"
              >
                Valider la liste
              </button>
            </section>
          </>
        ) : (
          <p>Pas de liste en cours</p>
        )}
      </section>
    </>
  );
}

export default List;
