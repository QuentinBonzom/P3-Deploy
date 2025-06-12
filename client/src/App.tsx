import { Outlet } from "react-router";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Header from "./components/Header";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Banner />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
