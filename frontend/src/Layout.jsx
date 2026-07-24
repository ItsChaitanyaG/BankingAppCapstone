import Footer from "./Components/Footer.jsx";
import Navbar from "./Components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import useAuth from "./Context/useAuth.js";
import { useState, useEffect } from "react";

export default function Layout() {
  const { user } = useAuth();

  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
      if (!user?.account?.length) {
        setSelectedAccount(null);
        return;
      }

    if (!selectedAccount) {
      setSelectedAccount(user.account[0]);
      return;
    }

    const updatedAccount = user.account.find((acc) => acc.id === selectedAccount.id);

    if (updatedAccount) {
      setSelectedAccount(updatedAccount);
    }
    }, [user]);

  return (
    <>
      <Navbar selectedAccount={selectedAccount} setSelectedAccount={setSelectedAccount} />
      <Outlet context={{selectedAccount, setSelectedAccount}}/>
      <Footer />
    </>
  );
}
