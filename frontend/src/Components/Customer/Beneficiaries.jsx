const Beneficiaries = () => {
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
                  {/* row 1 */}
                  <tr>
                    <th>1</th>
                    <td>2023-05-15</td>
                    <td>Cy Ganderton</td>
                    <td>Success</td>
                  </tr>
                  {/* row 2 */}
                  <tr>
                    <th>2</th>
                    <td>2023-05-14</td>
                    <td>Hart Hagerty</td>
                    <td>Failed</td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <th>3</th>
                    <td>2023-05-13</td>
                    <td>Brice Swyre</td>
                    <td>Success</td>
                  </tr>
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
              <label className="label">Account Number</label>
              <input
                type="number"
                className="input"
                placeholder="Account Number"
              />

              <label className="label">Max Transfer Limit</label>
              <input
                type="number"
                className="input"
                placeholder="Max Transfer Limit"
              />

              <button className="btn btn-neutral mt-4">Add</button>
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
