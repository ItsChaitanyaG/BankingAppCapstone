import { useEffect, useState } from "react";
import api from "../../api/axios.js";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {

  const [customers, setCustomers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [kyc, setKyc] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const navigate = useNavigate();

  const today = new Date().toDateString();

  const todaysTransactions = transactions.filter((t) => new Date(t.createdAt).toDateString() === today).length;

  useEffect(() => {
    const dashboard = async() => {
      
      try {
        const res = await api.get("/admin/dashboard");
  
        const {customers, accounts, kyc, transactions} = res.data.data;
  
        setCustomers(customers);
        setAccounts(accounts);
        setKyc(kyc);
        setTransactions(transactions);
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to fetch dashboard data"
        )
      }
    }

    dashboard();
  }, [])

  return (
    <>
      <div className="min-h-screen bg-base-200 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Header */}
              <div>
                <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                <p className="text-base-content/70 mt-2">
                  Welcome back! Here's today's overview.
                </p>
              </div>

              {/* Stats */}
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <div className="stat bg-base-100 rounded-box shadow">
                  <div className="stat-title">Customers</div>
                  <div className="stat-value text-primary">{customers.length}</div>
                  <div className="stat-desc">Registered users</div>
                </div>

                <div className="stat bg-base-100 rounded-box shadow">
                  <div className="stat-title">Accounts</div>
                  <div className="stat-value text-secondary">{accounts.length}</div>
                  <div className="stat-desc">Active accounts</div>
                </div>

                <div className="stat bg-base-100 rounded-box shadow">
                  <div className="stat-title">Pending KYC</div>
                  <div className="stat-value text-warning">
                    {kyc.filter((K) => K.status === "PENDING").length}
                  </div>
                  <div className="stat-desc">Needs review</div>
                </div>

                <div className="stat bg-base-100 rounded-box shadow">
                  <div className="stat-title">Transactions</div>
                  <div className="stat-value text-success">
                    {todaysTransactions}
                  </div>
                  <div className="stat-desc">Completed today</div>
                </div>
              </div>

              {/* Middle */}
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Recent KYC */}
                <div className="card bg-base-100 shadow lg:col-span-2">
                  <div className="card-body">
                    <div className="flex justify-between items-center">
                      <h2 className="card-title">Recent KYC Requests</h2>

                      <Link className="btn btn-sm btn-outline" to="./kyc-requests">
                        
                          View All
                        
                      </Link>
                      
                    </div>

                    <div className="overflow-x-auto">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>User ID</th>
                            <th>Document</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th></th>
                          </tr>
                        </thead>

                        <tbody>
                          {kyc.slice(0,4).map((k) => (
                            <tr key={k.id}>
                              <td>{k.user_id}</td>
                              <td>{k.doc_type}</td>
                              <td>{k.createdAt}</td>

                              <td>
                                <div className="badge badge-warning">
                                  {k.status}
                                </div>
                              </td>

                              <td>
                                <Link className="btn btn-xs btn-primary" to={`./kyc-requests/${k.id}`}>
                                  Review
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="card bg-base-100 shadow">
                  <div className="card-body">
                    <h2 className="card-title">Quick Actions</h2>

                    <Link className="btn btn-primary" to="./kyc-requests">
                      Review Pending KYC
                    </Link>

                    <Link className="btn btn-primary" to="./customers">
                      View Customers
                    </Link>

                    <Link className="btn btn-primary" to="./transactions">
                      View Transactions
                    </Link>
                  </div>
                </div>
              </div>

              {/* Transactions */}
              <div className="card bg-base-100 shadow">
                <div className="card-body">
                  <div className="flex justify-between items-center">
                    <h2 className="card-title">Recent Transactions</h2>

                    <Link className="btn btn-sm btn-outline" to="./transactions">
                      View All
                    </Link>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>From</th>
                          <th>To</th>
                          <th>Amount</th>
                          <th>Remark</th>
                        </tr>
                      </thead>

                      <tbody>
                        {transactions.slice(0,4).map((t) => (
                          <tr key={t.id}>
                            <td>{t.id}</td>
                            <td>{t.sender_id}</td>
                            <td>{t.receiver_id}</td>
                            <td>₹{t.amount}</td>

                            <td>
                              {t?.remark || "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </>
  );
};

export default AdminDashboard;
