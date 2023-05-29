import React from 'react'
import useLogout from './hooks/useLogout'
import { useNavigate } from 'react-router-dom'

function Home() {
	const navigate = useNavigate()
	const logout = useLogout()

	const signOut = async () => {
		await logout()
		navigate('/linkpage')
	}
	
  return (
	 <div>
		<button onClick={signOut}>Sign Out</button>
	 </div>
  )
}

export default Home