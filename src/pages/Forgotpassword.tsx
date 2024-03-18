import React, { useMemo, useRef, useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import { NEUTRAL500, NEUTRAL700, PRIMARY700, PRIMARY800, SECONDARY500, LIGHTPURPLE } from '../theme/colors'
import { Link } from 'react-router-dom';
import SplitInput from '../components/SplitInput/SplitInput';
import Modal from '../components/Modal';
import { FORGOTPASSWORDMODAL } from '../theme/messages';


const Forgotpassword = () => {
    const [otp, setOtp] = useState<string>('');
    let inputRef = useRef<HTMLInputElement>(null);
    const onPress = () => { inputRef.current?.focus(); }

    const confirmotp = () => {

    }

    return (
        <div className="font-poppins w-full box-border flex flex-col items-center justify-start px-4">
            <Navbar/>
            <div className="mt-20 w-full box-border flex flex-row items-start justify-start overflow-x-scroll">
                <div className='min-w-full max-w-full box-border px-36 flex flex-col items-center justify-start'>
                    <img className='border-4 p-0.5 rounded-md' alt="fingerprint" src="fingerprint.png" style={{backgroundColor: LIGHTPURPLE}}/>
                    <div className='w-full text-center mt-8 font-bold text-xl' style={{color:PRIMARY800}}>
                        Forgot password?
                    </div>
                    <div className='w-full text-center text-md mt-2 font-bold' style={{color:NEUTRAL500}}>
                        No worries, we'll send you reset instructions
                    </div>

                    <div className='mt-8 w-full box-border'>
                        <div className="mt-7 box-border w-full flex flex-col justify-start items-start">
                            <label className='text-lg font-bold' style={{color:NEUTRAL700}}>Email</label>
                            <input type="text" className='box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4] active:outline-none focus:outline-none'/>
                        </div>

                        <button className='w-full h-12 mt-12 rounded-md text-white text-lg' style={{backgroundColor:PRIMARY700}}>
                            Reset Password
                        </button>

                        <Link to="/signin" className='mt-8 flex flex-row items-center justify-center'>
                            <img alt="back" src="back.png" className='mr-2'/>
                            Back to Login
                        </Link>
                    </div>
                </div>

                <div className='min-w-full max-w-full box-border px-36 flex flex-col items-center justify-start'>
                    <img className='border-4 p-0.5 rounded-md' alt="mail" src="mail.png" style={{backgroundColor: LIGHTPURPLE}}/>
                    <div className='w-full text-center mt-8 font-bold text-xl' style={{color:PRIMARY800}}>
                        Password Reset
                    </div>
                    <div className='w-full text-center text-md mt-2 font-bold' style={{color:NEUTRAL500}}>
                        We sent a code to <strong>example@gmail.com</strong>
                    </div>

                    <div className='mt-8 w-full box-border'>
                        <SplitInput
                            inputRef={inputRef}
                            otp={otp}
                            onPress={onPress}
                            setOtp={setOtp}
                            confirmotp={confirmotp}
                            otplen={4}
                        />            

                        <button className='w-full h-12 mt-12 rounded-md text-white text-lg' style={{backgroundColor:PRIMARY700}}>
                            Continue
                        </button>

                        <div className='mt-6 flex flex-row items-center justify-center'>
                            Did't receive an email? 
                            <div className='ml-2 font-bold' style={{color:SECONDARY500}}>Click to resend</div>
                        </div>

                        <Link to="/signin" className='mt-8 flex flex-row items-center justify-center'>
                            <img alt="back" src="back.png" className='mr-2'/>
                            Back to Login
                        </Link>
                    </div>
                </div>

                <div className='min-w-full max-w-full box-border px-36 flex flex-col items-center justify-start'>
                    <img className='border-4 p-0.5 rounded-md' alt="key" src="key.png" style={{backgroundColor: LIGHTPURPLE}}/>
                    <div className='w-full text-center mt-8 font-bold text-xl' style={{color:PRIMARY800}}>
                        Set New Password
                    </div>
                    <div className='w-full text-center text-md mt-2 font-bold' style={{color:NEUTRAL500}}>
                        Must be at least 8 characters
                    </div>

                    <div className='mt-8 w-full box-border'>
                        <div className="mt-7 box-border w-full flex flex-col justify-start items-start">
                            <label className='text-lg font-bold' style={{color:NEUTRAL700}}>Password</label>
                            <input type="text" className='box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4] active:outline-none focus:outline-none'/>
                        </div>

                        <div className="mt-7 box-border w-full flex flex-col justify-start items-start">
                            <label className='text-lg font-bold' style={{color:NEUTRAL700}}>Confirm Password</label>
                            <input type="text" className='box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4] active:outline-none focus:outline-none'/>
                        </div>

                        <button className='w-full h-12 mt-12 rounded-md text-white text-lg' style={{backgroundColor:PRIMARY700}}>
                            Reset Password
                        </button>

                        <Link to="/signin" className='mt-8 flex flex-row items-center justify-center'>
                            <img alt="back" src="back.png" className='mr-2'/>
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
            <Modal
                modalobj={FORGOTPASSWORDMODAL}
            />
        </div>
    )
}

export default Forgotpassword