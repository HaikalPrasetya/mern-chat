import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

function useSignUp() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const signUp = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const checkIsError = handleInputError({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (checkIsError) return;
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        username,
        password,
        confirmPassword,
        gender,
      }),
    });
    const data = await res.json();
    if (data) {
      localStorage.setItem("user-info", JSON.stringify(data));
      setAuthUser(data);
    }
  };

  return { loading, signUp };
}
export default useSignUp;

function handleInputError({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    return true;
  }
  if (password.length < 6) return true;
  if (password !== confirmPassword) return true;
  return false;
}
