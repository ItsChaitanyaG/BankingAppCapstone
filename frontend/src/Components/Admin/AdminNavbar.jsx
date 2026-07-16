import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const AdminNavbar = () => {

  const navigate = useNavigate();

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm justify-between">
        <div className="flex justify-self-start">
          <Link className="btn btn-ghost text-xl " to="/admin">
            BTS
          </Link>
        </div>
        <div className="flex justify-self-end">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>Admin</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <Link to="/admin/customers">Customers</Link>
                  </li>
                  <li>
                    <Link to="/admin/kyc-requests">KYC Requests</Link>
                  </li>
                  <li>
                    <Link to="/admin/transactions">Transactions</Link>
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
    </>
  );
};

export default AdminNavbar;
