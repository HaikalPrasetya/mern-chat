import { useState } from "react";
import SelectGender from "../../components/SelectGender";
import useSignUp from "../../hooks/useSignUp";
import { Link } from "react-router-dom";

function SignUp() {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const changeGender = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const { loading, signUp } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp({ ...inputs });
  };

  return (
    <div className="flex items-center justify-center w-[400px]">
      <div className="h-full p-6 w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-semibold text-center">Sign Up</h1>
        <form className="flex flex-col gap-5 my-5" onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2 ">
            <input
              type="text"
              className="grow"
              placeholder="Full Name"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 ">
            <input
              type="text"
              className="grow"
              placeholder="Username"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 ">
            <input
              type="password"
              className="grow"
              placeholder="Password"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 ">
            <input
              type="password"
              className="grow"
              placeholder="Confirm Password"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </label>
          <SelectGender
            changeGender={changeGender}
            selectGender={inputs.gender}
          />
          <Link to="/login" className="hover:underline hover:text-blue-500">
            have an account?
          </Link>
          <button className="btn" disabled={loading}>
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
export default SignUp;
