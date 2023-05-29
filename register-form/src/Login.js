
import { useRef, useState, useEffect } from 'react'
import useAuth from './hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useInput from './hooks/useInput';
import useToggle from './hooks/useToggle';

import axios from './api/axios';
const LOGIN_URL = '/auth';

function Login() {
	const { setAuth  } = useAuth();

	const navigate = useNavigate()
	const location = useLocation()
	const from = location.state?.from?.pathname || '/'

	const userRef = useRef();
	const errRef = useRef();
	
	
	const [user, reset, attributeObj] =  useInput('user','')// useState('');
	const [pwd, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);
	const [ check, toggleCheck ] = useToggle('persist', false)

	useEffect(() => {
		userRef.current.focus()
	}, [])

	useEffect(() => {
		setErrMsg('');
	}, [user, pwd])

	const handleSubmit =  async (e) => {
		e.preventDefault()
		try{
			const response = await axios.post(LOGIN_URL, 
				JSON.stringify({user, pwd}), 
				{
					headers: {'Content-Type': 'application/json'},
					withCredentials: true,
				}
				);
				const accessToken = response?.data.accessToken;
				setAuth({user, accessToken })
				reset()
				setPwd('')
				setSuccess(true)
				navigate(from, {replace: true})
			} catch (err) {
					if(!err?.response) {
						setErrMsg('No server response')
					} else if (err.response?.status === 400) {
						setErrMsg('missing username or password')
					} else {
						setErrMsg('username or password is invalid')
					}
					errRef.current.focus()
					}
				}

				//const togglePersist = () => {
				//	setPersist(prev => !prev)
				//}

				//useEffect(() => {
				//	localStorage.setItem('persist', persist)
				//}, [persist])

	return (
		<>
			 {success ? (
				  <section>
						<h1>You are logged in!</h1>
						<br />
						<p>
							 <a href="#">Go to Home</a>
						</p>
				  </section>
			 ) : (
				  <section>
						<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
						<h1>Sign In</h1>
						<form onSubmit={handleSubmit}>
							 <label htmlFor="username">Username:</label>
							 <input
								  type="text"
								  id="username"
								  ref={userRef}
								  autoComplete="off"
								//  onChange={(e) => setUser(e.target.value)}
								//  value={user}
								{...attributeObj}
								  required
							 />

							 <label htmlFor="password">Password:</label>
							 <input
								  type="password"
								  id="password"
								  onChange={(e) => setPwd(e.target.value)}
								  value={pwd}
								  required
							 />
							 <button>Sign In</button>
							 <div className='persistCheck'>
								<input type='checkbox'
								id = 'resist'
								onChange={toggleCheck}
								checked= {check} />
								<label htmlFor='persist'>Trust this device</label>
							 </div>
						</form>
						<p>
							 Need an Account?<br />
							 <span className="line">
								  {/*put router link here*/}
								  <Link to="/register">Sign Up</Link>
							 </span>
						</p>
				  </section>
			 )}
		</>
  )
}

export default Login