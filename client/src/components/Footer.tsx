import { Link } from "react-router";

function Footer() {
  return (
    <>
      <section className=" flex flex-row pb-5">
        <section className="flex flex-column justify-center gap-5 p-5 pt-10">
          <p>
            <a href="https://www.facebook.com/">
              <i className="text-4xl bi bi-facebook" />
            </a>
          </p>
          <p>
            <a href="https://www.instagram.com/">
              <i className="text-4xl bi bi-instagram" />
            </a>
          </p>
          <p>
            <a href="https://fr.pinterest.com/">
              {" "}
              <i className="text-4xl bi bi-pinterest" />
            </a>
          </p>
        </section>
        <section>
          <img src="../public/cook-bonjour.png" alt="bonjour" />
        </section>
        <section className="flex flex-column items-center gap-1">
          <Link to="/Contact">Contact</Link>
          <Link to="/Mentions_legales">Mentions légales</Link>

          <p className="font-semibold">
            <i className="text-xl bi bi-c-circle" /> Easy Cook
          </p>
        </section>
      </section>
    </>
  );
}

export default Footer;
