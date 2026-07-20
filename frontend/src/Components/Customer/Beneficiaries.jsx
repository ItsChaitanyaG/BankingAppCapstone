import { useEffect } from "react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../../api/axios";

const Beneficiaries = () => {

  const { selectedAccount } = useOutletContext();
  const [beneficiaries, setBeneficiaries] = useState([]);

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
      console.error(error);
    }
  }

  const addBeneficiary = async () => {
    try {
      await api.post(`/user/beneficiaries/${selectedAccount.id}`, { name, bank_name: bankName, account_no: accountNumber, max_limit: maxLimit });

      await getBeneficiaries();

      setName("");
      setBankName("");
      setAccountNumber("");
      setMaxLimit("");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getBeneficiaries();
  }, [selectedAccount])


  return (
    <>
      <div className="m-15">
        <h1 className="justify-self-start">Beneficiaries</h1>

        <div>
          <div className="recent-transactions p-20">
            <h2 className="justify-self-start">Beneficiaries</h2>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Account Number</th>
                    <th>Beneficiary Name</th>
                    <th>Max Limit</th>
                  </tr>
                </thead>
                <tbody>
                  {beneficiaries.map((b) => (
                    <tr key={b.id}>
                      <th>{b.id}</th>
                      <td>{b.account_no}</td>
                      <td>{b.name}</td>
                      <td>{b.max_limit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          Add Beneficiary
        </button>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Beneficiary</h3>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 m-5 justify-self-center">

              <label className="label">Name</label>
              <input type="text"  className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />

              <label className="label">Bank Name</label>
              <input type="text" className="input" placeholder="Name" value={bankName} onChange={(e) => setBankName(e.target.value)} />

              <label className="label">Account Number</label>
              <input
                type="number"
                className="input"
                placeholder="Account Number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />

              <label className="label">Max Transfer Limit</label>
              <input
                type="number"
                className="input"
                placeholder="Max Transfer Limit"
                value={maxLimit}
                onChange={(e) => setMaxLimit(e.target.value)}
              />

              <button className="btn btn-neutral mt-4" onClick={addBeneficiary}>Add</button>
            </fieldset>
            <div className="modal-action flex justify-center">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default Beneficiaries;
