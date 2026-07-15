
import { useParams } from "react-router-dom";
import useAuth from "../../Context/useAuth";

const AccountDetail = () => {
  const { id } = useParams();
  const { user} = useAuth();
  const account = user?.account?.find((acc) => acc.id === Number(id));
  const beneficiaries = account?.beneficiaries || [];

  if (!account) return <div>Account not found</div>;

  return (
    <>
      <div className="min-h-screen bg-base-200 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Account Details</h1>
          </div>

          {/* Account Card */}
          <div className="card bg-base-100 shadow-xl mb-8">
            <div className="card-body">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Account Number</p>
                  <h2 className="text-xl font-semibold">{account.acc_no}</h2>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Account Type</p>
                  <h2 className="text-xl font-semibold">{account.acc_type}</h2>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Available Balance</p>
                  <h2 className="text-3xl font-bold text-success">{account.balance.toLocaleString()}</h2>
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
                        <td>{beneficiary.bank_name}</td>
                        <td>{beneficiary.account_no}</td>
                        <td>₹{beneficiary.max_limit.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDetail;
