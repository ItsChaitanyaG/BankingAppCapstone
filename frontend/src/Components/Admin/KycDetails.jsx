import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const KycDetails = () => {
  const [kyc, setKyc] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getKyc = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/admin/kyc/${id}`,
          { withCredentials: true },
        );

        setKyc(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getKyc();
  }, []);

  if (!kyc) return <div>Loading...</div>;

  const approveKyc = async () => {
    try {
      await axios.patch(
        `http://localhost:8000/api/v1/admin/kyc/${kyc.id}/verify`,
        {},
        {
          withCredentials: true,
        },
      );

      alert("KYC Approved");

      //navigate
    } catch (error) {
      console.error(error);
      alert("Failed to approve KYC");
    }
  };

  const rejectKyc = async () => {
    try {
      await axios.patch(
        `http://localhost:8000/api/v1/admin/kyc/${kyc.id}/reject`,
        {},
        {
          withCredentials: true,
        },
      );

      alert("KYC Rejected");

      //navigate
    } catch (error) {
      console.error(error);
      alert("Failed to reject KYC");
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto p-8">
        <button className="btn btn-ghost mb-6" onClick={() => navigate(-1)}>← Back</button>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="text-3xl font-bold">KYC Verification</h1>

            <div className="divider"></div>

            {/* Customer */}

            <h2 className="text-xl font-semibold">Customer Information</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm opacity-60">Name</p>
                <p>{kyc.user.name}</p>
              </div>

              <div>
                <p className="text-sm opacity-60">Email</p>
                <p>{kyc.user.email}</p>
              </div>
            </div>

            <div className="divider"></div>

            {/* Document */}

            <h2 className="text-xl font-semibold">Document Information</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm opacity-60">Document Type</p>

                <p>{kyc.doc_type}</p>
              </div>

              <div>
                <p className="text-sm opacity-60">Document Number</p>

                <p>{kyc.doc_no}</p>
              </div>

              <div>
                <p className="text-sm opacity-60">Submitted On</p>

                <p>{new Date(kyc.submittedAt).toLocaleDateString()}</p>
              </div>

              <div>
                <p className="text-sm opacity-60">Status</p>

                <div className="badge badge-warning">{kyc.status}</div>
              </div>
            </div>

            <div className="divider"></div>

            {/* PDF */}

            <h2 className="text-xl font-semibold">Uploaded Document</h2>

            <a
              href={kyc.doc_url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline mt-3 w-fit"
            >
              View PDF
            </a>

            <div className="divider"></div>

            {kyc.status === "PENDING" && (
              <div className="flex justify-end gap-4">
                <button className="btn btn-success" onClick={approveKyc}>
                  Approve
                </button>

                <button className="btn btn-error" onClick={rejectKyc}>
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default KycDetails;
