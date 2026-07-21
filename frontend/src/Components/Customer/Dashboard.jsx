
import { Link, useOutletContext } from "react-router-dom";
import useAuth from "../../Context/useAuth.js";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../api/axios.js"
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const { selectedAccount } = useOutletContext();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {

    if (!selectedAccount) return;

    const getTransactions = async () => {

      try {
        const res = await api.get(`/user/${selectedAccount.id}/transactions`);

        setTransactions(res.data.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch transactions"
        )
      }
    }
    getTransactions();
  },[selectedAccount])

  if (loading) {
    return <div className="loading loading-spinner">Loading...</div>;
  }

  if (!user ) {
    return <div>Something went wrong.</div>
  }

  const hasAccounts = user.account?.length > 0;

  if (hasAccounts && !selectedAccount) {
    return <div className="loading loading-spinner">Loading...</div>;
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
              <div className="stat-value">{hasAccounts? selectedAccount.acc_no : "-"}</div>
              <div className="stat-desc"></div>
            </div>

            <div className="stat">
              <div className="stat-title">Balance</div>
              <div className="stat-value">{hasAccounts ? selectedAccount.balance : "-"}</div>
              <div className="stat-desc"></div>
            </div>

            <div className="stat">
              <div className="stat-title">KYC Status</div>
              <div className="stat-value">{user.kyc?.status ?? "Not Submitted"}</div>
              <div className="stat-desc"></div>
            </div>

            <div className="stat">
              <div className="stat-title">Beneficiaries</div>
              <div className="stat-value">{hasAccounts ? selectedAccount.beneficiaries.length : "-"}</div>
              <div className="stat-desc"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="" data-theme="dark">
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
                <th>Counterparty</th>
                <th>Amount</th>
                <th>Remark</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 4).map((t) => (
                <tr key={t.id}>
                  <th>{t.id}</th>
                  <td>{t.createdAt}</td>
                  <td>{t.receiver_id === selectedAccount.id ? t.sender.acc_no : t.receiver.acc_no}</td>
                  <td>{t.amount}</td>
                  <td>{t.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
