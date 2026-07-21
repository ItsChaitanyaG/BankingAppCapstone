import { useState } from "react";
import useAuth from "../../Context/useAuth.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios.js";


const KYC = () => {
  const [docType, setDocType] = useState("");
  const [docNo, setDocNo] = useState();
  const [file, setFile] = useState([]);
  const { user, loading, refreshUser } = useAuth();
  const navigate = useNavigate();

  if (loading) return <div className="loading loading-ring">Loading...</div>;

  const submitKyc = async () => {
    if (!docType || !docNo || !file) {
      toast.error("Please complete all fields.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("document", file);
      formData.append("doc_type", docType);
      formData.append("doc_no", docNo);

      await toast.promise(
        api.post("/user/kycRequest", formData),
        {
          loading: "Uploading KYC...",
          success: "KYC submitted successfully!",
          error: (err) =>
            err.response?.data?.message || "Failed to submit KYC",
        }
      );

      await refreshUser();
    } catch (error) {
      console.error(error);
    }
  };

  if (!user.kyc) {
    return (
      <>
        <div className="m15">
          <button className="btn btn-ghost mb-6 flex justify-self-start" onClick={() => navigate(-1)}>← Back</button>

          <div className="flex flex-col items-center">

            <h1 className="my-25">KYC</h1>

            <div className="my-15">
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Not submitted</legend>

                <legend className="fieldset-legend">Document type</legend>
                <select
                  className="select"
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                >
                  <option value="" disabled>Document type</option>
                  <option value="Aadhaar">Aadhar</option>
                  <option value="PAN">PAN</option>
                  <option value="Passport">Passport</option>
                </select>

                <label className="label">Document number</label>
                <input
                  type="number"
                  className="input"
                  placeholder="Enter Document Number"
                  value={docNo}
                  onChange={(e) => setDocNo(e.target.value)}
                />

                <legend className="fieldset-legend">Upload a file</legend>
                <input
                  type="file"
                  accept=".pdf"
                  className="file-input"

                  onChange={(e) => setFile(e.target.files[0])}
                />
                <label className="label">Max size 2MB</label>

                <button type="button" className="btn btn-soft" onClick={submitKyc}>
                  Submit
                </button>
              </fieldset>
            </div>
          </div>
        </div>

      </>
    );
  }

  if (user.kyc.status === "PENDING") {
    return (
      <>
        <div className="m-15">
          <button className="btn btn-ghost mb-6 flex justify-self-start" onClick={() => navigate(-1)}>← Back</button>

          <div className="flex flex-col items-center">

            <h1 className="my-25">KYC</h1>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
              <legend className="fieldset-legend">Pending verification</legend>
              <p>
                Submitted On: {user.kyc.submittedAt} <br />
                Document Type: {user.kyc.doc_type} <br />
                Document Number: {user.kyc.doc_no} <br />[ Waiting for Admin Verification
                ]
              </p>
            </fieldset>
          </div>
        </div>

      </>
    );
  }

  if (user.kyc.status === "VERIFIED") {
    return (
      <>
        <div className="m-15">
          <button className="btn btn-ghost mb-6 flex justify-self-start" onClick={() => navigate(-1)}>← Back</button>

          <div className="flex flex-col items-center">

            <h1 className="my-25">KYC</h1>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
              <legend className="fieldset-legend">Verified</legend>
              <p>
                Verified On: {user.kyc.updatedAt} <br />
                Document Type: {user.kyc.doc_type} <br />
                Document Number: {user.kyc.doc_no} <br />[ Verified by Admin ]
              </p>
            </fieldset>
          </div>
        </div>

      </>
    );
  }
};

export default KYC;
