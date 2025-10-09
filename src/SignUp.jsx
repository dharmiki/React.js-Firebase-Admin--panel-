import { useState } from "react";
import { auth } from "./Firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (email && password) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Signup successful! Please login now.");
        navigate("/login");
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Please fill all fields");
    }
  };
``
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold mb-6 text-blue-400">Signup</h2>

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
          onClick={handleSignup}
          className="bg-blue-600 hover:bg-blue-700 w-full py-2 rounded-lg mb-3"
        >
          Signup
        </button>

        <p>
          Already have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
