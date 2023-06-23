"use client";

import { useState } from "react";

type Props = {};

export default function Login({}: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLogginIn, setIsLogginIn] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
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
      <button type="submit" className="styled-button left-loader form-w p-2">
        <h2 className="relative z-20 uppercase">Submit</h2>
      </button>
      <p onClick={() => setIsLogginIn(!isLogginIn)} className="cursor-pointer">
        {!isLogginIn ? "Login" : "Register"}
      </p>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
