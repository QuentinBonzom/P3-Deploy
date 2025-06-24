import type { TypeUstensil } from "@/types/TypeFiles";

function UstensilRecipe({ ustensil }: { ustensil: TypeUstensil[] | null }) {
  return (
    <>
      <h3 className="m-4">Ustensiles</h3>
      <div className="flex  gap-4 justify-around">
        {ustensil?.map((ustensil) => (
          <div
            key={ustensil.ustensil_id}
            className="flex justify-between flex-col w-1/3 items-center my-6"
          >
            <img
              className="w-14 h-14 bg-amber-600 rounded-full"
              src={ustensil.ustensil_picture}
              alt={ustensil.ustensil_name}
            />
            <h3>{ustensil.ustensil_name}</h3>
          </div>
        ))}
      </div>
    </>
  );
}
export default UstensilRecipe;
