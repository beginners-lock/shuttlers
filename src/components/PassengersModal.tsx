import { MODALBODYTEXT, MODALBG, NEUTRAL500, NEUTRAL300, PRIMARY700, NEUTRAL700 } from "../theme/colors";
import { useState, useRef } from 'react';
import SplitInput from "./SplitInput";


type PModal = {
    showmodal: boolean,
    currentlocation: string|null,
    destination: string|null,
    price: number,
    closemodal?: ()=>void,
    finish: (passengers:number, price:number, pin:string)=>void
}

export default function PassengersModal({currentlocation, destination, showmodal, price, closemodal, finish}: PModal){
    const type = "passengersmodal";
    const title = "Passengers";
    const buttontext = "Continue";

    let inputRef = useRef<HTMLInputElement>(null);
    const [passengers, setPassengers] = useState(0);
    const [pin, setPin] = useState('');

    const onPress = () => { 
        inputRef.current?.focus(); 
    }

    const passengerinputchange = () => {
        let el = document.getElementById('pmodalinput') as HTMLInputElement;
        if(parseInt(el.value)>4){ el.value='4'; }
        if(parseInt(el.value)<1){ el.value='1'; }
        setPassengers(parseInt(el.value));
    }

    const scrolltopin = () => {
        let el = document.getElementById('pmodalscrollpane') as HTMLDivElement;
        el.scrollLeft = 450;
    }

    const scrollBack = () => {
        let el = document.getElementById('pmodalscrollpane') as HTMLDivElement;
        el.scrollLeft = 0;
    }
    
    return(
        <div className="absolute z-0 w-full h-[100%] flex flex-row items-center justify-center" style={{backgroundColor: MODALBG, display:showmodal?'flex' :'none'}}>
            <div className="bg-white w-[450px] box-border rounded-xl p-8">
                <div id="pmodalscrollpane" className="w-full flex flex-row items-start justify-start overflow-x-hidden scroll-smooth">
                    <div className="min-w-full max-w-full h-full flex flex-col items-center justify-start box-border">
                        <div className="w-full flex flex-row items-center justify-end">
                            <img alt="close" src="../modalclose.png" onClick={()=>{ if(closemodal){ closemodal(); } }} />
                        </div>

                        <div className="mt-5 text-center text-2xl font-semibold" style={{color:PRIMARY700}}>{title}</div>

                        <div className="w-full text-center text-md mt-3.5 flex flex-col" style={{color: MODALBODYTEXT}}>
                            <div className="flex flex-col items-start justify-center">
                                <div className="text-md font-semibold" style={{color:NEUTRAL700}}>Current Location</div>    
                                <div className="text-lg font-semibold">{currentlocation}</div>
                            </div>    

                            <div className="mt-4 flex flex-col items-start justify-center">
                                <div className="text-md font-semibold" style={{color:NEUTRAL700}}>Destination</div>    
                                <div className="text-lg font-semibold">{destination}</div>
                            </div>    

                            <div className="mt-4 flex flex-col items-start justify-center">
                                <div className="text-md font-semibold" style={{color:NEUTRAL700}}>Price</div>    
                                <div className="text-xl font-semibold">{'₦ '+(passengers ? price*passengers : 0)}</div>
                            </div>

                            <div className="mt-4 flex flex-col items-start justify-center">
                                <div className="text-md font-semibold" style={{color:NEUTRAL700}}>Passengers</div>
                                <input id="pmodalinput" className="border-0 border-b border-slate-700 w-28 h-10 active:outline-none focus:outline-none text-black" type="number" min={0} max={4} onChange={()=>{ passengerinputchange(); }}/>
                            </div>    
                        </div>

                        <button className="w-full text-white font-md rounded-full mt-6 p-2" style={{backgroundColor:PRIMARY700}} onClick={()=>{ if(passengers){ scrolltopin(); } }}>{buttontext}</button>
                    </div>

                    <div className="min-w-full max-w-full h-full flex flex-col items-center justify-start box-border">
                        <div className="w-full flex flex-row items-center justify-between">
                            <div className="flex flex-row items-center justify-start text-md" onClick={()=>{ scrollBack(); } }>
                                <img alt="goback" src="../goback.png" className="mr-2"/>
                                Go back
                            </div>
                            <img alt="close" src="../modalclose.png" onClick={()=>{ if(closemodal){ closemodal(); } }} />
                        </div>

                        <div className="mt-5 text-center text-2xl font-semibold" style={{color:PRIMARY700}}>Set Ride Pin</div>

                        <SplitInput
                            inputRef={inputRef}
                            otp={pin}
                            onPress={onPress}
                            setOtp={setPin}
                            confirmotp={()=>{ finish(passengers, passengers*price, pin);  }}
                            otplen={4}
                        /> 

                        <button className="w-full text-white font-md rounded-full mt-16 p-2" style={{backgroundColor:PRIMARY700}} onClick={()=>{ finish(passengers, passengers*price, pin); }}>Confirm</button>                        
                    </div>
                </div>
            </div>
        </div>
    );
}