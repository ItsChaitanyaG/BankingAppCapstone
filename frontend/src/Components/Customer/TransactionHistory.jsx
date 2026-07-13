const TransactionHistory = () => {
  return (
    <>
      <div>
        <div className="flex justify-items-start m-15">
          <h2>Transaction History</h2>
        </div>
        <div>
          <div className="flex justify-center gap-5 my-15">
            <select defaultValue="Month" className="select">
              <option disabled={true}>Month</option>
              <option>June</option>
              <option>May</option>
              <option>April</option>
            </select>

            <select defaultValue="Year" className="select">
              <option disabled={true}>Year</option>
              <option>2026</option>
              <option>2025</option>
              <option>2024</option>
            </select>

            <button className="btn btn-soft btn-info">Filter</button>
          </div>

          <div className="overflow-x-auto m-15 flex justify-center">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Date</th>
                  <th>To</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>1</th>
                  <td>2023-05-15</td>
                  <td>Cy Ganderton</td>
                  <td>Success</td>
                  <td>$100</td>
                </tr>
                {/* row 2 */}
                <tr>
                  <th>2</th>
                  <td>2023-05-14</td>
                  <td>Hart Hagerty</td>
                  <td>Failed</td>
                  <td>$50</td>
                </tr>
                {/* row 3 */}
                <tr>
                  <th>3</th>
                  <td>2023-05-13</td>
                  <td>Brice Swyre</td>
                  <td>Success</td>
                  <td>$100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionHistory;
