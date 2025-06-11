import { useState } from "react";

function NavBar_Mobile() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <section className="absolute top-5 right-5">
        <button
          type="button"
          className={`flex flex-col justify-between w-8 h-6 ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span
            className={`block h-1 w-full bg-black rounded transition-transform duration-300 ${
              isOpen ? "transform rotate-45 translate-y-2.5" : ""
            }`}
          />
          <span
            className={`block h-1 w-full bg-black rounded transition-opacity  ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-1 w-full bg-black rounded transition-transform duration-300 ${
              isOpen ? "transform -rotate-45 -translate-y-2.5" : ""
            }`}
          />
        </button>
      </section>

      {isOpen && (
        <ul className="">
          <li>
            <a href="#hello" className="">
              Recette
            </a>
          </li>
          <li>
            <a href="#hello" className="">
              Mes Courses
            </a>
          </li>
          <li>
            <a href="#hello" className="">
              A Propos
            </a>
          </li>
          <li>
            <a href="#hello" className="">
              Mixer
            </a>
          </li>
        </ul>
      )}
    </>
  );
}

export default NavBar_Mobile;
