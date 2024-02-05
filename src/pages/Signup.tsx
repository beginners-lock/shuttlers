import React from 'react';
import Navbar from '../components/Navbar';
import { PRIMARY800, PRIMARY300, NEUTRAL500, NEUTRAL700, PRIMARY700, PRIMARY900 } from '../theme/colors';

const Signup = () => {
	return (
		<div className="font-poppins w-full box-border flex flex-col items-center justify-start p-4">
			<Navbar/>
			<div className="w-full box-border mt-24 px-24">
				<div className='w-full flex flex-col justify-start items-center'>
					<div className='flex flex-row items-center justify-center px-4 py-1.5 text-2xl font-bold rounded-full' style={{color: PRIMARY800, backgroundColor: PRIMARY300}}>
						Welcome to Shuttlers! 
						<img className="ml-0.5" alt="hand" src="hand.png"/>
					</div>
					<div className='mt-2 font-bold' style={{color: NEUTRAL500}}>A team commited to ensuring secure travels for students</div>
				</div>
				<div className="w-full box-border mt-8">
					<div className="box-border w-full flex flex-row items-center justify-between">
						<div className='box-border w-[48%] flex flex-col justify-start items-start'>
							<label className='text-lg' style={{color:NEUTRAL700}}>Last Name</label>
							<input type="text" className='box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4] active:outline-none focus:outline-none'/>
						</div>
						<div className='box-border w-[48%] flex flex-col justify-start items-start'>
							<label className='text-lg' style={{color:NEUTRAL700}}>First Name</label>
							<input type="text" className='box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4] active:outline-none focus:outline-none'/>
						</div>
					</div>

					<div className="mt-7 box-border w-full flex flex-row items-center justify-between">
						<div className='box-border w-[48%] flex flex-col justify-start items-start'>
							<label className='text-lg' style={{color:NEUTRAL700}}>Matric Number</label>
							<input type="text" className='box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4] active:outline-none focus:outline-none'/>
						</div>
						<div className='box-border w-[48%] flex flex-col justify-start items-start'>
							<label className='text-lg' style={{color:NEUTRAL700}}>Course</label>
							<input type="text" className='box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4] active:outline-none focus:outline-none'/>
						</div>
					</div>

					<div className="mt-7 box-border w-full flex flex-row items-center justify-between">
						<div className='box-border w-[48%] flex flex-col justify-start items-start'>
							<label className='text-lg' style={{color:NEUTRAL700}}>Email</label>
							<input type="text" className='box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4] active:outline-none focus:outline-none'/>
						</div>
						<div className='box-border w-[48%] flex flex-col justify-start items-start'>
							<label className='text-lg' style={{color:NEUTRAL700}}>Position</label>
							<input type="text" className='box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4] active:outline-none focus:outline-none'/>
						</div>
					</div>

					<div className="mt-7 box-border w-full flex flex-col justify-start items-start">
						<label className='text-lg' style={{color:NEUTRAL700}}>Create Password</label>
						<input type="text" className='box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4] active:outline-none focus:outline-none'/>
						<div className='mt-2 w-5/6 flex flex-row items-start justify-start box-border flex-wrap'>
							<div className='w-1/2 flex flex-row justify-start items-center box-border mt-2'>
								<div className='p-0.5' style={{backgroundColor:PRIMARY300}}>
									<img alt="tick1" src="tick.png"/>
								</div>
								<div className='ml-2 text-sm font-bold' style={{color: PRIMARY900}}>Lowercase characters</div>
							</div>
							<div className='w-1/2 flex flex-row justify-start items-center box-border mt-2'>
								<div className='p-0.5' style={{backgroundColor:PRIMARY300}}>
									<img alt="tick2" src="tick.png"/>
								</div>
								<div className='ml-2 text-sm font-bold' style={{color: PRIMARY900}}>9 characters minimum</div>
							</div>
							<div className='w-1/2 flex flex-row justify-start items-center box-border mt-2'>
								<div className='p-0.5' style={{backgroundColor:PRIMARY300}}>
									<img alt="tick3" src="tick.png"/>
								</div>
								<div className='ml-2 text-sm font-bold' style={{color: PRIMARY900}}>Numbers</div>
							</div>
							<div className='w-1/2 flex flex-row justify-start items-center box-border mt-2'>
								<div className='p-0.5' style={{backgroundColor:PRIMARY300}}>
									<img alt="tick4" src="tick.png"/>
								</div>
								<div className='ml-2 text-sm font-bold' style={{color: PRIMARY900}}>Uppercase characters</div>
							</div>
						</div>
					</div>

					<div className="mt-7 box-border w-full flex flex-col justify-start items-start">
						<label className='text-lg' style={{color:NEUTRAL700}}>Confirm Password</label>
						<input type="text" className='box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4] active:outline-none focus:outline-none'/>
					</div>

					<button className='w-full h-12 mt-12 rounded-md text-white text-lg' style={{backgroundColor:PRIMARY700}}>
						Sign up
					</button>
				</div>
			</div>
		</div>
	)
}

export default Signup