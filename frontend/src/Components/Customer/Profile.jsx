import { useNavigate } from "react-router-dom";
import useAuth from "../../Context/useAuth";
import api from "../../api/axios.js";
import { toast } from "react-hot-toast";
import { useState } from "react";


const Profile = () => {

  const { user, setUser, loading, refreshUser } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


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

  const updateProfile = async() => {
    try {

      await toast.promise(
        api.put("/user/profile/update",
          {
            name, currentPassword, newPassword, confirmPassword
          },
        ),
        {
          loading: "Updating Profile...",
          success: "Profile updated successfully!",
          error: (err) => err.response?.data?.message || "Failed to update profile"
        }
      );

      await refreshUser();
      
      setName("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      document.getElementById("edit_profile").close();
      
    } catch (error) {
      console.log(error);
    }
  }

  return (

    <>
      <div className="m-15 flex-col justify-items-center">
        <button className="btn btn-ghost mb-6 flex justify-self-start" onClick={() => navigate("/user")}>← Back</button>
        <div className="flex items-center gap-5 justify-self-start">
          <h1 className="flex justify-self-start">Profile</h1>
          
          <button className="btn" onClick={()=>document.getElementById('edit_profile').showModal()}>Edit Profile</button>
          <dialog id="edit_profile" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <h3 className="font-bold text-lg text-blue-50">Edit Profile</h3>
              <div className="flex-col justify-items-center my-10">
                
                <fieldset className="fieldset">
                  <label className="label text-blue-50" htmlFor="name">Name</label>
                  <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)}/>
                </fieldset>

                <fieldset className="fieldset">
                  <label className="label text-blue-50" htmlFor="name">Current Password</label>
                  <input type="password" className="input" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}/>
                </fieldset>

                <fieldset className="fieldset">
                  <label className="label text-blue-50" htmlFor="name">New Password</label>
                  <input type="password" className="input" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                </fieldset>

                <fieldset className="fieldset">
                  <label className="label text-blue-50" htmlFor="name">Confirm Password</label>
                  <input type="password" className="input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                </fieldset> <br/>

                <button className="btn" onClick={updateProfile}>Submit</button>
              </div>
              
            </div>
          </dialog>
        </div>

        <div className="m-10">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 justify-items-start">
            <legend className="fieldset-legend">Profile Information</legend>

            <label className="label text-gray-300">Full Name</label>
            <input
              type="text"
              className="input font-medium text-blue-50 border border-gray-300"
              value={user.name}
              disabled
            />

            <label className="label text-gray-300">Email</label>
            <input
              type="email"
              className="input font-medium text-blue-50 border border-gray-300"
              value={user.email}
              disabled
            />

            <button className="btn btn-soft btn-warning my-5" onClick={logout}>Log Out</button>
          </fieldset>
        </div>
      </div>
    </>
  );
};

export default Profile;
