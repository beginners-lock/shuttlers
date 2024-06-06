import DNavbar from "../components/DNavbar";
import { useState, useEffect } from 'react';
import setfavicon from '../constants/setfavicon';
import PinModal from '../components/PinModalD';
import { firebaseConfig } from '../firebaseconfig';
import { initializeApp } from 'firebase/app';
import { ref, getDatabase, onValue, update } from 'firebase/database';
import { ERROR500, NEUTRAL500, SECONDARY900, SUCCESS500, SUCCESS700 } from '../theme/colors';
import { datefunct } from "../constants/globalvariables";

export default function DTrips(){
    const urlstring = window.location.search;
    const params = new URLSearchParams(urlstring);
    const id = params.get('id');

    initializeApp(firebaseConfig);
	const db = getDatabase();

    const [online, setOnline] = useState(false);
    const [activetriptab, setActivetriptab] = useState('available');
    const [wallet, setWallet] = useState(0);
	const [availablerides, setAvailablerides] = useState<any[]>([]);
    const [completedrides, setCompletedrides] = useState<any[]>([]);
    const [pinloading, setPinloading] = useState(false);
    const [pinwarning, setPinwarning] = useState('');
    const [showmodal, setShowmodal] = useState(false);
    const [activerideid, setActiverideid] = useState<string|null>(null);
    const [activerideindex, setActiverideindex] = useState<number|null>(null);
    const [activeridepin, setActiveridepin] = useState<string|null>(null);

    useEffect(()=>{
        let session = sessionStorage.getItem('shuttlerssession');

		if(session && session!=='undefined' && session!==undefined && session!=='null' && session!==null){
			let driver = JSON.parse(session);
            if(driver.type!=='driver'){
                sessionStorage.clear();
			    window.location.href = '/';
            }
		}else{
			window.location.href = '/';
		}

        console.log('effect');
        setfavicon({ type:'driver' });

        const db = getDatabase();
        const ridesRef = ref(db, '/rides');
        const tripsRef = ref(db, '/drivers/'+id+'/trips'); //These are the rides that have been completed by the driver
        const driverwalletRef = ref(db, '/drivers/'+id+'/wallet');

        const unsub = onValue(ridesRef, (snapshot)=>{
			console.log('unsub');
            let rides: any = snapshot.val();
			if(rides){
                //Some action is done here
                let vals = Object.values(rides);
                let keys = Object.keys(rides);
                
                let pendingfilter: any = [];
                vals.map((val: any, index)=>{
                    if(val.status==='pending'){
                        val.id = keys[index];
                        pendingfilter.push(val);
                    }
                    return '';
                });
                
                console.log(pendingfilter);
                setAvailablerides(pendingfilter);
			}else{
				setAvailablerides([]);
			}
		});

        const unsubCompleted = onValue(tripsRef, (snapshot)=>{
            console.log('unsubCompleted');
            let trips: any = snapshot.val();
            if(trips){
                //Some action is done here
                let vals = Object.values(trips);
                let keys = Object.keys(trips);
                
                let completedfilter: any = [];
                vals.map((val: any, index)=>{
                    val.id = keys[index];
                    completedfilter.push(val);
                    return '';
                });
                
                console.log(completedfilter);
                setCompletedrides(completedfilter);
			}else{
				setCompletedrides([]);
			}
        });

        const unsubwallet = onValue(driverwalletRef, (snapshot)=>{
            let wallet: number = snapshot.val();
			setWallet(wallet);
		});

        return ()=>{ unsubCompleted(); unsub(); unsubwallet(); }
    }, [id]);

    const pincheck = (pin: string) => {
        setPinwarning('');
        if(activerideid!==null && activerideindex!==null && pin===activeridepin){
            setPinloading(true);

            let date = datefunct();
            //Update user rides branch
            let userid = availablerides[activerideindex].userid;
            let userrideref = ref(db, '/users/'+userid+'/rides/'+activerideid);
            update(userrideref, {status:'completed', arrival:date}).then(()=>{
                //Add to the driver trips branch
                let trip = availablerides[activerideindex];
                let tripid = trip.id;
                delete trip.id;
                trip.status = "completed";
                trip.arrival = date;
                
                let drivertripsref = ref(db, '/drivers/'+id+'/trips/'+tripid);
                update(drivertripsref, trip).then(()=>{
                    //Update driver wallet
                    let balance = wallet+trip.price;
                    let driverRef = ref(db, '/drivers/'+id);
                    update(driverRef, {wallet: balance}).then(() => {
                        //Update ride branch
                        let rideref = ref(db, '/rides/'+activerideid);
                        update(rideref, {status: 'completed', arrival: date}).then(()=>{
                            setActiverideid(null);
                            setActiverideindex(null);
                            setActiveridepin(null);
                            setPinloading(false);
                            setShowmodal(false);
                        });
                    });
                });
            });   
        }else{
            setPinwarning('Wrong pin');
        }
    }

    const ridebtnclick = (id: string, pin: string, index:number) => {
        setActiverideid(id);
        setActiveridepin(pin);
        setActiverideindex(index);
        setShowmodal(true);
    }

    const closepinmodal = () => {
        setActiverideid(null);
        setActiveridepin(null);
        setActiverideindex(null);
        setShowmodal(false);
    }

    return(
        <div className="relative w-full h-full flex flex-col items-center justify-start">
            <div className='w-full h-[140px] flex flex-row items-center justify-between p-5' style={{backgroundColor: SECONDARY900}}>
                <div className='text-white'>
                    <div className='text-md font-semibold'>Shuttlers</div>
                    <div className='text-lg font-bold'>Driver Trips</div>
                </div>

                <div className='flex flex-col items-end justify-center'>
                    <div className='border border-white rounded-full p-1.5'>
                        <img alt="bell" src="../driverhomenotification.png"/>
                    </div>
                    <div className='my-2 flex flex-row items-center justify-between'>
                        <div className='mr-2 p-1.5 rounded-full flex flex-row items-center justify-center' style={{backgroundColor:'#FEF1F233'}}>
                            <div className='w-3 h-3 rounded-full duration-300 transition-all' style={{backgroundColor: online?SUCCESS500:ERROR500}}></div>
                        </div>

                        <div className='relative inline-block px-1 w-[54px] h-[30px] border-2 border-white rounded-full flex flex-row items-center' onClick={()=>{ console.log('bro'); setOnline((state)=>{ return !state }); }}>
                            <div className="absolute bg-white w-[18px] h-[18px] rounded-full duration-300 transition-all" style={{left:online?'28px':'4px'}}></div>
                        </div>
                    </div>
                    <div>
                        <img alt="info" src="../driverhomeinfo.png"/>
                    </div>
                </div>
            </div>

            <div className="w-[240px] mt-4 flex flex-row items-center justify-between">
                <div className='px-3.5 py-1 rounded-full mr-2' onClick={()=>{ if(activetriptab!=='available'){ setActivetriptab('available'); } }} style={{backgroundColor: activetriptab==='available'?SECONDARY900:'transparent', color: activetriptab==='available'?'white':'black'}}>Available</div>
                <div className='px-3.5 py-1 rounded-full' onClick={()=>{ if(activetriptab!=='completed'){ setActivetriptab('completed'); } }} style={{backgroundColor: activetriptab==='completed'?SECONDARY900:'transparent', color: activetriptab==='completed'?'white':'black'}}>Completed</div>
            </div>

            <div className="px-2 mt-4 w-full pb-16">
                {
                    activetriptab==='available'?
                        availablerides.map((ride:any, index:number)=>{
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
                                            <button className='text-xs text-white rounded-md py-2 px-4' style={{backgroundColor:SUCCESS700}} onClick={()=>{ ridebtnclick(ride.id, ride.pin, index); }}>Completed Ride</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    :   completedrides.map((ride:any, index:number)=>{
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
                                    </div>
                                </div>
                            )
                        })
                }
            </div>

            <DNavbar/>
            
            {
                showmodal &&    
                <PinModal
                    close={closepinmodal}
                    btnclick={pincheck}
                    loading={pinloading}
                    warning={pinwarning}
                />
            }
        </div>
    )
}