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
        <div className="w-80 h-80 bg-amber-200 ">
          <img src="/rechercher.png" alt="loupe" />
        </div>
        <div className="w-80 h-80 bg-amber-200">
          <img src="/filtrer.png" alt="filtre" />
        </div>
        <div className="w-80 h-80 bg-amber-200">
          <img src="/coeur.png" alt="coeur" />
        </div>
      </article>
    </section>
  );
}

export default HowWorks;
