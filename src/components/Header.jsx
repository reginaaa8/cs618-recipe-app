import { Link } from 'react-router-dom'
import { User } from './User.jsx'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext.jsx'

export function Header() {
  const [token, setToken] = useAuth()
  if (token) {
    const { sub } = jwtDecode(token)
    return (
      <div className='bg-[#FAF8F3] border-b border-[#E9E3D8]'>
        <div className='flex items-center justify-between max-w-6xl mx-auto px-4 py-6'>
          <h1 className='text-2xl font-semibold text-[#35483D]'>RecipeShare</h1>
          <nav className='flex items-center gap-4'>
            <span className='font-semibold text-[#35483D]'>
              Logged in as <User id={sub} />
            </span>
            <button
              className='bg-[#35483D] text-white rounded-lg px-4 py-2 hover:bg-[#26372E]'
              onClick={() => setToken(null)}
            >
              Logout
            </button>
          </nav>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-[#FAF8F3] border-b border-[#E9E3D8]'>
      <div className='flex items-center justify-between max-w-6xl mx-auto px-4 py-6'>
        <h1 className='text-2xl font-semibold text-[#35483D]'>RecipeShare</h1>
        <nav className='flex items-center gap-4'>
          <Link
            className='font-semibold text-[#35483D] hover:text-[#5D7A62]'
            to='/login'
          >
            Log In
          </Link>{' '}
          |{' '}
          <Link
            className='bg-[#35483D] text-white rounded-lg px-4 py-2 hover:bg-[#26372E]'
            to='/signup'
          >
            Sign Up
          </Link>
        </nav>
      </div>
    </div>
  )
}
