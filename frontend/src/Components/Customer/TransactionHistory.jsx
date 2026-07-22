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
    <>
      <div className="m-20">
        <button className="btn btn-ghost mb-6 flex justify-self-start" onClick={() => navigate("/user")}>← Back</button>

        <div className="flex justify-items-start m-15">
          <h2>Transaction History</h2>
        </div>
        <div>
          <div className="flex justify-center gap-5 my-15">
            <label className="label">Month</label>
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="select">
              <option value="">None</option>
              {months.map((month, index) => (
                <option key={month} value={index}>{month}</option>
              ))}
            </select>

            <label className="label">Year</label>
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="select">
              <option value="">None</option>
              <option>{currentYear}</option>
              <option>{currentYear - 1}</option>
              <option>{currentYear - 2}</option>
            </select>
          </div>

          <div className="overflow-x-auto m-15 flex justify-center">
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
                {filteredTransactions.map((t) => (

                  <tr key={t.id}>
                    <th>{ t.id }</th>
                    <td>{new Date(t.createdAt).toLocaleString()}</td>
                    <td>{t.receiver.acc_no}</td>
                    <td>₹{t.amount}</td>
                    <td>{t.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionHistory;
