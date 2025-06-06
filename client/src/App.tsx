import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <>
      <section>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </section>
    </>
  );
}

export default App;
