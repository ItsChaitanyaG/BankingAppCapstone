const TransferMoney = () => {
  return (
    <>
      <div className="m-20">
        <h2>Transfer Money</h2>

        <div className="flex-col justify-items-center p-10">
          <form>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
              <legend className="fieldset-legend"></legend>

              <legend className="fieldset-legend">Beneficiary</legend>
              <select defaultValue="Pick a browser" className="select">
                <option disabled={true}>Pick from Beneficiaries</option>
                <option>Beneficiary 1</option>
                <option>Beneficiary 2</option>
                <option>Beneficiary 3</option>
              </select>
              <span className="label">Optional</span>

              <label className="label">Account Number</label>
              <input
                type="number"
                className="input"
                placeholder="Type Account Number Here"
              />

              <label className="label">Amount</label>
              <input
                type="number"
                className="input"
                placeholder="Type Amount Here"
              />

              <legend className="fieldset-legend">Remark</legend>
              <textarea
                className="textarea h-24"
                placeholder="Type Remark Here"
              ></textarea>
              <div className="label">Optional</div>

              <button className="btn btn-soft btn-primary">Transfer</button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default TransferMoney;
