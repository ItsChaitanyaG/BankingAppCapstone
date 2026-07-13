import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const KYC = () => {
  const [docType, setDocType] = useState("Select Type");
  const [docNo, setDocNo] = useState();
  const [file, setFile] = useState(null);
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/user/profile",
          {
            withCredentials: true,
          },
        );

        setUser(res.data.data);
      } catch (error) {
        console.log(error);
        alert("Failed to fetch User...");
      }
    };

    getUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  const submitKyc = async () => {
    try {
      const formData = new FormData();

      formData.append("document", file);

      await axios.post(
        "http://localhost:8000/api/v1/user/kycRequest",
        formData,
        { withCredentials: true },
      );

      alert("KYC Submitted Successfully");
    } catch (error) {
      console.error(error);

      alert("Failed to Submit KYC");
    }
  };

  if (!user.kyc) {
    return (
      <>
        <div className="flex flex-col items-center">
          <h1 className="my-25">KYC</h1>

          <div className="my-15">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
              <legend className="fieldset-legend">Not submitted</legend>

              <legend className="fieldset-legend">Document type</legend>
              <select
                defaultValue={docType}
                className="select"
                onSelect={(e) => setDocType(e.target.value)}
              >
                <option disabled={true}>Document type</option>
                <option>Aadhaar</option>
                <option>PAN</option>
                <option>Passport</option>
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
                value={file}
                onChange={(e) => setFile(e.target.value)}
              />
              <label className="label">Max size 2MB</label>

              <button className="btn btn-soft" onClick={submitKyc}>
                Submit
              </button>
            </fieldset>
          </div>
        </div>
      </>
    );
  }

  if (user.kyc.status === "PENDING") {
    return (
      <>
        <div className="flex flex-col items-center">
          <h1 className="my-25">KYC</h1>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Pending verification</legend>
            <p>
              Submitted On: 15-06-2025 <br />
              Document Type: PAN Card <br />
              Document Number: ABCDE1234F <br />[ Waiting for Admin Verification
              ]
            </p>
          </fieldset>
        </div>
      </>
    );
  }

  if (user.kyc.status === "VERIFIED") {
    return (
      <>
        <div className="flex flex-col items-center">
          <h1 className="my-25">KYC</h1>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Verified</legend>
            <p>
              Verified On: 15-06-2025 <br />
              Document Type: PAN Card <br />
              Document Number: ABCDE1234F <br />[ Verified by Admin ]
            </p>
          </fieldset>
        </div>
      </>
    );
  }
};

export default KYC;
