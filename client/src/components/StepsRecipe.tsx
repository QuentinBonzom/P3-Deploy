import type { TypeRecipe } from "@/types/TypeFiles";

function StepsRecipe({ recipe }: { recipe: TypeRecipe | null }) {
  return (
    <section className="flex flex-col p-6 gap-4">
      {recipe?.step1 ? <h3>Etape 1</h3> : null}
      <p>{recipe?.step1}</p>
      {recipe?.step2 ? <h3>Etape 2</h3> : null}
      <p>{recipe?.step2}</p>
      {recipe?.step3 ? <h3>Etape 3</h3> : null}
      <p>{recipe?.step3}</p>
      {recipe?.step4 ? <h3>Etape 4</h3> : null}
      <p>{recipe?.step4}</p>
      {recipe?.step5 ? <h3>Etape 5</h3> : null}
      <p>{recipe?.step5}</p>
      {recipe?.step6 ? <h3>Etape 6</h3> : null}
      <p>{recipe?.step6}</p>
      {recipe?.step7 ? <h3>Etape 7</h3> : null}
      <p>{recipe?.step7}</p>
    </section>
  );
}
export default StepsRecipe;
