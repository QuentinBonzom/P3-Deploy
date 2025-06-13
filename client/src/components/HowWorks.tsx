function HowWorks() {
  return (
    <section className="min-h-140 bg-primary/20">
      <article className="flex flex-row justify-center items-center gap-4 py-12">
        <img
          className="h-20 w-20"
          src="/cook-reflexion.png"
          alt="logo qui refléchi"
        />
        <h2>Comment ça marche ?</h2>
      </article>
      <article className="flex flex-wrap justify-center gap-36">
        <div className="w-80 h-80  flex flex-col justify-center items-center gap-4">
          <img className="mx-auto" src="/rechercher.png" alt="loupe" />
          <h3>Rechercher des recettes</h3>
          <p>Par ingrédients, plats ou mots clés</p>
        </div>
        <div className="w-80 h-80  flex flex-col justify-center items-center gap-4">
          <img className="mx-auto" src="/filtrer.png" alt="filtre" />
          <h3>Filtrez selon vos besoins</h3>
          <p>Allergènes, régimes (végétarien, keto...)</p>
        </div>
        <div className="w-80 h-80  flex flex-col justify-center items-center gap-4">
          <img className="mx-auto" src="/coeur.png" alt="coeur" />
          <h3>Sauvegardez vos favoris</h3>
          <p>Créez votre liste de course</p>
        </div>
      </article>
    </section>
  );
}

export default HowWorks;
