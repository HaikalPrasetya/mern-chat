import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import { useAuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="h-screen flex items-center justify-center shadow-box">
      <div className="mockup-browser bg-base-300 border">
        <div className="">
          <Routes>
            <Route
              path="/signup"
              element={authUser ? <Navigate to="/" /> : <SignUp />}
            />
            <Route
              path="/login"
              element={authUser ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/"
              element={authUser ? <Home /> : <Navigate to="/login" />}
            />
          </Routes>
          <Toaster />
        </div>
      </div>
    </div>
  );
}
export default App;
