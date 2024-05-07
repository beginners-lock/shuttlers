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

            
            <DNavbar/>
        </div>
    )
}