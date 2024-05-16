import DNavbar from '../components/DNavbar';
import setfavicon from '../constants/setfavicon';
import { useState, useEffect } from 'react';
import { ERROR500, NEUTRAL500, SECONDARY500, SECONDARY900, SUCCESS500, SUCCESS700 } from '../theme/colors';
import { DriverType } from '../constants/types';
import { firebaseConfig } from '../firebaseconfig';
import { initializeApp } from 'firebase/app';
import { ref, getDatabase, update, push, onValue } from 'firebase/database';
import PinModal from '../components/PinModalD';

export default function Driver(){
    const urlstring = window.location.search;
    const params = new URLSearchParams(urlstring);
    const id = params.get('id');

    initializeApp(firebaseConfig);
	const db = getDatabase();
	const ridesRef = ref(db, '/rides');
	const driverwalletRef = ref(db, '/drivers/'+id+'/wallet');

    const [driver, setDriver] = useState<DriverType|null>(null);
    const [wallet, setWallet] = useState(0);
	const [availablerides, setAvailablerides] = useState<any[]>([]);
    const [pinloading, setPinloading] = useState(false);
    const [pinwarning, setPinwarning] = useState('');
    const [showmodal, setShowmodal] = useState(false);

    useEffect(()=>{
        let session = sessionStorage.getItem('shuttlerssession');

		if(session && session!=='undefined'){
			let driver = JSON.parse(session);
            if(driver.type==='driver'){
                setDriver(driver);
            }else{
                sessionStorage.clear();
			    window.location.href = '/';
            }
		}else{
			window.location.href = '/';
		}

        setfavicon({ type:'driver' });

        const unsub = onValue(ridesRef, (snapshot)=>{
			console.log('unsub');
            let rides: any = snapshot.val();
			if(rides){
                //Some action is done here
                let vals = Object.values(rides);
                let keys = Object.keys(rides);
                
                let pendingfilter = vals.map((val: any, index)=>{
                    if(val.status==='pending'){
                        val.id = keys[index];
                        return val;
                    }
                });

                console.log(pendingfilter);
                setAvailablerides(pendingfilter);
                /*let ridesArr
                let streamed = rides.filter((obj: any) => { return obj. });
				setRides(Object.values(rides));
				setRidekeys(Object.keys(rides));*/
			}else{
				setAvailablerides([]);
			}
		});

        const unsubwallet = onValue(driverwalletRef, (snapshot)=>{
			console.log('wallet');
            let wallet: number = snapshot.val();
			setWallet(wallet);
		});

        return ()=>{ /*unsub();*/ unsubwallet(); }
    }, []);

    const [online, setOnline] = useState(false);
    //const [activetriptab, setActivetriptab] = useState('available');

    const toggleonlinestatus = () => {
        setOnline((state)=>{ return !state });
    }

    const pincheck = (pin: string) => {
        console.log(pin);
    }

    return(
        <div className="relative w-full h-full flex flex-col items-center justify-start">
            <div className='w-full h-[140px] flex flex-row items-center justify-between p-5' style={{backgroundColor: SECONDARY900}}>
                <div className='text-white'>
                    <div className='text-md font-semibold'>Shuttlers</div>
                    <div className='text-lg font-bold'>Driver Dashboard</div>
                </div>

                <div className='flex flex-col items-end justify-center'>
                    <div className='border border-white rounded-full p-1.5'>
                        <img alt="bell" src="../driverhomenotification.png"/>
                    </div>
                    <div className='my-2 flex flex-row items-center justify-between'>
                        <div className='mr-2 p-1.5 rounded-full flex flex-row items-center justify-center' style={{backgroundColor:'#FEF1F233'}}>
                            <div className='w-3 h-3 rounded-full duration-300 transition-all' style={{backgroundColor: online?SUCCESS500:ERROR500}}></div>
                        </div>

                        <div className='relative inline-block px-1 w-[54px] h-[30px] border-2 border-white rounded-full flex flex-row items-center' onClick={()=>{ toggleonlinestatus(); }}>
                            <div className="absolute bg-white w-[18px] h-[18px] rounded-full duration-300 transition-all" style={{left:online?'28px':'4px'}}></div>
                        </div>
                    </div>
                    <div>
                        <img alt="info" src="../driverhomeinfo.png"/>
                    </div>
                </div>
            </div>

            <div className='w-full flex flex-col items-center justify-start overflow-y-auto'>
                <div className="mt-8 w-full flex flex-col items-start justify-start font-poppins px-2">
                    <div className='font-semibold' style={{color: SECONDARY900}}>Welcome Back,</div>
                    <div className='font-semibold' style={{color: SECONDARY900}}>{driver?.fullname}</div>
                </div>

                <div className="relative mt-6 w-[95%] min-h-[180px] max-h-[180px] rounded-lg shadow-lg box-border px-4 py-4 flex flex-col items-start justify-between" style={{backgroundImage:'linear-gradient(to bottom right, #002B67 0%, #25818B 70%, #5FAA62 100%)'}}>
                    <div className="flex flex-row items-center justify-between w-full">
                        <img alt="logo" src="../logowhite.png" className='w-6'/>
                        <div className="flex flex-row items-center justify-start text-sm" style={{color: 'lightgrey'}}>
                            Virtual Card
                            <img alt="waves" src="../cardwaves.png" className="ml-1 w-5"/>
                        </div>
                    </div>
                    <div>
                        <div className='text-sm' style={{color:'lightgrey'}}>Balance</div>
                        <div className="mt-1 flex flex-row items-center justify-start" style={{color:'white'}}>
                            <div className='text-2xl font-semibold'>{wallet+' NGN'}</div>
                            <div className='flex flex-row items-center justify-start ml-6 text-sm'>
                                <img alt="addcircle" src="../addcircle.png" className='mr-1'/>
                                Top-Up
                            </div>
                        </div>
                    </div>
                    <img alt="cardvector" src="../cardvector.png" className='absolute right-0 bottom-0'/>
                </div>

                <div className='px-2 mt-8 font-poppins w-full pb-16'>
                    <div className='font-semibold text-lg' style={{color:SECONDARY900}}>Trips</div>
                    <div className='mt-4 flex flex-row items-center justify-between'>
                        <div className='flex flex-row items-center justify-between'>
                            <div className='px-2.5 py-1 rounded-full text-sm mr-2 font-semibold' style={{color: SECONDARY900}}>Ride Requests</div>
                        </div>

                        <div className='text-xs' style={{color:SECONDARY500}}>view more</div>
                    </div>
                    <div className='w-full mt-6 px-2 flex flex-col items-center justify-start text-center text-sm' style={{color:NEUTRAL500}}>
                        {
                            online ?
                                availablerides.map((ride) => {
                                    return(
                                        <div className='w-full' key={ride.id}>
                                            <div className="w-full border border-slate-300 rounded-md px-2 py-4 mb-4">
                                                <div className='flex flex-row items-center justify-between'>
                                                    <div className='text-left text-md font-semibold' style={{color:SECONDARY900}}>{ride.username}</div>
                                                    <div className='flex flex-row items-center justify-start text-xs' style={{color:NEUTRAL500}}>
                                                        <img alt="passengers" src="../passengers.png" className='w-3 mr-2'/>
                                                        {ride.passengers+(ride.passengers===1?' passenger':' passengers')}
                                                    </div>
                                                </div>
                                                <div className='w-full flex flex-row items-center justify-between mt-2 text-xs'>
                                                    {ride.currentlocation+' -> '+ride.destination}
                                                </div>
                                                <div className='flex flex-row items-center justify-end mt-4'>
                                                    <button className='text-xs text-white rounded-md py-2 px-4' style={{backgroundColor:SUCCESS700}}>Completed Ride</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            :
                                'You have not turned on your \'availabiliy\' so you cannot see this feature'
                        }
                    </div>
                </div>
            </div>

            <DNavbar/>
            <PinModal
                visible={showmodal}
                btnclick={pincheck}
                loading={pinloading}
                warning={pinwarning}
            />
        </div>
    )
}


/**
 * <div className='px-2.5 py-1 rounded-full text-sm mr-2' onClick={()=>{ if(activetriptab!=='available'){ setActivetriptab('available'); } }} style={{backgroundColor: activetriptab==='available'?SECONDARY900:'transparent', color: activetriptab==='available'?'white':'black'}}>Available</div>
                        <div className='px-2.5 py-1 rounded-full text-sm' onClick={()=>{ if(activetriptab!=='completed'){ setActivetriptab('completed'); } }} style={{backgroundColor: activetriptab==='completed'?SECONDARY900:'transparent', color: activetriptab==='completed'?'white':'black'}}>Completed</div>
 * 
 * :
        <div className='w-full'>
            <div className="w-full border border-slate-300 rounded-md px-2 py-3 mb-4">
                <div className='w-full flex flex-row items-center justify-between'>
                    <div className='text-left text-md font-semibold' style={{color:SECONDARY900}}>Student Username</div>
                    <div className='text-sm'>Dest: EIE</div>
                </div>
                <div className='w-full flex flex-row items-center justify-between mt-4'>
                    <div className='flex flex-row items-center justify-start' style={{color:NEUTRAL500}}>
                        <img alt="passengers" src="../trippassengers.png" className='mr-2'/>
                        3 passengers
                    </div>
                    <div className='text-xs'>45 mins ago</div>
                </div>
            </div>
        </div>
 */