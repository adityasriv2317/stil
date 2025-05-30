"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { loginStart, loginSuccess, loginFailure } from "../store/authSlice";

import Aurora from "@/components/aurora";
import { GoogleLogin } from "@react-oauth/google";

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

const DesktopLayout = ({
  props,
}: {
  props: {
    email: string;
    password: string;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    handleLogin: () => Promise<void>;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
  };
}) => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    loading,
    error,
    isAuthenticated,
  } = props;

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
        <div className="w-3/5 text-4xl">
          STIL<span className="font-pacifico">NEXT</span>
        </div>
        <div className="w-2/5 h-full bg-black/40 rounded-2xl shadow-lg">
          <h2 className="text-4xl font-bold font-lilita text-center my-6">
            Log in to Continue
          </h2>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <div className="space-y-4 px-16 flex flex-col justify-center h-[calc(100%-12rem)]">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-4/5 mx-auto block px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-4/5 mx-auto block px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-1/2 mx-auto block px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="flex items-center gap-2 py-2">
              <div className="h-px flex-1 bg-gray-400"></div>
              <span className="text-gray-100 text-sm">OR</span>
              <div className="h-px flex-1 bg-gray-400"></div>
            </div>

            <div className="w-fit block mx-auto">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
                useOneTap
                shape="pill"
                size="large"
                theme="outline"
                text="continue_with"
                logo_alignment="center"
                ux_mode="redirect"
              />
            </div>
          </div>

          <p className="mt-6 text-sm text-center text-gray-600">
            <button className="text-gray-200 hover:text-white font-medium cursor-pointer">
              Forgot Password?
            </button>
          </p>
          <p className="mt-2 text-sm text-center text-gray-300/90">
            Don’t have an account?{" "}
            <button className="text-gray-200 hover:text-white font-medium cursor-pointer">
              Sign Up
            </button>
          </p>
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
