import { useState } from "react";
import { useNavigate } from "react-router";

function SearchAccueil() {
  const [searchWord, setSearchWord] = useState("");
  const navigate = useNavigate();

  const HandleSetLocalStorage = (word: string) => {
    localStorage.setItem("searchWord", word);

    navigate("/Recettes");
  };

  return (
    <section className="flex flex-col lg:flex-row absolute top-40 left-1/2 transform -translate-x-1/2 z-1 text-white items-center">
      <article className="text-4xl mr-20 hidden lg:flex lg:min-w-80">
        On mange quoi
        <br />
        cette semaine ?
      </article>
      <article className="flex flex-row">
        <input
          onChange={(e) => setSearchWord(e.target.value)}
          placeholder="Recette, ingrédient..."
          className="bg-[var(--color-background)] text-secondary rounded-full px-2 border-2 text-xs  border-secondary min-w-60 lg:min-h-10 lg:text-lg lg:min-w-96 lg:border-3"
          type="text"
        />
        <button
          onClick={() => HandleSetLocalStorage(searchWord)}
          type="button"
          className="bg-primary h-8 rounded-full -translate-x-8 px-2 text-xs lg:text-lg  border-secondary border-2 z-2 lg:min-h-10 lg:border-3"
        >
          Rechercher
        </button>
      </article>
    </section>
  );
}

export default SearchAccueil;
