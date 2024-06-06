import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import { NEUTRAL100, NEUTRAL300, NEUTRAL400, PRIMARY300, PRIMARY800, PRIMARY900, SECONDARY500 } from '../theme/colors';
import Sidebar from '../components/Sidebar';
import { RideObj, UserType } from '../constants/types';
import CurrentLocationModal from '../components/CurrentLocationModal';
import DestinationModal from '../components/DestinationModal';
import PassengersModal from '../components/PassengersModal';
import { PRICES } from '../constants/location';
import { datefunct } from '../constants/globalvariables';
import { firebaseConfig } from '../firebaseconfig';
import { initializeApp } from 'firebase/app';
import { ref, getDatabase, update, push, onValue } from 'firebase/database';

const User = () => {
	const urlstring = window.location.search;
    const params = new URLSearchParams(urlstring);
    const id = params.get('id');

	initializeApp(firebaseConfig);
	const db = getDatabase();

	const [showsidebar, setShowsidebar] = useState(false);
	const [showmodal, setShowmodal] = useState(false);
	const [activemodal, setActivemodal] = useState("currentlocation");
	const [rideobj, setRideObj] = useState<RideObj>({currentlocation:null, destination:null, price:null, passengers:null});
	const [locationexception, setLocationexception] = useState<string|null>(null);
	const [price, setPrice] = useState(0);
	const [user, setUser] = useState<UserType|null>(null);
	const [wallet, setWallet] = useState(0);
	const [rides, setRides] = useState([]);
	const [ridekeys, setRidekeys] = useState<string[]>([]);

	useEffect(()=>{
		let session = sessionStorage.getItem('shuttlerssession');
		if(session && session!=='undefined'){
			let user = JSON.parse(session);
			if(user.type==='user'){
                setUser(user);
            }else{
                sessionStorage.clear();
			    window.location.href = '/';
            }
		}else{
			window.location.href = '/';
		}

		const db = getDatabase();
		const userridesRef = ref(db, '/users/'+id+'/rides');
		const userwalletRef = ref(db, '/users/'+id+'/wallet');

		const unsub = onValue(userridesRef, (snapshot)=>{
			console.log('unsub');
            let rides: any = snapshot.val();
			if(rides){
				let vals = Object.values(rides);
                let keys = Object.keys(rides);
                
                let pendingfilter: any = [];
				let pendingkeys: any = [];
                vals.map((val: any, index)=>{
                    if(val.status==='pending'){
                        pendingfilter.push(val);
						pendingkeys.push(keys[index]);
                    }
                    return '';
                });

				setRides(pendingfilter);
				setRidekeys(pendingkeys);
			}else{
				setRides([]);
				setRidekeys([]);
			}
		});

		const unsubwallet = onValue(userwalletRef, (snapshot)=>{
			console.log('wallet');
            let wallet: number = snapshot.val();
			setWallet(wallet);
		});

		return ()=>{ unsub(); unsubwallet(); }
	}, [id])

	const toggleSidebar = () => {
		setShowsidebar( state => { return !state; } )
	}

	const modalbtnclick = (type: string, location: string) => {
		if(location){
			if(type==='currentlocationmodal'){
				let obj = { ...rideobj };
				obj.currentlocation = location;
				setActivemodal("destination");
				setRideObj(obj);

				if(location.includes('Hall')){
					console.log('hall');
					setLocationexception('Hall');
				}

				if(location.includes('Dept. Building')){
					console.log('dept');
					setLocationexception('Dept. Building');
				}
			}
	
			if(type==='destinationmodal'){
				let obj = { ...rideobj };
				obj.destination = location;
				setActivemodal('passengers');
				setRideObj(obj);

				//Check for the route being talked about and the price
				let curlocation = ""; let destination = "";
				if(obj.currentlocation?.includes('Hall')){ curlocation="Hall"; }
				if(obj.currentlocation?.includes('Dept. Building')){ curlocation="Dept. Building" }
				if(obj.currentlocation==='Shuttle Stand'){ curlocation="Shuttle Stand" }
				if(obj.currentlocation==='CST'){ curlocation="CST" }
				if(obj.currentlocation==='Cafeteria 2'){ curlocation="Cafeteria 2" }

				if(obj.destination?.includes('Hall')){ destination="Hall"; }
				if(obj.destination?.includes('Dept. Building')){ destination="Dept. Building" }
				if(obj.destination==='Shuttle Stand'){ destination="Shuttle Stand" }
				if(obj.destination==='CST'){ destination="CST" }
				if(obj.destination==='Cafeteria 2'){ destination="Cafeteria 2" }

				let price = PRICES.filter((price) => { return(price.location===curlocation && price.destination===destination); });
				setPrice(price[0].price);
			}
		}
	}


	const modalback = (type: string) => {
		if(type==="destinationmodal"){
			let obj = { ...rideobj };
			obj.currentlocation = null;
			obj.destination = null;
			setActivemodal("currentlocation");
		}
	}

	const bookfunct = (passengers: number, price: number, pin: string) => {
		let now = datefunct();
		let ride = {
			userid: id,
			driverid: null,
			username: user?.firstname+' '+user?.lastname,
			useremail: user?.email,
			passengers: passengers,
			price: price,
			currentlocation: rideobj.currentlocation,
			destination: rideobj.destination,
			pin: pin,
			status: 'pending',
			booked: now,
			dropped: null
		}

		console.log(ride);

		const ridesRef = ref(db, 'rides/');
		let balance = wallet - price;

		let userRef = ref(db, '/users/'+id)
		push(ridesRef, ride).then(val => {
			//let data = {};
			if(val.key){
				const userspecificrideRef = ref(db, '/users/'+id+'/rides/'+val.key);
				update(userspecificrideRef, ride).then(()=>{
					update(userRef, {wallet: balance});
					setRideObj({currentlocation:null, destination:null, price:null, passengers:null});
					setActivemodal('currentlocation');
					setShowmodal(false);
				});
			}
		});
	}

	return (
		<div className="font-poppins w-full box-border flex flex-col items-center justify-start px-4">
			<Navbar
				showSidebar={toggleSidebar}
			/>
			<div className="mt-9 w-full flex flex-col items-start justify-start">
				<div className='font-bold' style={{color: PRIMARY900}}>Welcome Back,</div>
				<div className='font-bold' style={{color: PRIMARY900}}>{user?.firstname}</div>
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
							<div className='text-3xl font-semibold'>{wallet+' NGN'}</div>
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
					<div className='w-40 h-28 flex flex-col items-center justify-center font-bold' style={{backgroundColor:PRIMARY300, color:PRIMARY800}} onClick={()=>{ setShowmodal(true); setActivemodal("currentlocation"); }}>
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
						Pending Rides
					</div>
					{
						rides.length>0?
							rides.map((ride:any, index:number) => {
								return(
								<div key={ridekeys[index]} className='w-full box-border flex flex-row items-center justify-between p-3 mt-3'>
									<div className='flex flex-row items-center justify-start font-semibold text-sm w-[65%]'>
										<img alt="car" src="../car.png" className="mr-2"/>
										{ride.currentlocation +' -> '+ ride.destination}
									</div>

									<div className='flex flex-row items-center justify-center font-semibold text-sm w-[15%]'>
										<img alt="passengersicon" src="../passengers.png"/>
										{ride.passengers}
									</div>

									<div className='font-semibold text-sm w-[30%] text-right' style={{color: SECONDARY500}}>{ride.booked?ride.booked:'02:10:15  05/03/2024'}</div>
								</div>
								);
							})
						:	<div className='w-full box-border flex flex-row items-center justify-center p-3 mt-3'>No pending rides</div>
					}
				</div>
			</div>
			{
				/*false && 
					<Modal
						showmodal={showmodal}//showmodal
						modalobj={activemodal}
						closemodal={()=>{ setRideObj({currentlocation:null, destination:null, price:null, passengers:null}); setShowmodal(false); }}
						locationbtnprop={modalbtnclick}
						locationbackbtn={modalback}
					/>*/
			}
			
			{
				activemodal==='currentlocation' &&
					<CurrentLocationModal
						showmodal={showmodal}
						closemodal={()=>{ setRideObj({currentlocation:null, destination:null, price:null, passengers:null}); setShowmodal(false); }}
						locationbtnprop={modalbtnclick}
					/>
			}

			{
				activemodal==='destination' &&
				<DestinationModal
					showmodal={showmodal}
					closemodal={()=>{ setRideObj({currentlocation:null, destination:null, price:null, passengers:null}); setShowmodal(false); }}
					locationbtnprop={modalbtnclick}
					locationbackbtn={modalback}
					locationexception={locationexception}
					current={rideobj.currentlocation}
				/>
			}

			{
				activemodal==='passengers' &&
					<PassengersModal
						currentlocation={rideobj.currentlocation}
						destination={rideobj.destination}
						showmodal={showmodal}
						price={price}
						closemodal={()=>{ setRideObj({currentlocation:null, destination:null, price:null, passengers:null}); setShowmodal(false); }}
						finish={bookfunct}
						wallet={wallet}
					/>
			}

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


	<div className='w-full box-border flex flex-row items-center justify-between p-3 mt-3'>
						<div className='flex flex-row items-center justify-start font-bold'>
							<img alt="car" src="../car.png" className="mr-2"/>
							Cucrid Building
						</div>
						<div className='text-sm font-bold' style={{color: SECONDARY500}}>12 mins ago</div>
					</div>
 */