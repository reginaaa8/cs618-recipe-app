import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import { signup } from '../api/users.js'
export function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const signupMutation = useMutation({
    mutationFn: () => signup({ username, password }),
    onSuccess: () => navigate('/login'),
    onError: () => alert('failed to sign up!'),
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    signupMutation.mutate()
  }
  return (
    <div className='min-h-screen bg-[#FAF8F3] px-4 py-12'>
      <form
        onSubmit={handleSubmit}
        className='bg-white border border-[#E9E3D8] rounded-2xl p-6 max-w-md mx-auto space-y-4'
      >
        <Link
          to='/'
          className='text-[#35483D] font-medium hover:underline flex justify-center'
        >
          Back to main page
        </Link>
        <h2 className='text-2xl font-semibold text-[#35483D]'>Sign Up</h2>
        <div>
          <label htmlFor='create-username' className='block font-semibold mb-2'>
            Username:{' '}
          </label>
          <input
            type='text'
            name='create-username'
            id='create-username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='border rounded-lg p-2 w-full'
          />
        </div>
        <div>
          <label htmlFor='create-password' className='block font-semibold mb-2'>
            Password:{' '}
          </label>
          <input
            type='password'
            name='create-password'
            id='create-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border rounded-lg p-2 w-full'
          />
        </div>
        <br />
        <div className='flex justify-center'>
          <input
            type='submit'
            value={signupMutation.isPending ? 'Signing up...' : 'Sign Up'}
            disabled={!username || !password || signupMutation.isPending}
            className='bg-[#35483D] text-white rounded-lg px-4 py-2 hover:bg-[#26372E] disabled:opacity-40 disabled:cursor-not-allowed'
          />
        </div>
      </form>
    </div>
  )
}
