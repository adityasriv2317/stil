"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { loginStart, loginSuccess, loginFailure } from "../store/authSlice";

import Aurora from "@/components/aurora";

interface User {
  id: number;
  email: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogin = async () => {
    dispatch(loginStart());
    try {
      // Simulate API request
      await new Promise((res) => setTimeout(res, 1000));
      const user: User = { id: 1, email }; // Mock user data
      dispatch(loginSuccess(user));
    } catch (err) {
      dispatch(loginFailure("Invalid credentials"));
    }
  };

  const props = {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    loading,
    error,
    isAuthenticated,
  };

  return <DesktopLayout props={props} />;
}

const DesktopLayout = ({ props }) => {
  return (
    <div className="max-w-screen p-0">
      <div className="w-screen h-screen absolute inset-0 z-[-10]">
        <Aurora
          colorStops={["#8000FF", "#4361F9", "#516583"]}
          blend={0.5}
          amplitude={0.8}
          speed={1.8}
        />
      </div>

      <div className="flex z-0 justify-center p-6 gap-2 items-center w-screen h-screen">
        <div className="w-3/5">hi</div>
        <div className="w-2/5 h-full bg-white/40 rounded-2xl shadow-lg">
          
        </div>
      </div>
    </div>
  );
};

{
  /* <h1 className="text-xl font-bold mb-4">Login</h1>
{error && <p className="text-red-500 mb-2">{error}</p>}
<input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="block w-full mb-2 p-2 border rounded"
/>
<input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="block w-full mb-2 p-2 border rounded"
/>
<button
  onClick={handleLogin}
  disabled={loading}
  className="w-full bg-blue-600 text-white px-4 py-2 rounded"
>
  {loading ? "Logging in..." : "Login"}
</button>
{isAuthenticated && (
  <p className="mt-4 text-green-600">You are logged in!</p>
)} */
}
