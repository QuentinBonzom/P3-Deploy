import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <section>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </section>
      </div>
    </>
  );
}

export default App;
