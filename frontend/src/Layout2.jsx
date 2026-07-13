import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer.jsx";
import AdminNavbar from "./Components/Admin/AdminNavbar.jsx";

const Layout2 = () => {
  return (
    <div>
      <AdminNavbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout2;
