import { useState } from 'react';
import Navbar from '../components/Navbar'
import { NEUTRAL100, NEUTRAL300, NEUTRAL400, PRIMARY300, PRIMARY800, PRIMARY900, SECONDARY500 } from '../theme/colors';
import { ARRIVINGMODAL/*, CURRENTLOCATIONMODAL, DEPARTMENTMODAL, DESTINATIONMODAL, HOSTELMODAL, LOGOUTMODAL, PAYMENTMETHODMODAL, RECENTRIDESMODAL, RIDETYPEMODAL*/ } from '../constants/modalvariables';
import Modal from '../components/Modal';

const User = () => {
	const [showmodal, setShowmodal] = useState(false);

	return (
		<div className="font-poppins w-full box-border flex flex-col items-center justify-start px-4">
			<Navbar/>
			<div className="mt-9 w-full flex flex-col items-start justify-start">
				<div className='font-bold' style={{color: PRIMARY900}}>Welcome Back,</div>
				<div className='font-bold' style={{color: PRIMARY900}}>Daniel</div>
			</div>
			<div className='box-border w-full px-3 flex flex-col items-center justify-start'>
				<div className='box-border w-full flex flex-row pl-9 pr-6 justify-between items-center rounded-xl mt-7' style={{backgroundColor: PRIMARY900}}>
					<div>
						<div className="text-lg text-white">Begin Moving with Ease</div>
						<div className="flex flex-row items-center justify-start text-md text-white mt-4">Ride with Shuttlers <img className='ml-2' alt="arrow" style={{width:'12px'}} src="arrow.png"/></div>
					</div>
					<img alt="userpgbg" src="userbg.png"/>
				</div>

				<div className='w-full flex flex-row justify-between items-center border rounde-md mt-8 p-2' style={{borderColor:NEUTRAL300}}>
					<div className='flex flex-row items-center justify-start'>
						<img alt="search" src="search.png" className='mr-2'/>
						<input type="text" placeholder='Where to?' className='active:outline-none focus:outline-none'/>
					</div>
					<div className='flex flex-row items-center justify-between px-3.5 py-1.5 rounded-full'style={{color:NEUTRAL400, backgroundColor: NEUTRAL100}}>
						<img className='mr-2' alt="clock" src="clock.png"/>
						Now
					</div>
				</div>

				<div className='w-full box-border flex flex-row items-center justify-between mt-8'>
					<div className='w-40 h-28 flex flex-col items-center justify-center font-bold' style={{backgroundColor:PRIMARY300, color:PRIMARY800,}}>
						<img className='mb-2' alt="noofrides" src="noofrides.png"/>
						No of rides
					</div>

					<div className='w-40 h-28 flex flex-col items-center justify-center font-bold' style={{backgroundColor:PRIMARY300, color:PRIMARY800,}}>
						<img className='mb-2' alt="bookrides" src="bookrides.png"/>
						Book rides
					</div>

					<div className='w-40 h-28 flex flex-col items-center justify-center font-bold' style={{backgroundColor:PRIMARY300, color:PRIMARY800,}}>
						<img className='mb-2' alt="tickets" src="tickets.png"/>
						Tickets
					</div>

					<div className='w-40 h-28 flex flex-col items-center justify-center font-bold' style={{backgroundColor:PRIMARY300, color:PRIMARY800,}}>
						<img className='mb-2' alt="routes" src="routes.png"/>
						Routes
					</div>
				</div>

				<div className='w-full box-border flex flex-col justify-start items-center mt-10'>
					<div className='w-full font-bold'>
						Recent Rides
					</div>
					<div className='w-full box-border flex flex-row items-center justify-between p-3 mt-3'>
						<div className='flex flex-row items-center justify-start font-bold'>
							<img alt="car" src="car.png" className="mr-2"/>
							Cucrid Building
						</div>
						<div className='text-sm font-bold' style={{color: SECONDARY500}}>12 mins ago</div>
					</div>
				</div>
			</div>
			<Modal
				showmodal={showmodal}
				modalobj={ARRIVINGMODAL}
			/>
		</div>
	);
}

export default User