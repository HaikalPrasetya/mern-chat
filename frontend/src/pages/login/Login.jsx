import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex items-center justify-center w-[400px]">
      <div className="h-full p-6 w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-semibold text-center">Login</h1>
        <form className="flex flex-col gap-5 my-5" onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2 ">
            <input
              type="text"
              className="grow"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 ">
            <input
              type="password"
              className="grow"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <Link to="/signup" className="hover:underline hover:text-blue-500">
            {"Don't"} have an account?
          </Link>
          <button className="btn" disabled={loading}>
            {loading ? "loading" : "login"}
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
