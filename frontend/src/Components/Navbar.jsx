import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Context/useAuth";
import api from "../api/axios";
import { toast } from "react-hot-toast";

const Navbar = ({ selectedAccount, setSelectedAccount }) => {
  const { user, setUser } = useAuth();
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

  return (
    <>
      <div>
        <div className="navbar bg-base-300 shadow-sm flex justify-between">
          <div className="flex justify-self-start">
            <span className="m-2 font-bold text-white">NeoBank</span>
            <Link to="/user/" className="btn btn-ghost text-l">
              Dashboard
            </Link>
          </div>
          <div className="flex self-justify-end">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/user/kyc">KYC</Link>
              </li>

              <li>
                <details>
                  <summary>{selectedAccount ? `${selectedAccount.acc_no}` : "No Account"}</summary>
                  <ul className="bg-base-100 rounded-t-none p-2">
                    {
                      user.account?.length === 0 ? (
                        <li>No Account</li>
                      ) : (
                        user.account?.map((acc) => (
                          <li key={acc.id}>
                            <button onClick={() => setSelectedAccount(acc)}>{acc.acc_no}</button>
                          </li>
                        ))
                      )
                    }

                  </ul>
                </details>
              </li>

              <li>
                <details>
                  <summary>User</summary>
                  <ul className="bg-base-100 rounded-t-none p-2">
                    <li>
                      <Link to="/user/profile">Profile</Link>
                    </li>
                    <li>
                      <Link to="/user/transfer-money">Transfer Money</Link>
                    </li>
                    <li>
                      <Link to="/user/transaction-history">
                        Transaction History
                      </Link>
                    </li>
                    <li>
                      <Link to="/user/accounts">Accounts</Link>
                    </li>
                    <li>
                      <Link to="/user/beneficiaries">Beneficiaries</Link>
                    </li>
                    <li>
                      <button onClick={logout}>Logout</button>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
