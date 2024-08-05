import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import useEditProfile from "../hooks/useEditProfile";

function EditProfile() {
  const { authUser } = useAuthContext();
  const [inputs, setInputs] = useState({
    username: authUser.username,
    profilePic: authUser.profilePic,
    file: null,
  });

  const disabled =
    authUser.username === inputs.username &&
    authUser.profilePic === inputs.profilePic;

  const { loading, editProfile } = useEditProfile();

  const handleChangeProfile = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setInputs({
        ...inputs,
        profilePic: URL.createObjectURL(file),
        file,
      });
    } else {
      toast.error("Please select a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    delete inputs["profilePic"];
    await editProfile({ ...inputs, file: inputs.file });
  };
  return (
    <form
      className="text-center flex flex-col gap-3"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <h1 className="text-xl font-bold">Edit Profile</h1>
      <div className="flex flex-col items-center justify-center">
        {!loading ? (
          <div className="avatar mt-3">
            <div className="w-24 rounded-full">
              <img src={inputs.profilePic || authUser.profilePic} />
            </div>
          </div>
        ) : (
          <div className="flex w-52 flex-col gap-4">
            <div className="flex items-center justify-center gap-4">
              <div className="skeleton h-24 w-24 shrink-0 rounded-full"></div>
            </div>
          </div>
        )}
      </div>

      <div>
        <label
          htmlFor="inputFile"
          className="text-lg font-semibold text-slate-500 cursor-pointer"
        >
          Edit Photo
        </label>
        <input
          type="file"
          id="inputFile"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleChangeProfile}
        />
      </div>
      <div className="divider divider-info"></div>
      <div>
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered w-full max-w-xs"
          value={inputs.username}
          onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
        />
      </div>
      <button className="btn btn-info text-md" disabled={disabled || loading}>
        Edit
      </button>
    </form>
  );
}
export default EditProfile;
