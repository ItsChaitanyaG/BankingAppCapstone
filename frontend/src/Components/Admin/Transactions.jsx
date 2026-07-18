import { useEffect } from "react";
import { useState } from "react";
import api from "../../api/axios";

const Transactions = () => {

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getTransactions = async() => {
      try {
        const res = await api.get("/transactions");
        setTransactions(res.data.data)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getTransactions();
  }, [])

  if(loading) return <>Loading...</>;

  return (
    <>
      <div className="m-15">
        <h1 className="justify-self-start">Transactions</h1>

        <div className="m-15 overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>ID</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Remark</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <th>{ t.id }</th>
                  <td>{t.sender.acc_no}</td>
                  <td>{t.receiver.acc_no}</td>
                  <td>{t.amount}</td>
                  <td>{new Date(t.createdAt).toLocaleString()}</td>
                  <td>{t.remark || "-"}</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Transactions;
