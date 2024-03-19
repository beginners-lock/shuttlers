import React, { useMemo, useEffect } from 'react';

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
}

const SplitInput = ({inputRef, otp, setOtp, onPress, confirmotp, otplen}: SplitInputProps) => {
    useEffect(()=>{
        //document.getElementById('otpinput').focus();
    }, []);

    const keyChecker = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key==='Enter' && otp.length===otplen){
            confirmotp();
        }
    }

    const otpContent = useMemo(() =>
        <div className='mt-2 flex flex-row w-full items-center justify-between w-[320px]'>
            {Array.from({ length: otplen }).map((_, i) => (
                <div
                    key={'si'+i}
                    className='flex flex-row items-center justify-center font-bold border w-10 h-14 text-[#1e40af]'
                    onClick={onPress}
                    style={{borderColor:'rgba(0,0,0,0)', borderBottom:otp.length===i ? '3px #1d4ed8 solid' : otp.length>i ? '3px #1e40af solid' : '3px grey solid', fontSize:'30px'}}
                >
                    {otp[i]}
                </div>
            ))}
        </div>
    , [otp]);

    return (
        <div className='w-full flex flex-row items-center justify-center'>
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