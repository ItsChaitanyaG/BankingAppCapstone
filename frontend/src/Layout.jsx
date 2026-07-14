import Footer from "./Components/Footer.jsx";
import Navbar from "./Components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import useAuth from "./Context/useAuth.js";
import { useState, useEffect } from "react";

export default function Layout() {
  const { user } = useAuth();

  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
      if (user?.account?.length > 0 && !selectedAccount) {
        setSelectedAccount(user.account[0]);
      }
    }, [user, selectedAccount]);

  return (
    <>
      <Navbar selectedAccount={selectedAccount} setSelectedAccount={setSelectedAccount} />
      <Outlet context={{selectedAccount, setSelectedAccount}}/>
      <Footer />
    </>
  );
}
