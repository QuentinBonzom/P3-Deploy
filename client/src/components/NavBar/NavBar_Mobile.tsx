import { useState } from "react";
import { Link } from "react-router";

function NavBar_Mobile() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <section className="absolute top-5 right-5 ">
        <button
          type="button"
          className={`flex flex-col justify-between w-8 h-6 ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span
            className={`block h-1 w-full rounded transition-transform duration-300  ${
              isOpen ? "bg-primary transform rotate-45 translate-y-2.5 " : "bg-secondary"
            }`}
          />
          <span
            className={`block h-1 w-full rounded transition-opacity  ${
              isOpen ? "opacity-0" : "bg-secondary"
            }`}
          />
          <span
            className={`block h-1 w-full rounded transition-transform duration-300 ${
              isOpen ? "bg-primary transform -rotate-45 -translate-y-2.5" : "bg-secondary"
            }`}
          />
        </button>
      </section>

      {isOpen && (
        <div className=" absolute w-[40%] right-0 shadow-2xl pt-2 bg-[#fde9cc] rounded-bl-2xl z-3">
          <div className="font-semibold pb-4 text-right ">
            <Link
              to="/Recettes"
              className=" mr-8 mt-2 block"
              onClick={() => setIsOpen(false)}
            >
              Recettes
            </Link>

            <span className="block border-t border-[#dd682d] my-3" />

            <Link
              to="/Courses"
              className=" mr-8 mt-2 block"
              onClick={() => setIsOpen(false)}
            >
              Mes courses
            </Link>

            <span className="block border-t border-[#dd682d] my-3" />

            <Link
              to="/A_propos"
              className=" mr-8 mt-2 block"
              onClick={() => setIsOpen(false)}
            >
              A propos
            </Link>

            <span className="block border-t border-[#dd682d] my-3" />

            <Link
              to="/Mixer"
              className=" mr-8 mt-2 block"
              onClick={() => setIsOpen(false)}
            >
              Mixer
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar_Mobile;
