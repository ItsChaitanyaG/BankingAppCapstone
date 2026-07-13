const Transactions = () => {
  return (
    <>
      <div className="m-15">
        <h1 className="justify-self-start">Transactions</h1>

        <div className="m-15 overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>ID</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Remark</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>John Doe</td>
                <td>100.00</td>
                <td>Completed</td>
                <td>12/16/2020</td>
                <td>Pizza Party</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Transactions;
