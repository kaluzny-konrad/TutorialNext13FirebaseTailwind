"use client";

import { useAuth } from "@/context/AuthContext";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import { AuthError } from "firebase/auth";
import { useState } from "react";

type Props = {};

export default function Login({}: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [customError, setCustomError] = useState<string>("");
  const [authError, setAuthError] = useState<AuthError | undefined>(undefined);
  const [isLogginIn, setIsLogginIn] = useState<boolean>(true);

  const { currentUser, login, signup } = useAuth();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCustomError("");
    setAuthError(undefined);

    if (isLogginIn) {
      try {
        await login(email, password);
      } catch (error: any) {
        setAuthError(error);
      }
    } else {
      if (password !== confirmPassword) {
        return setCustomError("Passwords do not match");
      }
      try {
        await signup(email, password);
      } catch (error: any) {
        setAuthError(error);
      }
    }
  }

  return (
    <>
      {!currentUser && (
        <form
          onSubmit={handleSubmit}
          className="flex-1-col all-center text-sm-flex gap-form-flex m-4"
        >
          <h1 className="font-extrabold text-4xl-flex select-none">
            {isLogginIn ? "Login" : "Register"}
          </h1>
          <input
            type="email"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="brand-text styled-input form-w p-2"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="brand-text styled-input form-w p-2"
            placeholder="Password"
          />
          {!isLogginIn && (
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="brand-text styled-input form-w p-2"
              placeholder="Confirm password"
            />
          )}
          <button
            type="submit"
            className="styled-button left-loader form-w p-2"
          >
            <h2 className="relative z-20 uppercase">Submit</h2>
          </button>
          <p
            onClick={() => setIsLogginIn(!isLogginIn)}
            className="cursor-pointer"
          >
            {!isLogginIn ? "Login" : "Register"}
          </p>
          {customError && <p className="text-red-500">{customError}</p>}
          {authError && (
            <p className="text-red-500">
              {
                FIREBASE_ERRORS[
                  authError?.message as keyof typeof FIREBASE_ERRORS
                ]
              }
            </p>
          )}
        </form>
      )}
    </>
  );
}
