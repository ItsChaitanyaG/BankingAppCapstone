import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const KycRequests = () => {
  const [kyc, setKyc] = useState();

  useEffect(() => {
    const getAllKyc = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/admin/kyc", {
          withCredentials: true,
        });

        setKyc(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getAllKyc();
  }, []);

  if (!kyc) return <div>Loading..</div>;

  return (
    <>
      <div className="m-15">
        <h1 className="justify-self-start">KYC Requests</h1>

        <div className="flex justify-center m-15">
          <form className="filter">
            <input className="btn btn-square" type="reset" value="×" />
            <input
              className="btn"
              type="radio"
              name="frameworks"
              aria-label="Pending"
            />
            <input
              className="btn"
              type="radio"
              name="frameworks"
              aria-label="Approved"
            />
            <input
              className="btn"
              type="radio"
              name="frameworks"
              aria-label="Rejected"
            />
          </form>
        </div>

        <div>
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Submitted Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}

                {kyc.map((k) => (
                  <tr key={k.id}>
                    <th>{k.id}</th>
                    <td>{k.user.name}</td>
                    <td>{k.submittedAt}</td>
                    <td>{k.status}</td>
                    <td>
                      <Link to={`/admin/kyc-requests/${k.id}`}>
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default KycRequests;
