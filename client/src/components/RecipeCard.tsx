type Recipe = {
  id: number;
  name: string;
  picture: string;
  description?: string;
  kcal: number;
  time_preparation?: string | number;
  difficulty: string;
  diet_name: string;
  rate?: number;
};

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
}

const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => (
  <button
    onClick={onClick}
    type="button"
    className="bg-[#f9e7cf] shadow-lg rounded-2xl p-4 border-2 border-[#e6d9be] flex flex-col items-center min-w-[260px] max-w-xs"
  >
    <h4 className="font-bold text-lg text-secondary mb-2 text-center">
      {recipe.name}
    </h4>

    <img
      src={recipe.picture}
      alt={recipe.name}
      className="w-32 h-32 object-cover rounded-xl mb-3"
    />
    {recipe.description && (
      <p className="text-sm text-secondary mb-2 text-center">
        {recipe.description}
      </p>
    )}
    <div className="flex flex-wrap gap-2 justify-center text-xs text-secondary mb-2">
      {recipe.kcal !== undefined && (
        <span className="bg-[#ffe2b7] rounded px-2 py-1">
          🔥 {recipe.kcal} kcal
        </span>
      )}
      {recipe.time_preparation && (
        <span className="bg-[#ffe2b7] rounded px-2 py-1">
          ⏱ {recipe.time_preparation} min
        </span>
      )}
      {recipe.difficulty && (
        <span className="bg-[#ffe2b7] rounded px-2 py-1">
          👨🏻‍🍳 {recipe.difficulty}
        </span>
      )}
      {recipe.diet_name && (
        <span className="bg-[#ffe2b7] rounded px-2 py-1">
          {recipe.diet_name}
        </span>
      )}
      {recipe.rate !== undefined && (
        <span className="bg-[#ffe2b7] rounded px-2 py-1">
          Note : {Number(recipe.rate).toFixed(1)}/5
        </span>
      )}
    </div>
  </button>
);

export default RecipeCard;
