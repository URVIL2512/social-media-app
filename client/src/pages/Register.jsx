import React, { useState } from "react"
import { register } from "../api/auth"
import { Link, useNavigate } from "react-router-dom"

export default function Register({ onRegister }) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function go() {
    if (!username || !email || !password) return alert("Please fill all fields")
    if (password.length < 6) return alert("Password must be at least 6 characters")
    setLoading(true)
    try {
      const res = await register({ username, email, password })
      onRegister(res.token)
      navigate("/")
    } catch {
      alert("Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-3 border rounded mb-2" />
      <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 border rounded mb-2" />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border rounded mb-2" />
      <button onClick={go} disabled={loading} className="w-full bg-green-500 text-white py-3 rounded mb-4">{loading ? "Creating account..." : "Register"}</button>
      <p className="text-center text-sm">
        Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
      </p>
    </div>
  )
}
