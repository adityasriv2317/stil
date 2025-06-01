"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { loginStart, loginSuccess, loginFailure } from "../store/authSlice";

import Aurora from "@/components/aurora";
import { GoogleLogin } from "@react-oauth/google";
import ASCIIText from "@/components/ASCIIText";
import GlitchText from "@/components/GlitchText";
import Loader from "@/components/Loader";

interface User {
  id: number;
  email: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
    showPassword,
    setEmail,
    setPassword,
    setShowPassword,
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
    showPassword: boolean;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
    handleLogin: () => Promise<void>;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
  };
}) => {
  const {
    email,
    password,
    showPassword,
    setEmail,
    setPassword,
    setShowPassword,
    handleLogin,
    loading,
    error,
    isAuthenticated,
  } = props;

  return (
    <div className="max-w-screen p-0">
      <div className="w-screen h-screen overflow-hidden absolute inset-0 z-[-10]">
        <Aurora
          colorStops={["#8000FF", "#4361F9", "#516583"]}
          blend={0.5}
          amplitude={0.8}
          speed={1.8}
        />
      </div>

      <div className="flex z-0 justify-center p-6 gap-2 items-center w-screen h-screen">
        <div className="w-3/5 not-md:w-2/5 px-auto overflow-hidden">
          {/* <ASCIIText
            text="STILNEXT"
            enableWaves={true}
            asciiFontSize={8}
          /> */}
          <div className="relative w-full -translate-x-3/7 top-1/2 left-1/2">
            <GlitchText
              speed={1}
              enableShadows={true}
              enableOnHover={false}
              className="custom-class"
            >
              STIL NEXT
            </GlitchText>
          </div>
        </div>

        <div className="w-2/5 not-md:w-3/5 h-full bg-black/40 rounded-2xl shadow-lg">
          <h2 className="text-4xl font-bold font-lilita text-center my-10 px-2">
            Log in to Continue
          </h2>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <div className="space-y-4 font-oxanium px-16 flex flex-col justify-center h-[calc(100%-12rem)]">
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-4/5 mx-auto text-center block px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />

            <div className="relative w-4/5 mx-auto">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-center block px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute w-fit right-5 top-1/2 -translate-y-1/2 text-gray-100 hover:text-purple-600 focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  // Eye-off icon
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.94 17.94A10.05 10.05 0 0112 19c-5 0-9-4-9-7 0-1.657 1.343-3.21 3.125-4.525M6.06 6.06A10.05 10.05 0 0112 5c5 0 9 4 9 7 0 1.657-1.343 3.21-3.125 4.525M3 3l18 18"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth={2}
                      fill="none"
                    />
                    </svg>
                ) : (
                  // Eye icon
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-1/2 mx-auto block px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50 relative"
            >
              {loading ? <Loader /> : "login"}
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

          <p className="text-sm text-center text-gray-600">
            <button className="text-gray-200 hover:text-white font-medium cursor-pointer">
              Forgot Password?
            </button>
          </p>
          <p className="mt-2 text-sm text-center text-gray-300/90">
            Don’t have an account?{" "}
            <button
              className="text-gray-200 hover:text-white font-medium cursor-pointer"
              onClick={() => {
                // navigate to sign-up page
                window.location.href = "/signup";
              }}
            >
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
