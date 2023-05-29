
import Register from './Register';
import Login from './Login';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import Editor from './Editor';
import Missing from './Missing';
import RequireAuth from './RequireAuth';
import PersistLogin from './PersistLogin';

function App() {
  return (
 <Routes>
	<Route path='/' element={<Layout />} >
		{/*public routes*/}
		<Route path='login' element={<Login />} />
		<Route path='register' element={<Register />} />

		{/*protected routes*/}
		<Route element={<PersistLogin />} >
		<Route element={<RequireAuth allowedRoles={[2000]} />}>
			<Route path='/' element={<Home />} />
			</Route>
			<Route element={<RequireAuth allowedRoles={[1000]} />}>
			<Route path='editor' element={<Editor/>} />
		</Route>
		</Route>

		{/*catch all*/}
		<Route path='*' element={<Missing />} />

	</Route>
 </Routes>
  );
}

export default App;
