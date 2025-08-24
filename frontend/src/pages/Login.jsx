import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Static credentials
  const staticEmail = "admin@example.com"
  const staticPassword = "12345";

  const handleLogin = () => {
    if (email === staticEmail && password === staticPassword) {
      // Save login state
      localStorage.setItem("isLoggedIn", "true")
      navigate("/AdminDashboard")
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-4xl bg-white rounded-lg shadow-xl flex overflow-hidden h-[600px] md:h-[600px] w-full">
        {/* Left Side: Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=800&q=80"
            alt="Login Illustration"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold mb-8 text-gray-900 tracking-tight">
            Login to your account
          </h2>

          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-3">
              Email address
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-600 transition"
            />
          </div>

          <div className="mb-8">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-3">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-600 transition"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          >
            Login
          </button>

          {error && (
            <p className="text-red-500 text-center mt-4 font-semibold">{error}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
