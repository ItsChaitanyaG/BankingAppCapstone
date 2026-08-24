import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-hot-toast";

const TransactionHistory = () => {

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const currentYear = new Date().getFullYear();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const { selectedAccount } = useOutletContext();
  const navigate = useNavigate();

  const filteredTransactions = transactions.filter((t) => {
    const date = new Date(t.createdAt);

    const matchedMonth = selectedMonth === "" || date.getMonth() === Number(selectedMonth);
    const matchedYear = selectedYear === "" || date.getFullYear() === Number(selectedYear);

    return matchedMonth && matchedYear;
  })

  useEffect(() => {
    if (!selectedAccount) return ;

    const getTransactions = async () => {
      try {
        const res = await api.get(`user/${selectedAccount.id}/transactions`);
        setTransactions(res.data.data);

      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load transaction history"
        );
      } finally {
        setLoading(false);
      }
    }

    getTransactions();

  }, [selectedAccount])

  if (loading) return <div className="flex justify-center items-center loading loading-spinner">Loading...</div>;


  return (
    <div className="min-h-screen bg-base-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">

        {/* Back */}
        <button
          className="btn btn-ghost mb-4 flex self-start"
          onClick={() => navigate("/user")}
        >
          ← Back
        </button>


        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Transaction History
          </h2>

          <p className="text-sm opacity-70 mt-1">
            View and filter your account transactions.
          </p>
        </div>


        {/* Filters */}
        <div className="rounded-box bg-base-100 p-4 sm:p-5 shadow-sm mb-6">

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">

            {/* Month */}
            <div className="flex flex-col gap-1 flex-1">
              <label className="label">
                Month
              </label>

              <select
                value={selectedMonth}
                onChange={(e) =>
                  setSelectedMonth(e.target.value)
                }
                className="select w-full"
              >
                <option value="">All months</option>

                {months.map((month, index) => (
                  <option
                    key={month}
                    value={index}
                  >
                    {month}
                  </option>
                ))}
              </select>
            </div>


            {/* Year */}
            <div className="flex flex-col gap-1 flex-1">
              <label className="label">
                Year
              </label>

              <select
                value={selectedYear}
                onChange={(e) =>
                  setSelectedYear(e.target.value)
                }
                className="select w-full"
              >
                <option value="">
                  All years
                </option>

                <option value={currentYear}>
                  {currentYear}
                </option>

                <option value={currentYear - 1}>
                  {currentYear - 1}
                </option>

                <option value={currentYear - 2}>
                  {currentYear - 2}
                </option>
              </select>
            </div>

          </div>
        </div>


        {/* Transactions */}
        <section className="rounded-box bg-base-100 p-4 sm:p-6 shadow-sm">

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg sm:text-xl font-semibold">
              Transactions
            </h3>

            <span className="text-sm opacity-60">
              {filteredTransactions.length} transaction
              {filteredTransactions.length !== 1 && "s"}
            </span>
          </div>


          {/* Table */}
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

                {filteredTransactions.length === 0 ? (

                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-8 opacity-60"
                    >
                      No transactions found.
                    </td>
                  </tr>

                ) : (

                  filteredTransactions.map((t) => {

                    const isDebit =
                      t.sender_id === selectedAccount?.id;

                    return (
                      <tr key={t.id}>

                        <th>
                          {t.id}
                        </th>

                        <td className="whitespace-nowrap">
                          {new Date(
                            t.createdAt
                          ).toLocaleString()}
                        </td>

                        <td className="whitespace-nowrap">
                          {t.receiver?.acc_no || "-"}
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

                  })

                )}

              </tbody>

            </table>

          </div>

        </section>

      </div>
    </div>
  );
};

export default TransactionHistory;
