import { useState } from "react";
import { Link } from "react-router-dom";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);

  return (
    <>
      <div className="min-h-screen bg-base-200 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Accounts</h1>

            <button className="btn btn-primary">+ Create Account</button>
          </div>

          <div className="grid gap-6">
            {accounts.map((account) => (
              <div key={account.id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="card-title text-2xl">{account.type}</h2>

                      <p className="text-gray-500 mt-2">Account Number</p>

                      <p className="font-semibold tracking-wider">
                        {account.accNo}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-gray-500">Available Balance</p>

                      <h2 className="text-3xl font-bold text-success">
                        ₹{account.balance.toLocaleString()}
                      </h2>
                    </div>
                  </div>

                  <div className="card-actions justify-end mt-5">
                    <Link
                      to={`/user/accounts/${account.id}`}
                      className="btn btn-outline"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Accounts;
