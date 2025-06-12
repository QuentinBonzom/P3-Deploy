import OurSelection from "../../components/OurSelection";
import SearchAccueil from "../../components/SearchAccueil";

function Accueil() {
  return (
    <section className="flex flex-col ">
      <SearchAccueil />
      <OurSelection />
    </section>
  );
}

export default Accueil;
