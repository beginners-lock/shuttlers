//import React from 'react';
//import logo from './logo.svg';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
	return (
		<div className="w-full h-full flex flex-col items-center justify-center">
			<div className='w-96 px-10 py-16 border border-slate-400 rounded-lg shadow-lg flex flex-col items-start justify-start'>
				<div className='text-3xl mb-8 font-bold'>Shuttlers</div>
				<Link to="/signup" className='text-md mt-4 cursor-pointer'>Sign up</Link>
				<Link to="/signin" className='text-md mt-4 cursor-pointer'>Sign in</Link>
				<Link to="/user" className='text-md mt-4 cursor-pointer'>User dashboard</Link>
				<Link to="/forgotpassword" className='text-md mt-4 cursor-pointer'>Forgot password</Link>
			</div>
		</div>
	);
}

export default App;
