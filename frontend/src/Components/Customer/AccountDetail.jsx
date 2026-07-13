import { useState } from "react";

const AccountDetail = () => {
  const [account, setAccount] = useState();

  return (
    <>
      <div className="min-h-screen bg-base-200 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Account Details</h1>

            <button
              className="btn btn-primary"
              onClick={() =>
                document.getElementById("beneficiary_modal").showModal()
              }
            >
              + Add Beneficiary
            </button>
          </div>

          {/* Account Card */}
          <div className="card bg-base-100 shadow-xl mb-8">
            <div className="card-body">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Account Number</p>
                  <h2 className="text-xl font-semibold">104567891234</h2>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Account Type</p>
                  <h2 className="text-xl font-semibold">Savings</h2>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Available Balance</p>
                  <h2 className="text-3xl font-bold text-success">₹1,25,430</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Beneficiaries */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title mb-4">Beneficiaries</h2>

              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Bank</th>
                      <th>Account No.</th>
                      <th>Max Limit</th>
                    </tr>
                  </thead>

                  <tbody>
                    {beneficiaries.map((beneficiary) => (
                      <tr key={beneficiary.id}>
                        <td>{beneficiary.name}</td>
                        <td>{beneficiary.bank}</td>
                        <td>{beneficiary.accountNo}</td>
                        <td>₹{beneficiary.limit.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Modal */}

          <dialog id="beneficiary_modal" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-xl mb-5">Add Beneficiary</h3>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Beneficiary Name"
                  className="input input-bordered w-full"
                />

                <input
                  type="text"
                  placeholder="Bank Name"
                  className="input input-bordered w-full"
                />

                <input
                  type="text"
                  placeholder="Account Number"
                  className="input input-bordered w-full"
                />

                <input
                  type="number"
                  placeholder="Maximum Transfer Limit"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="modal-action">
                <button className="btn btn-primary">Add Beneficiary</button>

                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </>
  );
};

export default AccountDetail;
