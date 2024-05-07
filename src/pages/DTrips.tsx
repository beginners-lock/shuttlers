import DNavbar from "../components/DNavbar";
import { useState } from 'react';
import { ERROR500, NEUTRAL500, SECONDARY500, SECONDARY900, SUCCESS500, SUCCESS700 } from '../theme/colors';

export default function DTrips(){
    const [online, setOnline] = useState(false);
    const [activetriptab, setActivetriptab] = useState('available');

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

            
            <DNavbar/>
        </div>
    )
}