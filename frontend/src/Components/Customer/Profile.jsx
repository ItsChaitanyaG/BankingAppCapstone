import { useNavigate } from "react-router-dom";
import useAuth from "../../Context/useAuth";
import api from "../../api/axios.js";
import { toast } from "react-hot-toast";


const Profile = () => {

  const { user, setUser, loading } = useAuth();
  const navigate = useNavigate();


  if (loading) {
    return <div>Loading..</div>
  }

  const logout = async () => {
    try {
      await toast.promise(
        api.post("/auth/logout"),
        {
          loading: "Logging out...",
          success: "Logged out successfully!",
          error: (err) =>
            err.response?.data?.message || "Logout failed",
        }
      );

      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <>
      <div className="m-15 flex-col justify-items-center">
        <button className="btn btn-ghost mb-6 flex justify-self-start" onClick={() => navigate(-1)}>← Back</button>
        <div className="flex items-center gap-5 justify-self-start">
          <h1 className="flex justify-self-start">Profile</h1>
          <button className="btn btn-sm">Edit Profile</button>
        </div>

        <div className="m-10">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 justify-items-start">
            <legend className="fieldset-legend">Profile Information</legend>

            <label className="label">Full Name</label>
            <input
              type="text"
              className="input font-black"
              value={user.name}
              disabled
            />

            <label className="label">Email</label>
            <input
              type="email"
              className="input font-black"
              value={user.email}
              disabled
            />

            <label className="label">Account Number</label>
            <input type="number" className="input font-black" value="1002031" disabled />

            <button className="btn btn-soft btn-warning my-5" onClick={logout}>Log Out</button>
          </fieldset>
        </div>
      </div>
    </>
  );
};

export default Profile;
