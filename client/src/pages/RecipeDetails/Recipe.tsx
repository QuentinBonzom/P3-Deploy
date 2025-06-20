import type { TypeRecipe } from "@/types/TypeFiles";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";

function Recettes() {
  const [recipeToMap, setRecipeToMap] = useState<TypeRecipe[]>([]);
  const [searchWord, setSearchWord] = useState(
    localStorage.getItem("searchWord") || "",
  );

  const handleSearch = useCallback(() => {
    setRecipeToMap([]);
    fetch(`http://localhost:3310/api/recipe/search/${searchWord}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipeToMap(data);
      });
  }, [searchWord]);

  const renderStars = (rate: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rate) {
        stars.push(<span key={i}>⭐</span>);
      }
    }
    return stars;
  };

  const handleAll = () => {
    fetch("http://localhost:3310/api/recipe")
      .then((response) => response.json())
      .then((data) => {
        setRecipeToMap(data);
      });
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    handleAll();
  }, []);

  useEffect(() => {
    const storedSearchWord = localStorage.getItem("searchWord");
    if (storedSearchWord) {
      setSearchWord(storedSearchWord);
      console.log(searchWord);
      handleSearch();
      localStorage.removeItem("searchWord");
    }
  }, [handleSearch, searchWord]);

  return (
    <section className="p-5 max-w-screen-xl mx-auto">
      <div className="flex flex-row justify-center items-center gap-3 mb-6">
        <input
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          className="border border-gray-300 rounded-full px-4 py-2 md:w-64"
          name="search"
          id="search"
          type="search"
          placeholder="Recette, ingrédient..."
        />
        <button
          type="button"
          onClick={handleSearch}
          className="bg-amber-100 rounded-full px-2 md:px-4  py-1 md:py-2 shadow hover:bg-amber-200 transition"
        >
          Rechercher
        </button>
      </div>
      <section className="flex justify-around pb-3 max-md:hidden text-lg">
        <button type="button" className="rounded-full border-2 p-2">
          Catégorie
        </button>
        <button type="button" className="rounded-full border-2 p-2">
          Regime
        </button>
        <button type="button" className="rounded-full border-2 p-2">
          Difficulté
        </button>
        <button
          type="button"
          className="rounded-full border-2 p-2 bg-primary/80"
        >
          Réinitialiser les filtres
        </button>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recipeToMap.map((recipe) => (
          <Link to="/Details" key={recipe.id}>
            <article className="flex bg-white rounded-xl shadow-md overflow-hidden max-h-60">
              <div className="bg-primary/80 items-center justify-center w-30 h-54 md:w-60 md:h-56 lg:w-7xl">
                <img
                  src={recipe.picture}
                  alt="Recipe"
                  className=" flex w-[110px] h-[110px] object-cover my-2 m-auto items-center "
                />
                <div className="bg-[#fde9cc] h-full py-2 px-2 mb-2">
                  <p className="text-sm text-center">
                    {renderStars(recipe.rate)}
                  </p>
                  <p className="text-xs text-center">{recipe.diet_name}</p>
                  <p className="text-sm font-semibold text-center">
                    {recipe.difficulty}
                  </p>
                </div>
              </div>

              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-bold text-lg text-center">
                    {recipe.recipe_name}
                  </span>
                  <p className="truncate w-[190px] mb-2">
                    {recipe.description}
                  </p>
                  <p className="text-sm">
                    Préparation : {recipe.time_preparation} min
                  </p>
                  <p className="text-sm mb-3">
                    Environ : {recipe.kcal} Kcal/Pers.
                  </p>
                </div>
                <div className="flex justify-center">
                  <span className="inline-flex items-center gap-1 bg-amber-100 rounded-full px-3 py-1 shadow-md text-sm font-medium">
                    👨🏻‍🍳 Voir la recette
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Recettes;
