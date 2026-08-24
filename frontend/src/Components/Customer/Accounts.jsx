import { useState } from "react";
import useAuth from "../../Context/useAuth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios.js";


const Accounts = () => {
  const { user, loading, refreshUser } = useAuth();

  const [accountType, setAccountType] = useState("");
  const [openingBalance, setOpeningBalance] = useState(0);
  const navigate = useNavigate();

  if(loading) return <div className="loading loading-spinner">Loading...</div>;

  if (!user.account) return null;

  const createAccount = async () => {
    if (!user.kyc) {
      toast.error("Please complete your KYC first.");
      return;
    }

    if (
      user.kyc.status === "PENDING" ||
      user.kyc.status === "REJECTED"
    ) {
      toast.error("Your KYC is pending or rejected.");
      return;
    }

    if (!accountType || Number(openingBalance) <= 0) {
      toast.error("Account type and opening balance are required.");
      return;
    }

    try {
      await toast.promise(
        api.post("/user/account/addAccount", {
          accType: accountType,
          openingBalance: Number(openingBalance),
        }),
        {
          loading: "Creating account...",
          success: "Account created successfully!",
          error: (err) =>
            err.response?.data?.message || "Failed to create account",
        }
      );

      await refreshUser();
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="min-h-screen bg-base-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <button
          className="btn btn-ghost mb-4 flex self-start"
          onClick={() => navigate("/user")}
        >
          ← Back
        </button>


        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">

          <h1 className="text-2xl sm:text-3xl font-bold">
            My Accounts
          </h1>

          <button
            className="btn btn-primary w-full sm:w-auto"
            onClick={() =>
              document.getElementById("my_modal_3").showModal()
            }
          >
            + Create Account
          </button>

        </div>


        {/* Create Account Modal */}
        <dialog
          id="my_modal_3"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box w-full max-w-md">

            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>

            <h3 className="font-bold text-xl">
              Create Account
            </h3>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 mt-5">

              <label className="label">
                Account Type
              </label>

              <select
                className="select w-full"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <option value="" disabled>
                  Pick a type
                </option>

                <option value="SAVINGS">
                  SAVINGS
                </option>

                <option value="CURRENT">
                  CURRENT
                </option>
              </select>


              <label className="label mt-2">
                Opening Balance
              </label>

              <input
                type="number"
                className="input w-full"
                placeholder={
                  accountType === "SAVINGS"
                    ? "Minimum ₹1000"
                    : "Minimum ₹5000"
                }
                min={
                  accountType === "SAVINGS"
                    ? 1000
                    : 5000
                }
                value={openingBalance}
                onChange={(e) =>
                  setOpeningBalance(e.target.value)
                }
              />


              <button
                className="btn btn-primary mt-4"
                onClick={createAccount}
              >
                Create Account
              </button>

            </fieldset>

          </div>
        </dialog>


        {/* Note */}
        <p className="text-sm opacity-70 mb-5">
          Note: Only two accounts can be created per customer,
          regardless of account type.
        </p>


        {/* Accounts */}
        <div className="grid gap-5">

          {user.account?.map((account) => (

            <div
              key={account.id}
              className="card bg-base-100 shadow-xl"
            >

              <div className="card-body">

                {/* Account information */}
                <div className="flex flex-col md:flex-row md:justify-between gap-6">

                  {/* Account */}
                  <div className="flex-1">

                    <h2 className="card-title text-xl sm:text-2xl">
                      {account.type}
                    </h2>

                    <p className="text-sm text-base-content/60 mt-3">
                      Account Number
                    </p>

                    <p className="font-semibold tracking-wider break-all">
                      {account.acc_no}
                    </p>

                  </div>


                  {/* Type */}
                  <div className="md:text-center">

                    <p className="text-sm text-base-content/60">
                      Account Type
                    </p>

                    <p className="font-semibold tracking-wider">
                      {account.acc_type}
                    </p>

                  </div>


                  {/* Balance */}
                  <div className="md:text-right">

                    <p className="text-sm text-base-content/60">
                      Available Balance
                    </p>

                    <h2 className="text-2xl sm:text-3xl font-bold text-success">
                      ₹{Number(account.balance).toLocaleString("en-IN")}
                    </h2>

                  </div>

                </div>


                {/* Button */}
                <div className="card-actions justify-start md:justify-end mt-5">

                  <Link
                    to={`/user/accounts/${account.id}`}
                    className="btn btn-outline w-full sm:w-auto"
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
  );
};

export default Accounts;
