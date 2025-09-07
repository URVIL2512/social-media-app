import React, { useState } from "react"
import { login } from "../api/auth"
import { Link, useNavigate } from "react-router-dom"

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function go() {
    if (!email || !password) return alert("Please fill in all fields")
    setLoading(true)
    try {
      const res = await login({ email, password })
      onLogin(res.token)
      navigate("/")
    } catch {
      alert("Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 border rounded mb-2" />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border rounded mb-2" />
      <button onClick={go} disabled={loading} className="w-full bg-blue-500 text-white py-3 rounded mb-4">{loading ? "Logging in..." : "Login"}</button>
      <p className="text-center text-sm">
        Don’t have an account? <Link to="/register" className="text-blue-600 hover:underline">Create account</Link>
      </p>
    </div>
  )
}
