import SplitInput from "./SplitInput";
import LoadingSpinner from "./Spinner";
import { MODALBG, SECONDARY800 } from "../theme/colors";
import { useRef, useState, useEffect } from "react";

type PinModalProps = {
    btnclick: (pin: string)=>void,
    warning: string,
    loading: boolean,
    close: ()=>void
}

export default function PinModalD({ btnclick, warning, loading, close }: PinModalProps){
    let inputRef = useRef<HTMLInputElement>(null);
    const [pin, setPin] = useState('');

    useEffect(() => {
        return ()=>{ setPin(''); }  
    }, []);

    const onPress = () => { 
        inputRef.current?.focus(); 
    }

    return(
        <div className="absolute w-full h-full flex flex-row justify-center items-center" style={{backgroundColor: MODALBG}}>
            <div className="bg-white w-[350px] box-border rounded-xl p-8">
                <div className="w-full flex flex-row items-center justify-end">
                    <img alt="close" src="../modalclose.png" onClick={()=>{ close(); }} />
                </div>

                <div className="font-bold text-lg" style={{color:SECONDARY800}}>Ride Pin</div>
                <div className="mt-2 italic font-semibold">Ask passenger to input 4 digit pin used to book ride</div>

                <SplitInput
                    inputRef={inputRef}
                    otp={pin}
                    onPress={onPress}
                    setOtp={setPin}
                    confirmotp={()=>{ btnclick(pin);  }}
                    otplen={4}
                    height={"70px"}
                    fontsize={"40px"}
                />

                <div className='w-full text-center mt-2 text-xs h-6 text-red-700'>{warning}</div>

                <button className="mt-4 w-full rounded-md text-white flex flex-row justify-center items-center py-2 text-md font-bold" style={{backgroundColor:SECONDARY800}} onClick={()=>{ btnclick(pin); }}>
                    {
                        loading?
                            <LoadingSpinner
                                loading={loading}
                                borderColor="white"
                                borderTopColor="transparent"
                                size="20px"
                            />
                        :   'Confirm'
                    }
                </button>
            </div>
        </div>
    )
}