function HowWorks() {
  return (
    <section className="min-h-140 bg-primary/20 mx-16 rounded-4xl shadow-2xl border-4 border-white/20">
      <article className="flex flex-row justify-center items-center gap-4 py-12 px-4">
        <img
          className="h-20 w-20"
          src="/cook-reflexion.png"
          alt="logo qui refléchi"
        />
        <h2>Comment ça marche ?</h2>
      </article>
      <article className="flex flex-wrap justify-center md:gap-30 px-4">
        <div className="w-80 h-80  flex flex-col justify-center items-center gap-4">
          <img className="mx-auto" src="/rechercher.png" alt="loupe" />
          <h3>Rechercher des recettes</h3>
          <p className="text-center">Par ingrédients, plats ou mots clés</p>
        </div>
        <div className="w-80 h-80  flex flex-col justify-center items-center gap-4">
          <img className="mx-auto" src="/filtrer.png" alt="filtre" />
          <h3>Filtrez selon vos besoins</h3>
          <p className="text-center">
            Allergènes, régimes (végétarien, keto...)
          </p>
        </div>
        <div className="w-80 h-80  flex flex-col justify-center items-center gap-4">
          <img className="mx-auto" src="/coeur.png" alt="coeur" />
          <h3>Sauvegardez vos favoris</h3>
          <p className="text-center">Créez votre liste de course</p>
        </div>
      </article>
    </section>
  );
}

export default HowWorks;
