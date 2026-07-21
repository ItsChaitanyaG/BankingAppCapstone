import { useState } from "react";
import api from "../../api/axios.js";
import { useNavigate, useOutletContext } from "react-router-dom";
import useAuth from "../../Context/useAuth.js";
import toast from "react-hot-toast";

const TransferMoney = () => {

  const { refreshUser } = useAuth();
  const navigate = useNavigate();

  const [beneficiary, setBeneficiary] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const { selectedAccount } = useOutletContext();

  if (!selectedAccount) {
      return <div>Please select an account.</div>;
  }

  const beneficiaries = selectedAccount.beneficiaries || [];

  const transfer = async () => {
    if (!accountNumber || !amount) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await toast.promise(
        api.patch(`user/${selectedAccount.id}/transfer`, {
          accountNo: accountNumber,
          amount,
          remark,
        }),
        {
          loading: "Processing transfer...",
          success: "Money transferred successfully!",
          error: (err) =>
            err.response?.data?.message || "Transfer failed",
        }
      );

      await refreshUser();

      setBeneficiary("");
      setAccountNumber("");
      setAmount("");
      setRemark("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="m-20">
        <button className="btn btn-ghost mb-6 flex justify-self-start" onClick={() => navigate(-1)}>← Back</button>
        <h1>Transfer Money</h1>

        <div className="flex-col justify-items-center p-10">
          <form>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
              <legend className="fieldset-legend"></legend>

              <legend className="fieldset-legend">Beneficiary</legend>
              <select value={beneficiary} onChange={(e) => { setBeneficiary(e.target.value); setAccountNumber(e.target.value); }} className="select">
                <option value="">None</option>
                {beneficiaries.map((b) => (
                  <option key={ b.id } value={b.account_no}>{b.name}</option>
                ))}

              </select>
              <span className="label">OR</span>

              <label className="label">Account Number</label>
              <input
                type="number"
                className="input"
                placeholder="Type Account Number Here"
                value={accountNumber}
                onChange={(e) => { setAccountNumber(e.target.value); setBeneficiary(""); }}
              />

              <label className="label">Amount</label>
              <input
                type="number"
                className="input"
                placeholder="Type Amount Here"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <legend className="fieldset-legend">Remark</legend>
              <textarea
                className="textarea h-24"
                placeholder="Type Remark Here"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
              ></textarea>
              <div className="label">Optional</div>

              <button type="button" className="btn btn-soft btn-primary" onClick={transfer}>Transfer</button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default TransferMoney;
