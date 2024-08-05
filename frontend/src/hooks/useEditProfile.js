import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

function useEditProfile() {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();

  const editProfile = async ({ username, file }) => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      if (file) {
        formData.append("file", file);
      }
      const getUsername = formData.get("username");
      if (getUsername.length < 3)
        return toast.error("username must be greater than > 3");
      setLoading(true);
      const res = await fetch(`/api/users/edit/${authUser._id}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setAuthUser(data);
      localStorage.setItem("user-info", JSON.stringify(data));
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, editProfile };
}
export default useEditProfile;
