import useAuth from "../../Context/useAuth";

const Profile = () => {

  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading..</div>
  }

  return (

    <>
      <div className="m-15 flex-col justify-items-center">
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
              className="input"
              value={user.name}
            />

            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              value={user.email}
            />

            <label className="label">Account Number</label>
            <input type="number" className="input" value="1002031" />

            <button className="btn btn-soft btn-warning my-5">Log Out</button>
          </fieldset>
        </div>

        <div className="flex flex-col justify-center gap-2">
          <button className="btn btn-soft btn-error">Delete Account</button>
          <div className="label">
            Warning: This action will permanently delete your account.
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
