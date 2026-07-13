import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div>
        <div className="navbar bg-base-300 shadow-sm flex justify-between">
          <div className="flex justify-self-start">
            <Link to="/user/" className="btn btn-ghost text-xl">
              BTS
            </Link>
          </div>
          <div className="flex self-justify-end">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/user/kyc">KYC</Link>
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
                      <a>Logout</a>
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
