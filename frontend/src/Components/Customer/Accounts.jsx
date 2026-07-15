import { useState } from "react";
import useAuth from "../../Context/useAuth";
import { Link } from "react-router-dom";

import api from "../../api/axios.js";


const Accounts = () => {
  const { user, loading, refreshUser } = useAuth();

  const [accountType, setAccountType] = useState("");
  const [openingBalance, setOpeningBalance] = useState(0);

  if(loading) return <div>Loading...</div>;

  if (!user.account) return null;

  const createAccount = async () => {
    if (!user.kyc) {
      alert("Please complete your KYC first");
      return;
    }

    if (user.kyc === "PENDING" || user.kyc === "REJECTED") {
      alert("Your KYC is pending or rejected");
      return;
    }

    if (!accountType || Number(openingBalance) <= 0) {
      alert("Account type and opening balance are required");
      return;
    }

    try {
      await api.post("/user/account/addAccount", { accountType, openingBalance: Number(openingBalance) })

      await refreshUser();
      alert("Account created successfully");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-base-200 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Accounts</h1>

            <button className="btn btn-primary" onClick={()=>document.getElementById('my_modal_3').showModal()}>+ Create Account</button>

            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Create Account</h3>

                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 justify-self-center">


                  <label className="label">Account Type</label>
                  <select className="select" value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                    <option disabled={true}>Pick a type</option>
                    <option>SAVINGS</option>
                    <option>CURRENT</option>
                  </select>

                  <label className="label">Opening Balance</label>
                  <input type="number" className="input" placeholder={
                      accountType === "SAVINGS"
                        ? "Minimum ₹1000"
                        : "Minimum ₹5000"
                    } min={accountType === "SAVINGS" ? 1000 : 5000} value={openingBalance} onChange={(e) => setOpeningBalance(e.target.value)} />

                  <button className="btn btn-primary" onClick={createAccount}>Create Account</button>
                </fieldset>
              </div>
            </dialog>
          </div>

          <div className="grid gap-6">
            {user.account?.map((account) => (
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
