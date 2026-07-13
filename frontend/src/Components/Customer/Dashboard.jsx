
import { Link } from "react-router-dom";
import useAuth from "../../Context/useAuth.js";

const Dashboard = () => {
  const {user, loading} = useAuth

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Something went wrong.</div>
  }

  return (
    <>
      <div className="summery-card" data-theme="dark">
        <div className="m-15">
          <h1 className="justify-self-start">Welcome {user.name}</h1>
        </div>

        <div className="quick-look my-25">
          <h2 className="m-10">Quick Look</h2>

          <div className="stats stats-vertical lg:stats-horizontal shadow">
            <div className="stat">
              <div className="stat-title">Account Number</div>
              <div className="stat-value">xxxx-xxxx-xxxx</div>
              <div className="stat-desc"></div>
            </div>

            <div className="stat">
              <div className="stat-title">Balance</div>
              <div className="stat-value">$4,200.00</div>
              <div className="stat-desc"></div>
            </div>

            <div className="stat">
              <div className="stat-title">KYC Status</div>
              <div className="stat-value">Completed</div>
              <div className="stat-desc"></div>
            </div>

            <div className="stat">
              <div className="stat-title">Beneficiaries</div>
              <div className="stat-value">2</div>
              <div className="stat-desc"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-10" data-theme="dark">
        <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box gap-10">
          <li>
            <Link to="/user/transfer-money">Transfer Money</Link>
          </li>
          <li>
            <Link to="/user/transaction-history">View Transactions</Link>
          </li>
          <li>
            <Link to="/user/beneficiaries">Add Beneficiary</Link>
          </li>
          <li>
            <Link to="/user/profile">View Profile</Link>
          </li>
        </ul>
      </div>

      <div className="recent-transactions p-20">
        <h2 className="justify-self-start">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Date</th>
                <th>To</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>2023-05-15</td>
                <td>Cy Ganderton</td>
                <td>Success</td>
                <td>$100</td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>2</th>
                <td>2023-05-14</td>
                <td>Hart Hagerty</td>
                <td>Failed</td>
                <td>$50</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>2023-05-13</td>
                <td>Brice Swyre</td>
                <td>Success</td>
                <td>$100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
