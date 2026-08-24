import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Context/useAuth";
import api from "../api/axios";
import { toast } from "react-hot-toast";
import { useRef } from "react";

const Navbar = ({ selectedAccount, setSelectedAccount }) => {
  const { user, setUser } = useAuth();
  const menuRef = useRef(null);
  const navigate = useNavigate();

  if (!user) return null;

  const logout = async () => {
    try {
      await toast.promise(
        api.post("/auth/logout"),
        {
          loading: "Logging out...",
          success: "Logged out successfully!",
          error: (err) =>
            err.response?.data?.message || "Logout failed",
        }
      );

      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const closeMenu = () => {
    if(menuRef.current){
      menuRef.current.open = false;
    }
  };

  // return (
  //   <>
  //     <div>
  //       <div className="navbar bg-base-300 shadow-sm flex justify-between">
  //         <div className="flex justify-self-start">
  //           <span className="m-2 font-bold text-white">NeoBank</span>
  //           <Link to="/user/" className="btn btn-ghost text-l">
  //             Dashboard
  //           </Link>
  //         </div>
  //         <div className="flex self-justify-end">
  //           <ul className="menu menu-horizontal px-1">
  //             <li>
  //               <Link to="/user/kyc">KYC</Link>
  //             </li>

  //             <li>
  //               <details ref={menuRef}>
  //                 <summary>{selectedAccount ? `${selectedAccount.acc_no}` : "No Account"}</summary>
  //                 <ul className="bg-base-100 rounded-t-none p-2">
  //                   {
  //                     user.account?.length === 0 ? (
  //                       <li onClick={closeMenu}>No Account</li>
  //                     ) : (
  //                       user.account?.map((acc) => (
  //                         <li key={acc.id}>
  //                           <button onClick={() => setSelectedAccount(acc)}>{acc.acc_no} </button>
  //                         </li>
  //                       ))
  //                     )
  //                   }

  //                 </ul>
  //               </details>
  //             </li>

  //             <li>
  //               <details ref={menuRef}>
  //                 <summary>User</summary>
  //                 <ul className="bg-base-100 rounded-t-none p-2">
  //                   <li>
  //                     <Link to="/user/profile" onClick={closeMenu}>Profile</Link>
  //                   </li>
  //                   <li>
  //                     <Link to="/user/transfer-money" onClick={closeMenu}>Transfer Money</Link>
  //                   </li>
  //                   <li>
  //                     <Link to="/user/transaction-history" onClick={closeMenu}>
  //                       Transaction History
  //                     </Link>
  //                   </li>
  //                   <li>
  //                     <Link to="/user/deposit-withdraw" onClick={closeMenu}>Deposit/Withdraw</Link>
  //                   </li>
  //                   <li>
  //                     <Link to="/user/accounts" onClick={closeMenu}>Accounts</Link>
  //                   </li>
  //                   <li>
  //                     <Link to="/user/beneficiaries" onClick={closeMenu}>Beneficiaries</Link>
  //                   </li>
  //                   <li>
  //                     <button onClick={logout}>Logout</button>
  //                   </li>
  //                 </ul>
  //               </details>
  //             </li>
  //           </ul>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
  //
  return (
    <div className="navbar bg-base-300 shadow-sm px-3 md:px-6">

      {/* Left side */}
      <div className="flex items-center gap-2">
        <Link
          to="/user/"
          className="font-bold text-white text-lg"
        >
          NeoBank
        </Link>

        {/* Desktop KYC */}
        <Link
          to="/user/kyc"
          className="btn btn-ghost hidden md:flex"
        >
          KYC
        </Link>
      </div>


      {/* Right side */}
      <div className="ml-auto flex items-center gap-1">

        {/* Account selector - visible on ALL screen sizes */}
        <details
          className="dropdown dropdown-end"
          ref={menuRef}
        >
          <summary className="btn btn-ghost">
            <span className="hidden sm:inline">
              Account:
            </span>

            {selectedAccount
              ? selectedAccount.acc_no
              : "No Account"}
          </summary>

          <ul className="menu dropdown-content bg-base-100 rounded-box z-50 mt-2 w-56 p-2 shadow">

            {user.account?.length === 0 ? (
              <li>
                <button onClick={closeMenu}>
                  No Account
                </button>
              </li>
            ) : (
              user.account?.map((acc) => (
                <li key={acc.id}>
                  <button
                    onClick={() => {
                      setSelectedAccount(acc);
                      closeMenu();
                    }}
                  >
                    {acc.acc_no}
                  </button>
                </li>
              ))
            )}

          </ul>
        </details>


        {/* Desktop user menu */}
        <details className="dropdown dropdown-end hidden md:block">
          <summary className="btn btn-ghost">
            User
          </summary>

          <ul className="menu dropdown-content bg-base-100 rounded-box z-50 mt-2 w-60 p-2 shadow">

            <li>
              <Link to="/user/profile" onClick={closeMenu}>
                Profile
              </Link>
            </li>

            <li>
              <Link to="/user/transfer-money" onClick={closeMenu}>
                Transfer Money
              </Link>
            </li>

            <li>
              <Link
                to="/user/transaction-history"
                onClick={closeMenu}
              >
                Transaction History
              </Link>
            </li>

            <li>
              <Link
                to="/user/deposit-withdraw"
                onClick={closeMenu}
              >
                Deposit / Withdraw
              </Link>
            </li>

            <li>
              <Link to="/user/accounts" onClick={closeMenu}>
                Accounts
              </Link>
            </li>

            <li>
              <Link to="/user/beneficiaries" onClick={closeMenu}>
                Beneficiaries
              </Link>
            </li>

            <li>
              <button onClick={logout}>
                Logout
              </button>
            </li>

          </ul>
        </details>


        {/* Mobile hamburger */}
        <details className="dropdown dropdown-end md:hidden">
          <summary className="btn btn-square btn-ghost">
            ☰
          </summary>

          <ul className="menu dropdown-content bg-base-100 rounded-box z-50 mt-2 w-64 p-2 shadow">

            <li>
              <Link to="/user/" onClick={closeMenu}>
                Dashboard
              </Link>
            </li>

            <li>
              <Link to="/user/kyc" onClick={closeMenu}>
                KYC
              </Link>
            </li>

            <li>
              <Link to="/user/profile" onClick={closeMenu}>
                Profile
              </Link>
            </li>

            <li>
              <Link to="/user/transfer-money" onClick={closeMenu}>
                Transfer Money
              </Link>
            </li>

            <li>
              <Link
                to="/user/transaction-history"
                onClick={closeMenu}
              >
                Transaction History
              </Link>
            </li>

            <li>
              <Link
                to="/user/deposit-withdraw"
                onClick={closeMenu}
              >
                Deposit / Withdraw
              </Link>
            </li>

            <li>
              <Link to="/user/accounts" onClick={closeMenu}>
                Accounts
              </Link>
            </li>

            <li>
              <Link to="/user/beneficiaries" onClick={closeMenu}>
                Beneficiaries
              </Link>
            </li>

            <li>
              <button onClick={logout}>
                Logout
              </button>
            </li>

          </ul>
        </details>

      </div>
    </div>
  );
};

export default Navbar;
