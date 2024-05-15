import { useState } from 'react';
import Navbar from '../components/Navbar'
import { NEUTRAL100, NEUTRAL300, NEUTRAL400, NEUTRAL50, PRIMARY300, PRIMARY800, PRIMARY900, SECONDARY500 } from '../theme/colors';
import { ARRIVINGMODAL, CURRENTLOCATIONMODAL, DEPARTMENTMODAL, DESTINATIONMODAL, HOSTELMODAL, LOGOUTMODAL, PAYMENTMETHODMODAL, RECENTRIDESMODAL, RIDETYPEMODAL } from '../constants/modalvariables';
import Modal from '../components/Modal';
import Sidebar from '../components/Sidebar';
import { RideObj } from '../constants/types';

const User = () => {
	const urlstring = window.location.search;
    const params = new URLSearchParams(urlstring);
    const id = params.get('id');

	const [showsidebar, setShowsidebar] = useState(false);
	const [showmodal, setShowmodal] = useState(false);
	const [activemodalobj, setActivemodalobj] = useState(CURRENTLOCATIONMODAL);
	const [rideobj, setRideObj] = useState<RideObj>({currentlocation:null, destination:null, price:null, passengers:null});

	const toggleSidebar = () => {
		setShowsidebar( state => { return !state; } )
	}

	return (
		<div className="font-poppins w-full box-border flex flex-col items-center justify-start px-4">
			<Navbar
				showSidebar={toggleSidebar}
			/>
			<div className="mt-9 w-full flex flex-col items-start justify-start">
				<div className='font-bold' style={{color: PRIMARY900}}>Welcome Back,</div>
				<div className='font-bold' style={{color: PRIMARY900}}>Daniel</div>
			</div>
			<div className='box-border w-full px-3 flex flex-col items-center justify-start'>
				<div className="relative mt-6 w-[600px] h-[250px] rounded-lg shadow-lg box-border px-6 py-8 flex flex-col items-start justify-between" style={{backgroundImage:'linear-gradient(to bottom right, #55004B 0%, #416E74 70%, #416E74 100%)'}}>
					<div className="flex flex-row items-center justify-between w-full">
						<img alt="logo" src="../logowhite.png" className='w-10'/>
						<div className="flex flex-row items-center justify-start" style={{color: 'lightgrey'}}>
							Virtual Card
							<img alt="waves" src="../cardwaves.png" className="ml-2"/>
						</div>
					</div>
					<div>
						<div style={{color:'lightgrey'}}>Balance</div>
						<div className="mt-2 flex flex-row items-center justify-start" style={{color:'white'}}>
							<div className='text-3xl font-semibold'>1000 NGN</div>
							<div className='flex flex-row items-center justify-start ml-6'>
								<img alt="addcircle" src="../addcircle.png" className='mr-1'/>
								Top-Up
							</div>
						</div>
					</div>
					<img alt="cardvector" src="../cardvector.png" className='absolute right-0 bottom-0'/>
				</div>

				<div className='w-full flex flex-row justify-between items-center border rounde-md mt-8 p-2' style={{borderColor:NEUTRAL300}}>
					<div className='flex flex-row items-center justify-start'>
						<img alt="search" src="../search.png" className='mr-2'/>
						<input type="text" placeholder='Where to?' className='active:outline-none focus:outline-none'/>
					</div>
					<div className='flex flex-row items-center justify-between px-3.5 py-1.5 rounded-full'style={{color:NEUTRAL400, backgroundColor: NEUTRAL100}}>
						<img className='mr-2' alt="clock" src="../clock.png"/>
						Now
					</div>
				</div>

				<div className='w-full box-border flex flex-row items-center justify-between mt-8'>
					<div className='w-40 h-28 flex flex-col items-center justify-center font-bold' style={{backgroundColor:PRIMARY300, color:PRIMARY800}} onClick={()=>{ setShowmodal(true); setActivemodalobj(CURRENTLOCATIONMODAL); }}>
						<img className='mb-2' alt="noofrides" src="../noofrides.png"/>
						Book a ride
					</div>

					<div className='w-40 h-28 flex flex-col items-center justify-center font-bold' style={{backgroundColor:PRIMARY300, color:PRIMARY800}}>
						<img className='mb-2' alt="bookrides" src="../bookrides.png"/>
						Rides History
					</div>

					<div className='w-40 h-28 flex flex-col items-center justify-center font-bold' style={{backgroundColor:PRIMARY300, color:PRIMARY800}} onClick={() => { window.location.href="/user/routes?id="+id; }}>
						<img className='mb-2' alt="routes" src="../routes.png"/>
						Routes
					</div>
				</div>

				<div className='w-full box-border flex flex-col justify-start items-center mt-10'>
					<div className='w-full font-bold'>
						Recent Rides
					</div>
					<div className='w-full box-border flex flex-row items-center justify-between p-3 mt-3'>
						<div className='flex flex-row items-center justify-start font-bold'>
							<img alt="car" src="../car.png" className="mr-2"/>
							Cucrid Building
						</div>
						<div className='text-sm font-bold' style={{color: SECONDARY500}}>12 mins ago</div>
					</div>
				</div>
			</div>
			<Modal
				showmodal={showmodal}//showmodal
				modalobj={activemodalobj}
				closemodal={()=>{ setRideObj({currentlocation:null, destination:null, price:null, passengers:null}); setShowmodal(false); }}
			/>
			<Sidebar
				showstate={showsidebar}
				hide={()=>{ setShowsidebar(false); }}
			/>
		</div>
	);
}

export default User;

/**
 * <div className='box-border w-full flex flex-row pl-9 pr-6 justify-between items-center rounded-xl mt-7' style={{backgroundColor: PRIMARY900}}>
					<div>
						<div className="text-lg text-white">Begin Moving with Ease</div>
						<div className="flex flex-row items-center justify-start text-md text-white mt-4">Ride with Shuttlers <img className='ml-2' alt="arrow" style={{width:'12px'}} src="../arrow.png"/></div>
					</div>
					<img alt="userpgbg" src="../userbg.png"/>
				</div>


	
	
	//Tickets
					<div className='w-40 h-28 flex flex-col items-center justify-center font-bold' style={{backgroundColor:PRIMARY300, color:PRIMARY800,}}>
						<img className='mb-2' alt="tickets" src="../tickets.png"/>
						Tickets
					</div>
 */