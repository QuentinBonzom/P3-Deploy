import { Outlet } from "react-router";
import { Toaster } from "sonner";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Header from "./components/Header";

import "./App.css";

function App() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <Header />
      <Banner />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
