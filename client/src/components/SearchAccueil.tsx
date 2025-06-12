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
    <section className="bg-cover bg-center h-[400px] flex items-center justify-center text-white">
      <article className="text-4xl mr-20">
        On mange quoi
        <br />
        cette semaine ?
      </article>
      <article>
        <input
          onChange={(e) => setSearchWord(e.target.value)}
          placeholder="Rechercher une recette, un ingrédient..."
          className="bg-[var(--color-background)] text-[var(--color-secondary)]"
          type="text"
        />
        <button
          onClick={() => HandleSetLocalStorage(searchWord)}
          type="button"
          className=""
        >
          Rechercher
        </button>
      </article>
    </section>
  );
}

export default SearchAccueil;
