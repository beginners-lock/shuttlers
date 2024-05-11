//import React from 'react';
//import logo from './logo.svg';
import './App.css';
import LoadingSpinner from './components/Spinner';
import { PRIMARY700, SECONDARY800 } from './theme/colors';
import { useEffect, useState } from 'react';
import setfavicon from './constants/setfavicon';

function App() {
	const [logintype, setLogintype] = useState('user');

	useEffect(()=>{
		/*setTimeout(()=>{
			let user = sessionStorage.getItem('shuttlersuser');
			console.log(user);
			if(user){
				window.location.href = "/user/dashboard";
			}else{
				window.location.href = "/user/signin";
			}
		}, 8000)*/
	}, []);

	const btnClick = (type: string) => {
		setLogintype(type);

		setfavicon({ type });

		let el = document.getElementById('appscrollpane') as HTMLDivElement;
		console.log(window.innerWidth);
		el.scrollLeft = window.innerWidth;

		setTimeout(()=>{
			if(type==='user'){
				window.location.href = "/user/signin";
			}else{
				window.location.href = "/driver/signin";
			}
		}, 5000);
	}

	return (
		<div id="appscrollpane" className="font-poppins w-full h-full flex flex-row items-center justify-start overflow-y-hidden overflow-x-hidden scroll-smooth">
			<div className="min-w-full max-w-full h-full flex flex-col items-center justify-center">
				<div className='text-slate-700 text-md md:text-lg font-semibold'>Log in as a:</div>
				<div className="mt-12 text-white w-40 h-14 rounded-full text-md md:text-lg font-semibold flex flex-row items-center justify-center cursor-pointer" style={{backgroundColor:PRIMARY700}} onClick={()=>{btnClick('user');}}>User</div>
				<div className="mt-8 text-white w-40 h-14 rounded-full text-md md:text-lg font-semibold flex flex-row items-center justify-center cursor-pointer" style={{backgroundColor:SECONDARY800}} onClick={()=>{btnClick('driver');}}>Driver</div>
			</div>
			<div className="min-w-full max-w-full h-full flex flex-col items-center justify-center font-bold text-2xl md:text-3xl" style={{color: logintype==='user'?PRIMARY700:SECONDARY800}}>
				{
					logintype==="user"?
						<img className="w-14 md:w-16 mb-8" alt="logo" src="logo.png"/>
					:
						<img className="w-14 md:w-16 mb-8" alt="logo" src="logoD.png"/>
				}	
				<div className='mb-6'>Shuttlers</div>
				<LoadingSpinner
					loading={logintype==='user'}
					size={'25px'}
					borderTopColor={'white'}
					borderColor={PRIMARY700}
				/>
				<LoadingSpinner
					loading={logintype==='driver'}
					size={'25px'}
					borderTopColor={'white'}
					borderColor={SECONDARY800}
				/>
			</div>
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
