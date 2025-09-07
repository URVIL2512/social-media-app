import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import axios from "axios"

axios.defaults.baseURL = import.meta.env.PROD ? "/" : "http://localhost:5000"

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "")

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
      localStorage.removeItem("token")
      delete axios.defaults.headers.common["Authorization"]
    }
  }, [token])

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">Social Media App</h1>
            <div className="flex space-x-4">
              {token ? (
                <>
                  <Link to="/" className="px-4 py-2 text-gray-600 hover:text-gray-800">Home</Link>
                  <Link to="/profile" className="px-4 py-2 text-gray-600 hover:text-gray-800">Profile</Link>
                  <button
                    onClick={() => setToken("")}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 text-gray-600 hover:text-gray-800">Login</Link>
                  <Link to="/register" className="px-4 py-2 text-gray-600 hover:text-gray-800">Register</Link>
                </>
              )}
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
            <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login onLogin={setToken} />} />
            <Route path="/register" element={<Register onRegister={setToken} />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
