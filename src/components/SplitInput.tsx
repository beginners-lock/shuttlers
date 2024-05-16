import React, { useMemo, useEffect } from 'react';
import { NEUTRAL500 } from '../theme/colors';

/*export enum KeyBoardTypes {
    default = 'default',
    email = 'email-address',
    numeric = 'numeric',
    phone = 'phone-pad',
    url = 'url',
    number = 'number-pad',
    unset = 'unset',
}*/

type SplitInputProps = {
    inputRef: React.RefObject<HTMLInputElement>,
    otp: string,
    setOtp: React.Dispatch<React.SetStateAction<string>>,
    onPress: ()=>void
    confirmotp: ()=>void,
    otplen: number,
    height?: string,
    fontsize?: string
}

const SplitInput = ({inputRef, otp, setOtp, onPress, confirmotp, otplen, height, fontsize}: SplitInputProps) => {
    useEffect(()=>{
        //document.getElementById('otpinput').focus();
    }, []);

    const keyChecker = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key==='Enter' && otp.length===otplen){
            confirmotp();
        }
    }

    const otpContent = useMemo(() =>
        <div className='mt-2 flex flex-row w-full items-center justify-between'>
            {Array.from({ length: otplen }).map((_, i) => (
                <div
                    key={'si'+i}
                    className='flex flex-row items-center justify-center font-bold border rounded-md w-1/5 h-28'
                    onClick={onPress}
                    style={{borderColor: NEUTRAL500, fontSize:fontsize?fontsize:'50px', height:height?height:''}}
                >
                    {otp[i]}
                </div>
            ))}
        </div>
    , [onPress, otp, otplen]);

    return (
        <div className='w-full'>
            <input id="otpinput" type='number' maxLength={otplen} ref={inputRef}
                style={styles.input} onChange={(e) =>{ if(e.target.value.length <= otplen){ setOtp(e.target.value); } }}
                value={otp}
                inputMode={'numeric'}
                onKeyDown={(e)=>{ keyChecker(e); }}
            />

            {otpContent}
        </div>
    );
};

const styles = {
    input: {
        height: 0,
        width: 0,
    },

    textStyle: {
        height: 50,
        width: 50,
        color:'#1d4ed8',
        borderWidth: 1,
        fontSize: 28,
        textAlign: 'center',
        paddingTop: 8,
    },

    safeAreaStyle: {
        marginHorizontal: 20,
    },
};

export default SplitInput;