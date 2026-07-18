import { useEffect } from "react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../../api/axios";

const TransactionHistory = () => {

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedAccount } = useOutletContext();

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const res = await api.get(`/${selectedAccount.id}/transactions`);
        setTransactions(res.data.data);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getTransactions();

    if (!selectedAccount) return <div>Please select an account</div>;
  }, [selectedAccount])

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div>
        <div className="flex justify-items-start m-15">
          <h2>Transaction History</h2>
        </div>
        <div>
          <div className="flex justify-center gap-5 my-15">
            <select defaultValue="Month" className="select">
              <option disabled={true}>Month</option>
              <option>June</option>
              <option>May</option>
              <option>April</option>
            </select>

            <select defaultValue="Year" className="select">
              <option disabled={true}>Year</option>
              <option>2026</option>
              <option>2025</option>
              <option>2024</option>
            </select>

            <button className="btn btn-soft btn-info">Filter</button>
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
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (

                  <tr key={t.id}>
                    <th>{ t.id }</th>
                    <td>{new Date(t.createdAt).toLocaleString()}</td>
                    <td>{t.receiver.acc_no}</td>
                    <td>{t.amount}</td>
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
