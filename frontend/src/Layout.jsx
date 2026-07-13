import Footer from "./Components/Footer.jsx";
import Navbar from "./Components/Navbar.jsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
