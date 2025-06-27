import type {
  FormData,
  SelectedIngredient,
  TypeCategory,
  TypeDiet,
  TypeIngredient,
} from "@/types/TypeFiles";
import { useEffect, useState } from "react";

function CreateRecipe() {
  //contient toutes les données du formulaire de la recette et initialise avec un objet vide
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    time_preparation: "",
    difficulty: "",
    kcal: "",
    id_category: "",
    id_diet: "",
    step1: "",
    step2: "",
    step3: "",
    step4: "",
    step5: "",
    step6: "",
    step7: "",
  });
  const [ingredients, setIngredients] = useState<TypeIngredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<
    SelectedIngredient[]
  >([]);
  const [categories, setCategories] = useState<TypeCategory[]>([]);
  const [diets, setDiets] = useState<TypeDiet[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/ingredient`)
      .then((res) => res.json())
      .then((data) => setIngredients(data))
      .catch(() => {});

    fetch(`${import.meta.env.VITE_API_URL}/api/category`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => {});

    fetch(`${import.meta.env.VITE_API_URL}/api/diet`)
      .then((res) => res.json())
      .then((data) => setDiets(data))
      .catch(() => {});
  }, []);

  //Gère les changements dans les champs du formulaire (input, textearea, select)
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    //Récupère le name et la value et met à jour l'état FormData
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //fonction pour gérer la sélection d'un ingrédient (checkbox)
  const handleIngredientCheck = (id: number, checked: boolean) => {
    if (checked) {
      //fonction de mise à jour du state : prev représente l'ancienne valeur du state selectedIngredients, c’est-à-dire un tableau d’objets ingrédients déjà sélectionnés et ...prev: c’est la destructuration de ce tableau. Les ... (spread operator) servent à copier tous les éléments déjà présents dans prev dans un nouveau tableau.
      setSelectedIngredients((prev) => [
        ...prev,
        { id, quantity: "", unit: "" },
      ]);
    } else {
      setSelectedIngredients((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleIngredientDetailChange = (
    id: number,
    field: "quantity" | "unit",
    value: string,
  ) => {
    setSelectedIngredients((prev) =>
      // Le spread permet de copier toutes les propriétés existantes (id, quantity, unit).
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    //empeche le chargement de la page
    e.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/recipe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipe: {
          ...formData,
          time_preparation: Number.parseInt(formData.time_preparation),
          kcal: Number.parseInt(formData.kcal),
          id_category: Number.parseInt(formData.id_category),
          id_diet: Number.parseInt(formData.id_diet),
        },
        ingredients: selectedIngredients,
      }),
    });

    const result = await response.json();
    alert("Recette enregistrée !");
    console.log(result);
  };

  return (
    <div className="bg-primary/20 text-secondary rounded-xl m-4 p-5">
      <h2 className="mb-5">Ajouter une nouvelle recette :</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-10">
          <label className="pr-4 font-bold" htmlFor="name">
            Nom de la recette *
          </label>
          <input
            className="border-0 border-b border-primary p-3"
            type="text"
            id="name"
            name="name"
            required
            onChange={handleChange}
          />
        </div>

        <div className="mb-10">
          <label className="pr-4 font-bold" htmlFor="time_preparation">
            Temps de préparation (en min) *
          </label>
          <input
            className="mt-4 border-1 rounded-md border-b border-primary p-3"
            type="number"
            id="time_preparation"
            name="time_preparation"
            required
            onChange={handleChange}
          />
        </div>

        <div className="mb-10">
          <label className="pr-4 font-bold" htmlFor="description">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            onChange={handleChange}
          />
        </div>

        <div className="mb-10">
          <label className="pr-4 font-bold" htmlFor="difficulty">
            Difficulté *
          </label>
          <select
            id="difficulty"
            name="difficulty"
            required
            onChange={handleChange}
            defaultValue=""
          >
            <option value="" disabled>
              --Choisir--
            </option>
            <option value="Facile">Facile</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Difficile">Difficile</option>
          </select>
        </div>

        <div className="mb-10">
          <label className="pr-4 font-bold" htmlFor="kcal">
            Calories *
          </label>
          <input
            type="number"
            id="kcal"
            name="kcal"
            required
            onChange={handleChange}
          />
        </div>

        <div className="mb-10">
          <label className="pr-4 font-bold" htmlFor="id_category">
            Catégorie *
          </label>
          <select
            id="id_category"
            name="id_category"
            required
            onChange={handleChange}
            defaultValue=""
          >
            <option value="" disabled>
              --Choisir--
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-10">
          <label className="pr-4 font-bold" htmlFor="id_diet">
            Régime *
          </label>
          <select
            id="id_diet"
            name="id_diet"
            required
            onChange={handleChange}
            defaultValue=""
          >
            <option value="" disabled>
              --Choisir--
            </option>
            {diets.map((diet) => (
              <option key={diet.id} value={diet.id}>
                {diet.name} {diet["Sans Gluten"] ? "(Sans Gluten)" : ""}
              </option>
            ))}
          </select>
        </div>

        {[...Array(7)].map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <div className="mb-10" key={i}>
            <label className="pr-4 font-bold" htmlFor={`step${i + 1}`}>
              Étape {i + 1}
              {i === 0 ? " *" : ""}
            </label>
            <textarea
              id={`step${i + 1}`}
              name={`step${i + 1}`}
              required={i === 0}
              onChange={handleChange}
            />
          </div>
        ))}

        {/* fieldset est une balise HTML qui sert à regrouper logiquement plusieurs éléments de formulaire : inputs, selects... */}
        <fieldset className="mb-10">
          <legend className="pr-4 font-bold mb-5">Ingrédients *</legend>
          {ingredients.map((ingredient) => {
            const selected = selectedIngredients.find(
              (item) => item.id === ingredient.id,
            );
            return (
              <div key={ingredient.id}>
                <input
                  className="mb-4"
                  type="checkbox"
                  id={`ingredient-${ingredient.id}`}
                  onChange={(e) =>
                    handleIngredientCheck(ingredient.id, e.target.checked)
                  }
                />
                <label className="pl-3" htmlFor={`ingredient-${ingredient.id}`}>
                  {ingredient.name}
                </label>

                {selected && (
                  <>
                    <input
                      type="number"
                      placeholder="Quantité"
                      value={selected.quantity}
                      onChange={(e) =>
                        handleIngredientDetailChange(
                          ingredient.id,
                          "quantity",
                          e.target.value,
                        )
                      }
                      required
                    />
                    <input
                      type="text"
                      placeholder="Unité (ex: g, c.à.s.)"
                      value={selected.unit}
                      onChange={(e) =>
                        handleIngredientDetailChange(
                          ingredient.id,
                          "unit",
                          e.target.value,
                        )
                      }
                    />
                  </>
                )}
              </div>
            );
          })}
        </fieldset>

        <section className="flex justify-center md:justify-start lg:justify-start">
          <button
            className="mb-4 p-2 px-4 cursor-pointer rounded-4xl bg-primary font-bold text-white"
            type="submit"
          >
            Ajouter la recette
          </button>
        </section>
      </form>
    </div>
  );
}

export default CreateRecipe;
