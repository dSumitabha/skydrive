'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AuthenticationPage() {
  const router = useRouter()

  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)

    if (!email || !password || (!isLogin && !confirmPassword)) {
      setMessage("Please fill all fields.")
      return
    }

    if (!isLogin && password !== confirmPassword) {
      setMessage("Passwords do not match.")
      return
    }

    try {
      const res = await fetch(`/api/${isLogin ? "login" : "signup"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isLogin
            ? { email, password }
            : { email, password, confirmPassword }
        ),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || "Something went wrong")

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">skyDrive</h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          {isLogin ? "Login to your account" : "Create a new account"}
        </p>

        {message && <div className="text-sm text-red-500 mb-4 text-center">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

          {!isLogin && (
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          )}

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition" > {isLogin ? "Login" : "Sign Up"} </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 hover:underline" >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  )
}
