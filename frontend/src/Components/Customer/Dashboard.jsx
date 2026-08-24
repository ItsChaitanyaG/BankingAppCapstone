
import { Link, useOutletContext } from "react-router-dom";
import useAuth from "../../Context/useAuth.js";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../api/axios.js"
import toast from 'react-hot-toast';
import ReactMarkdown from "react-markdown";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const { selectedAccount } = useOutletContext();
  const [transactions, setTransactions] = useState([]);
  const [insights, setInsights] = useState("");

  const getInsights = async () => {
    try {
      const res = await api.post("/user/smart-insight", { accountId: selectedAccount.id });

      setInsights(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to get insights");
    }
  }

  useEffect(() => {

    if (!selectedAccount) return;

    const getTransactions = async () => {

      try {
        const res = await api.get(`/user/${selectedAccount.id}/transactions`);

        setTransactions(res.data.data);
        setInsights("");
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
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">

      {/* ==================== SUMMARY ==================== */}
      <section className="summery-card rounded-box" data-theme="dark">

        {/* Welcome */}
        <div className="p-5 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Welcome {user.name}
          </h1>
        </div>

        {/* Quick Look */}
        <div className="px-5 pb-6 sm:px-8">
          <h2 className="mb-4 text-xl font-semibold">
            Quick Look
          </h2>

          <div className="stats stats-vertical lg:stats-horizontal w-full shadow">

            <div className="stat">
              <div className="stat-title">
                Account Number
              </div>

              <div className="stat-value text-lg sm:text-2xl break-all">
                {hasAccounts
                  ? selectedAccount?.acc_no
                  : "-"}
              </div>
            </div>


            <div className="stat">
              <div className="stat-title">
                Balance
              </div>

              <div className="stat-value text-lg sm:text-2xl">
                {hasAccounts
                  ? `₹${Number(selectedAccount?.balance || 0).toLocaleString("en-IN")}`
                  : "-"}
              </div>
            </div>


            <div className="stat">
              <div className="stat-title">
                KYC Status
              </div>

              <div className="stat-value text-lg sm:text-2xl">
                {user.kyc?.status ?? "Not Submitted"}
              </div>
            </div>


            <div className="stat">
              <div className="stat-title">
                Beneficiaries
              </div>

              <div className="stat-value text-lg sm:text-2xl">
                {hasAccounts
                  ? selectedAccount?.beneficiaries?.length ?? 0
                  : "-"}
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ==================== QUICK ACTIONS ==================== */}
      <section>
        <h2 className="mb-3 text-xl font-semibold">
          Quick Actions
        </h2>

        <ul
          className="
            menu
            menu-vertical
            sm:menu-horizontal
            bg-base-200
            rounded-box
            w-full
            gap-1
            sm:gap-2
          "
        >
          <li className="flex-1">
            <Link to="/user/transfer-money">
              Transfer Money
            </Link>
          </li>

          <li className="flex-1">
            <Link to="/user/transaction-history">
              View Transactions
            </Link>
          </li>

          <li className="flex-1">
            <Link to="/user/beneficiaries">
              Add Beneficiary
            </Link>
          </li>

          <li className="flex-1">
            <Link to="/user/profile">
              View Profile
            </Link>
          </li>
        </ul>
      </section>


      {/* ==================== SMART INSIGHTS ==================== */}
      <section className="rounded-box bg-base-200 p-5 sm:p-6">

        <h2 className="text-xl sm:text-2xl font-semibold">
          Smart Insights
        </h2>

        <p className="mt-1 text-sm opacity-70">
          Get transaction insights with AI
        </p>

        <button
          className="btn btn-primary mt-4"
          onClick={getInsights}
        >
          Get Insights
        </button>

        {insights && (
          <div className="prose prose-sm sm:prose mt-5 max-w-none">
            <ReactMarkdown>
              {insights}
            </ReactMarkdown>
          </div>
        )}

      </section>


      {/* ==================== RECENT TRANSACTIONS ==================== */}
      <section className="rounded-box bg-base-200 p-4 sm:p-6">

        <h2 className="mb-4 text-xl sm:text-2xl font-semibold">
          Recent Transactions
        </h2>

        <div className="overflow-x-auto">

          <table className="table table-zebra">

            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Counterparty</th>
                <th>Amount</th>
                <th>Remark</th>
              </tr>
            </thead>

            <tbody>

              {transactions.slice(0, 4).map((t) => {

                const isDebit =
                  t.sender_id === selectedAccount?.id;

                const counterparty =
                  t.receiver_id === selectedAccount?.id
                    ? t.sender?.acc_no
                    : t.receiver?.acc_no;

                return (
                  <tr key={t.id}>

                    <th>{t.id}</th>

                    <td className="whitespace-nowrap">
                      {new Date(
                        t.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      {counterparty || "-"}
                    </td>

                    <td
                      className={`font-semibold whitespace-nowrap ${
                        isDebit
                          ? "text-error"
                          : "text-success"
                      }`}
                    >
                      {isDebit ? "-" : "+"}
                      ₹{Number(t.amount).toLocaleString("en-IN")}
                    </td>

                    <td>
                      {t.remark || "-"}
                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
};

export default Dashboard;
