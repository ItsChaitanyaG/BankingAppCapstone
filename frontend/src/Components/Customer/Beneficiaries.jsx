import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";
import useAuth from "../../Context/useAuth";

const Beneficiaries = () => {

  const { selectedAccount } = useOutletContext();
  const [beneficiaries, setBeneficiaries] = useState([]);
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const [name, setName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [maxLimit, setMaxLimit] = useState("");

  const getBeneficiaries = async () => {
    if (!selectedAccount) {
      setBeneficiaries([]);
      return;
    }

    try {
      const res = await api.get(`/user/beneficiaries/${selectedAccount.id}`);
      setBeneficiaries(res.data.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch beneficiaries"
      )
    }
  }

  const addBeneficiary = async () => {
    if (!name || !bankName || !accountNumber || !maxLimit) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      await toast.promise(
        api.post(`/user/beneficiaries/${selectedAccount.id}`, {
          name,
          bank_name: bankName,
          account_no: accountNumber,
          max_limit: Number(maxLimit),
        }),
        {
          loading: "Adding beneficiary...",
          success: "Beneficiary added successfully!",
          error: (err) =>
            err.response?.data?.message || "Failed to add beneficiary",
        }
      );

      await getBeneficiaries();

      setName("");
      setBankName("");
      setAccountNumber("");
      setMaxLimit("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBeneficiaries();
  }, [selectedAccount])


  return (
    <div className="p-4 sm:p-6 lg:p-8">

      {/* Back */}
      <button
        className="btn btn-ghost mb-4 flex self-start"
        onClick={() => navigate("/user")}
      >
        ← Back
      </button>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Beneficiaries
        </h1>

        <p className="mt-2 text-sm opacity-70 max-w-3xl">
          Note: Other beneficiaries can be added to your account.
          Currently, beneficiaries with accounts in this bank are
          enabled for transactions.
        </p>
      </div>


      {/* Beneficiary List */}
      <section className="rounded-box bg-base-200 p-4 sm:p-6">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-xl font-semibold">
            Beneficiaries
          </h2>

          <button
            className="btn btn-primary w-full sm:w-auto"
            onClick={() =>
              document.getElementById("my_modal_5").showModal()
            }
          >
            + Add Beneficiary
          </button>
        </div>


        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table table-zebra">

            <thead>
              <tr>
                <th>#</th>
                <th>Account Number</th>
                <th>Beneficiary Name</th>
                <th>Max Limit</th>
              </tr>
            </thead>

            <tbody>
              {beneficiaries.map((b) => (
                <tr key={b.id}>

                  <th>{b.id}</th>

                  <td className="whitespace-nowrap">
                    {b.account_no}
                  </td>

                  <td>
                    {b.name}
                  </td>

                  <td className="whitespace-nowrap">
                    ₹{Number(b.max_limit).toLocaleString("en-IN")}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </section>


      {/* Add Beneficiary Modal */}
      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box w-full max-w-lg">

          <h3 className="font-bold text-xl">
            Add Beneficiary
          </h3>

          <p className="text-sm opacity-70 mt-1">
            Enter the beneficiary details below.
          </p>


          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 mt-5">

            {/* Name */}
            <label className="label">
              Name
            </label>

            <input
              type="text"
              className="input w-full"
              placeholder="Beneficiary name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />


            {/* Bank */}
            <label className="label mt-2">
              Bank Name
            </label>

            <input
              type="text"
              className="input w-full"
              placeholder="Bank name"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
            />


            {/* Account Number */}
            <label className="label mt-2">
              Account Number
            </label>

            <input
              type="number"
              className="input w-full"
              placeholder="Account number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />


            {/* Max Limit */}
            <label className="label mt-2">
              Max Transfer Limit
            </label>

            <input
              type="number"
              className="input w-full"
              placeholder="Maximum transfer limit"
              value={maxLimit}
              onChange={(e) => setMaxLimit(e.target.value)}
            />

          </fieldset>


          {/* Modal buttons */}
          <div className="modal-action flex-col-reverse sm:flex-row">

            <form method="dialog">
              <button className="btn w-full sm:w-auto">
                Close
              </button>
            </form>

            <button
              className="btn btn-primary w-full sm:w-auto"
              onClick={addBeneficiary}
            >
              Add Beneficiary
            </button>

          </div>

        </div>
      </dialog>

    </div>
  );
};

export default Beneficiaries;
