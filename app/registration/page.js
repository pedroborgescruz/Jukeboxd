"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/register', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        alert(data.error);
      } else {
        router.push("/loggedIn");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <a href="/">
          <img
            alt="Jukeboxd"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
        </a>
        <h2 className="mt-10 text-center text-2xl/9 tracking-tight text-jukeboxd">
          Join Jukeboxd
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* EMAIL */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-jukeboxd">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
            />
          </div>

          {/* USERNAME */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-jukeboxd">
              Username
            </label>
            <input
              id="username"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-jukeboxd">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-primary-dark"
          >
            Sign up
          </button>

        </form>
      </div>
    </div>
  );
}
