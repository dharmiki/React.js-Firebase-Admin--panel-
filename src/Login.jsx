import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./Firebase/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful!");
        navigate("/Product");
      } catch (error) {
        alert("Invalid Email or Password!");
      }
    } else {
      alert("Please fill all fields");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google Login Successful!");
      navigate("/Product");
    } catch (error) {
      alert("Google Login Failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold mb-6 text-blue-400">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 rounded bg-gray-700 border border-gray-600 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 rounded bg-gray-700 border border-gray-600 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-green-600 hover:bg-green-700 w-full py-2 rounded-lg mb-3"
        >
          Login
        </button>

        <button
          onClick={handleGoogleLogin}
          className="bg-red-600 hover:bg-red-700 w-full py-2 rounded-lg mb-3"
        >
          Login with Google
        </button>

        <p>
          Don’t have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
