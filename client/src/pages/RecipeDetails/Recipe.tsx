import type { TypeRecipe } from "@/types/TypeFiles";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import FiltresRecipe from "../../components/FiltresRecipe";

// Composant principal qui affiche la page des recettes
function Recettes() {
  // State pour stocker les recettes à afficher
  const [recipeToMap, setRecipeToMap] = useState<TypeRecipe[]>([]);
  // State pour le mot-clé de recherche (initialisé depuis le localStorage si dispo)
  const [searchWord, setSearchWord] = useState(
    localStorage.getItem("searchWord") || "",
  );

  // States pour les filtres sélectionnés
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRegime, setSelectedRegime] = useState<string | null>(null);
  const [selectedDifficulte, setSelectedDifficulte] = useState<string | null>(
    null,
  );
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Fonction pour effectuer une recherche par mot-clé
  const handleSearch = useCallback(() => {
    setRecipeToMap([]); // Vide les recettes pendant le chargement
    fetch(`${import.meta.env.VITE_API_URL}/api/recipe/search/${searchWord}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipeToMap(data); // Met à jour les recettes avec le résultat de la recherche
      });
  }, [searchWord]);

  // Fonction utilitaire pour afficher les étoiles de notation
  const renderStars = (rate: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rate) {
        stars.push(<span key={i}>⭐</span>);
      }
    }
    return stars;
  };

  // Fonction pour charger toutes les recettes (sans filtre)
  const handleAll = useCallback(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/recipe`)
      .then((response) => response.json())
      .then((data) => {
        setRecipeToMap(data);
      });
  }, []);

  // Charge toutes les recettes au premier rendu (ou si handleAll change)
  useEffect(() => {
    handleAll();
  }, [handleAll]);

  // Si un mot-clé est présent dans le localStorage, effectue une recherche et le supprime du localStorage
  useEffect(() => {
    const storedSearchWord = localStorage.getItem("searchWord");
    if (storedSearchWord) {
      setSearchWord(storedSearchWord);
      handleSearch();
      localStorage.removeItem("searchWord");
    }
  }, [handleSearch]);

  // Filtre les recettes par catégorie sélectionnée
  useEffect(() => {
    if (selectedCategory) {
      fetch(
        `${import.meta.env.VITE_API_URL}/api/recipe/category/${selectedCategory}`,
      )
        .then((response) => response.json())
        .then((data) => {
          setRecipeToMap(data);
        });
    }
    // Si aucun filtre n'est sélectionné, recharge toutes les recettes
    else if (!selectedRegime && !selectedDifficulte) {
      handleAll();
    }
  }, [selectedCategory, handleAll, selectedRegime, selectedDifficulte]);

  // Filtre les recettes par régime sélectionné
  useEffect(() => {
    if (selectedRegime) {
      fetch(`${import.meta.env.VITE_API_URL}/api/recipe/diet/${selectedRegime}`)
        .then((response) => response.json())
        .then((data) => {
          setRecipeToMap(data);
        });
    }
    // Si aucun filtre n'est sélectionné, recharge toutes les recettes
    else if (!selectedCategory && !selectedDifficulte) {
      handleAll();
    }
  }, [selectedRegime, handleAll, selectedCategory, selectedDifficulte]);

  // Filtre les recettes par difficulté sélectionnée
  useEffect(() => {
    if (selectedDifficulte) {
      fetch(
        `${import.meta.env.VITE_API_URL}/api/recipe/difficulty/${selectedDifficulte}`,
      )
        .then((response) => response.json())
        .then((data) => {
          setRecipeToMap(data);
        });
    }
    // Si aucun filtre n'est sélectionné, recharge toutes les recettes
    else if (!selectedCategory && !selectedRegime) {
      handleAll();
    }
  }, [selectedDifficulte, handleAll, selectedCategory, selectedRegime]);

  return (
    <section className="p-5 max-w-screen-xl mx-auto">
      {/* Barre de recherche */}
      <div className="flex flex-row justify-center items-center gap-3 mb-6">
        <div className="relative">
          <input
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            className="border-2 border-primary bg-white/40 rounded-full pl-5 pr-4 py-2 md:w-72 shadow focus:outline-none focus:ring-2 focus:ring-primary transition placeholder:text-secondary text-black text-lg"
            name="search"
            id="search"
            type="search"
            placeholder="🔎 Recette, ingrédient..."
          />
        </div>
        <button
          type="button"
          onClick={handleSearch}
          className="bg-primary rounded-full px-4 py-2 font-bold text-white shadow-md hover:from-amber-300 hover:to-amber-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Rechercher
        </button>
      </div>

      {/* Filtres desktop */}
      <section className="flex justify-center gap-6 pb-3 max-md:hidden text-secondary">
        {/* Dropdown pour filtrer par catégorie */}
        <FiltresRecipe
          label="Catégorie"
          options={["Petit déjeuner", "Repas", "Dessert"]}
          onSelect={setSelectedCategory}
        />
        {/* Dropdown pour filtrer par régime */}
        <FiltresRecipe
          label="Régime"
          options={["Vegan", "Végétarien", "Sans Gluten"]}
          onSelect={setSelectedRegime}
        />
        {/* Dropdown pour filtrer par difficulté */}
        <FiltresRecipe
          label="Difficulté"
          options={["Facile", "Moyen", "Difficile"]}
          onSelect={setSelectedDifficulte}
        />
        {/* Bouton pour réinitialiser tous les filtres */}
        <button
          type="button"
          className="rounded-full border-2 border-primary bg-primary/90 text-white px-6 py-2 text-lg font-semibold shadow hover:bg-primary hover:scale-105 transition-all duration-150"
          onClick={() => {
            setSelectedCategory(null);
            setSelectedRegime(null);
            setSelectedDifficulte(null);
            handleAll();
          }}
        >
          Réinitialiser les filtres
        </button>
      </section>

      {/* Filtres mobile */}
      <section className="md:hidden pb-3 text-secondary text-center">
        <button
          type="button"
          className="rounded-full border-2 border-primary bg-primary/90 text-white px-6 py-2 text-xl font-semibold shadow mb-3 w-full mx-2"
          onClick={() => setShowMobileFilters((v) => !v)}
        >
          {showMobileFilters ? "Fermer les filtres" : "Filtres"}
        </button>
        {showMobileFilters && (
          <div className="flex flex-col gap-4 items-center bg-white/90 rounded-2xl p-4 shadow-lg">
            <FiltresRecipe
              label="Catégorie"
              options={["Petit déjeuner", "Repas", "Dessert"]}
              onSelect={setSelectedCategory}
            />
            <FiltresRecipe
              label="Régime"
              options={["Vegan", "Végétarien", "Sans Gluten"]}
              onSelect={setSelectedRegime}
            />
            <FiltresRecipe
              label="Difficulté"
              options={["Facile", "Moyen", "Difficile"]}
              onSelect={setSelectedDifficulte}
            />
            <button
              type="button"
              className="rounded-full border-2 border-primary bg-primary/90 text-white px-6 py-2 text-lg font-semibold shadow"
              onClick={() => {
                setSelectedCategory(null);
                setSelectedRegime(null);
                setSelectedDifficulte(null);
                setShowMobileFilters(false);
                handleAll();
              }}
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </section>

      {/* Affichage des cartes de recettes */}
      <div className="w-full max-w-7xl mx-auto px-4">
        <div
          className="grid gap-6 justify-center"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          }}
        >
          {/* Boucle sur les recettes à afficher */}
          {recipeToMap.map((recipe) => (
            <Link
              onClick={() =>
                localStorage.setItem("recipeId", String(recipe.id))
              }
              to="/Details"
              key={recipe.id}
            >
              <article className="flex bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden max-h-60 group w-full">
                {/* Colonne gauche : image et tags */}
                <div className="flex flex-col items-center justify-between bg-primary/10 p-2 w-36">
                  <div className="relative">
                    <img
                      src={recipe.picture}
                      alt="Recette"
                      className="w-[100px] h-[100px] object-cover rounded-full border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="bg-secondary/40 backdrop-blur-sm rounded-xl mt-2 px-2 py-2 flex flex-col items-center gap-1 shadow-inner">
                    <div className="text-amber-500 text-lg">
                      {renderStars(recipe.rate)}
                    </div>
                    <div className="flex flex-col items-center gap-2 mt-1">
                      {/* Affiche le régime et la difficulté */}
                      <span className="bg-green-100 text-green-800 font-bold px-3 py-1 rounded-full text-sm shadow-sm">
                        {recipe.diet_name}
                      </span>
                      <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-sm shadow-sm">
                        {recipe.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Colonne droite : infos recette */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-extrabold text-lg mb-1 block text-primary">
                      {recipe.recipe_name}
                    </span>
                    <p className="text-gray-500 line-clamp-2 mb-2">
                      {recipe.description}
                    </p>
                    <div className="flex flex-col items-center md:items-start gap-1 mb-3 mt-2">
                      {/* Affiche le temps de préparation et les calories */}
                      <span className="flex items-center gap-1 text-gray-600 text-base md:text-left">
                        <span role="img" aria-label="temps">
                          ⏱️
                        </span>{" "}
                        {recipe.time_preparation} min
                      </span>
                      <span className="flex items-center gap-1 text-gray-600 text-base md:text-left">
                        <span role="img" aria-label="calories">
                          🔥
                        </span>{" "}
                        {recipe.kcal} Kcal/Pers.
                      </span>
                    </div>
                  </div>
                  {/* Bouton pour voir la recette */}
                  <div className="flex justify-center">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 bg-amber-300 hover:bg-amber-400 rounded-full px-4 py-1.5 font-semibold shadow transition-transform duration-150 hover:scale-105"
                    >
                      👨🏻‍🍳 Voir la recette
                    </button>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Recettes;
