//import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { PRIMARY700 } from './theme/colors';
import { useEffect } from 'react';

function App() {
	useEffect(()=>{
		setTimeout(()=>{
			let user = sessionStorage.getItem('shuttlersuser');
			console.log(user);
			if(user){
				window.location.href = "/user/dashboard";
			}else{
				window.location.href = "/user/signin";
			}
		}, 8000)
	}, []);

	return (
		<div className="font-poppins w-full h-full flex flex-col items-center justify-center font-bold text-4xl" style={{color: PRIMARY700}}>
				<img className="w-20 h-20 mb-8" alt="logo" src="logo.png"/>
				Shuttlers
		</div>
	);
}

export default App;


/**
 * <div className='w-96 px-10 py-16 border border-slate-400 rounded-lg shadow-lg flex flex-col items-start justify-start'>
				<div className='text-3xl mb-8 font-bold'>Shuttlers</div>
				<Link to="/signup" className='text-md mt-4 cursor-pointer'>Sign up</Link>
				<Link to="/signin" className='text-md mt-4 cursor-pointer'>Sign in</Link>
				<Link to="/user" className='text-md mt-4 cursor-pointer'>User dashboard</Link>
				<Link to="/forgotpassword" className='text-md mt-4 cursor-pointer'>Forgot password</Link>
			</div>
 */
