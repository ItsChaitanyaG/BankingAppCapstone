import api from "../../api/axios.js";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const KycRequests = () => {
  const [kyc, setKyc] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const navigate = useNavigate();

  const filteredKyc = kyc.filter((k) => statusFilter === "ALL" ? k : k.status === statusFilter);

  useEffect(() => {
    const getAllKyc = async () => {
      try {
        const res = await api.get("/admin/kyc", {
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
        <button className="btn btn-ghost mb-6 flex justify-start" onClick={() => navigate("/admin")}>← Back</button>
        <h1 className="justify-self-start">KYC Requests</h1>

        <div className="flex justify-center m-15">
          <form className="filter">
            <input className="btn btn-square" type="reset" value="×" onClick={() =>setStatusFilter("ALL")} />
            <input
              className="btn"
              type="radio"
              name="status"
              aria-label="Pending"
              onChange={() => setStatusFilter("PENDING")}
            />
            <input
              className="btn"
              type="radio"
              name="status"
              aria-label="Approved"
              onChange={() => setStatusFilter("VERIFIED")}
            />
            <input
              className="btn"
              type="radio"
              name="status"
              aria-label="Rejected"
              onChange={() => setStatusFilter("REJECTED")}
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

                {filteredKyc.map((k) => (
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
