import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useOutletContext } from "react-router-dom";
import api from "../../api/axios";
import useAuth from "../../Context/useAuth";

const DepositWithdraw = () => {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const { refreshUser } = useAuth();
  const { selectedAccount } = useOutletContext();
  const navigate = useNavigate();

  if (!selectedAccount) return <div>Select an account to deposit or withdraw from.</div>;

  const handleDeposit = async () => {
    if (!depositAmount || depositAmount <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    if(depositAmount > 100000) {
      toast.error("Deposit limit is 100,000");
      return;
    }

    try {
      await toast.promise(
        api.patch("/user/deposit", {accountId: selectedAccount.id, amount: depositAmount}),
        {
          loading: "Processing deposit...",
          success: "Deposit successful!",
          error: (err) =>
            err.response?.data?.message || "Deposit failed",
        }
      )

      await refreshUser();

      setDepositAmount("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleWithdraw = async () => {
    if(!withdrawAmount || withdrawAmount <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    if(withdrawAmount > 100000) {
      toast.error("Withdraw limit is 100,000");
      return;
    }

    if(withdrawAmount > selectedAccount.balance) {
      toast.error("Insufficient funds");
      return;
    }

    try {
      await toast.promise(
        api.patch("/user/withdraw", {accountId: selectedAccount.id, amount: withdrawAmount}),
        {
          loading: "Processing withdraw...",
          success: "Withdraw successful!",
          error: (err) =>
            err.response?.data?.message || "Withdraw failed",
        }
      )

      await refreshUser();

      setWithdrawAmount("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-5xl mx-auto">

        <button className="btn btn-ghost mb-6 flex justify-self-start" onClick={() => navigate("/user")}>← Back</button>

        <h1 className="text-4xl font-bold mb-8">
          Deposit & Withdraw
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Deposit */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">

              <h2 className="card-title text-success">
                Deposit Money
              </h2>

              <fieldset className="fieldset">
                <label className="label">Amount</label>
                <input
                  type="number"
                  className="input w-full"
                  placeholder="Enter amount"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                />
              </fieldset>

              <div className="mt-6">
                <button className="btn btn-success w-full" onClick={handleDeposit}>
                  Deposit
                </button>
              </div>

            </div>
          </div>

          {/* Withdraw */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">

              <h2 className="card-title text-error">
                Withdraw Money
              </h2>

              <fieldset className="fieldset">
                <label className="label">Amount</label>
                <input
                  type="number"
                  className="input w-full"
                  placeholder="Enter amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </fieldset>

              <div className="mt-6">
                <button className="btn btn-error w-full" onClick={handleWithdraw}>
                  Withdraw
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Notes */}
        <div className="card bg-base-100 shadow mt-8">
          <div className="card-body">
            <h2 className="card-title">
              Transaction Rules
            </h2>

            <ul className="list-disc list-inside space-y-2 text-base-content/70">
              <li>Maximum deposit per transaction: ₹100,000</li>
              <li>Maximum withdrawal per transaction: ₹100,000</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DepositWithdraw;
