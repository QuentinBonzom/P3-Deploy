import type { TypeRecipe } from "@/types/TypeFiles";
import { useCallback, useEffect, useState } from "react";

function Recettes() {
  const [recipeSearchBar, setRecipeSearchBar] = useState<TypeRecipe[]>([]);
  const [searchWord, setSearchWord] = useState(
    localStorage.getItem("searchWord") || "",
  );
  console.log(localStorage.getItem("searchWord"));

  const handleSearch = useCallback(() => {
    fetch(`http://localhost:3310/api/recipe/search/${searchWord}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipeSearchBar(data);
        console.log("fetch lancé");
      });
  }, [searchWord]);

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
    <section className="bg-black p-5">
      <input
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
        className="border-2 border-white"
        name="search"
        id="search"
        type="search"
        placeholder="recette, ingrédient"
      />
      <button
        type="button"
        onClick={handleSearch}
        className="border-2 border-white"
      >
        Rechercher
      </button>

      {recipeSearchBar.map((recipe) => (
        <article key={recipe.id}>
          <h1>{recipe.recipe_name}</h1>
        </article>
      ))}
    </section>
  );
}

export default Recettes;
