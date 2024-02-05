import React from 'react';
import Navbar from '../components/Navbar';
import { PRIMARY800, PRIMARY300, NEUTRAL500, NEUTRAL700, PRIMARY700, SECONDARY500 } from '../theme/colors';
import { Link } from 'react-router-dom';

const Signin = () => {
	return (
		<div className="font-poppins w-full box-border flex flex-col items-center justify-start p-4">
			<Navbar/>
			<div className="w-full box-border mt-24 px-24">
				<div className='w-full flex flex-col justify-start items-center'>
					<div className='flex flex-row items-center justify-center px-4 py-1.5 text-2xl font-bold rounded-full' style={{color: PRIMARY800, backgroundColor: PRIMARY300}}>
						Sign in to Shuttlers!
					</div>
					<div className='mt-2 font-bold' style={{color: NEUTRAL500}}>A team commited to ensuring secure travels for students</div>
				</div>
				<div className="w-full box-border mt-8">
					<div className="mt-7 box-border w-full flex flex-col justify-start items-start">
						<label className='text-lg' style={{color:NEUTRAL700}}>Username or Email</label>
						<input type="text" className='box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4] active:outline-none focus:outline-none'/>
					</div>
					<div className="mt-7 box-border w-full flex flex-col justify-start items-start">
						<label className='text-lg' style={{color:NEUTRAL700}}>Password</label>
						<input type="text" className='box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4] active:outline-none focus:outline-none'/>
					</div>
					<div className='mt-4 w-full flex flex-row items-center justify-between'>
						<div className='' style={{color:'#94A3B8'}}>
							<input type="checkbox" className='mr-2'/>
							Remember credentials
						</div>
						<div className='font-bold' style={{color:SECONDARY500}}>Forgot your password?</div>
					</div>
					<button className='w-full h-12 mt-12 rounded-md text-white text-lg' style={{backgroundColor:PRIMARY700}}>
						Login
					</button>
					<div className='mt-4 flex flex-row items-center justify-center text-md'>
						Don't have an account
						<Link to="/signup" className="ml-1 font-bold cursor-pointer" style={{color: SECONDARY500}}>Sign up</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Signin