import  { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

 
  return (
    <div className="min-h-screen bg-[#eae7e7] flex items-center justify-center p-8">
      <div className="w-1/3 max-w-5xl h-auto rounded-2xl shadow-2xl overflow-hidden flex">
        {/* Left side - form */}
        <div className="w-full bg-white p-8 flex items-center justify-center">
          <form className="w-full max-w-md">
            <h1 className="text-2xl font-semibold text-black">Get back to Your Account</h1>

            <label className="block mt-4 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full h-10 rounded border border-[#e7e6e6] px-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="you@example.com"
            />

            <label className="block mt-4 text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full h-10 rounded border border-[#e7e6e6] px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Enter a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

           

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 h-10 rounded bg-black text-white flex items-center justify-center disabled:opacity-60 cursor-pointer"
            >
              {loading ? 'Getting...' : 'Sign In'}
            </button>

            <div className="flex items-center gap-3 mt-6">
              <div className="flex-1 h-px bg-[#e3e3e3]" />
              <div className="text-sm text-gray-500">Or continue with</div>
              <div className="flex-1 h-px bg-[#e3e3e3]" />
            </div>

            <button
              type="button"
              onClick={handleGoogle}
              className="w-full mt-4 h-10 rounded border flex items-center justify-center gap-3 cursor-pointer"
            >
             
              Sign In with Google
            </button>

            <p className="text-sm text-gray-600 text-center mt-4">
              Want to Create new Account?{' '}
              <Link to="/signup" className="text-black underline cursor-pointer">
                Sign Up
              </Link>
            </p>
          </form>
        </div>

       
      </div>
    </div>
  )
}
