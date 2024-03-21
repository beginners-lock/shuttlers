import { useRef, useState } from 'react';
import Navbar from '../components/Navbar'
import { PRIMARY300, PRIMARY900, NEUTRAL500, NEUTRAL700, PRIMARY700, PRIMARY800, SECONDARY500, LIGHTPURPLE, ERROR700 } from '../theme/colors'
import { Link } from 'react-router-dom';
import SplitInput from '../components/SplitInput';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/Spinner';
import { FORGOTPASSWORDMODAL } from '../constants/modalvariables';
import { EMPTY_FIELD_ERROR, INVALID_EMAIL_ERROR, NO_EMAIL_EXISTS, PROCESSING_ERROR, UNSIMILAR_PASSWORDS, PASSWORD_REQ_ERROR } from '../constants/messages';
import axios from 'axios';
import { URL, PASSWORD_LENGTH } from '../constants/globalvariables';


const Forgotpassword = () => {
    const [otp, setOtp] = useState<string>('');
    const [otpinput, setOtpinput] = useState<string>('');
    const [showmodal, setShowmodal] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [otploading, setOtploading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailw, setEmailw] = useState('');
    const [processingw1, setProcessingw1] = useState('');
    const [processingw2, setProcessingw2] = useState('');
    const [passwordw, setPasswordw] = useState('');
    const [otpwarning, setOtpwarning] = useState('');
    const [passvisible, setPassvisible] = useState(false);

    let inputRef = useRef<HTMLInputElement>(null);
    
    const onPress = () => { 
        inputRef.current?.focus(); 
    }

    const checkemail = () => {
        setEmailw(''); setProcessingw1('');
        let error = false;

        let emailinput = document.getElementById('emailinput') as HTMLInputElement;
        let email = emailinput.value;

        if(!email.includes('@stu.cu.edu.ng') || email.length<17){ error=true; setEmailw(INVALID_EMAIL_ERROR); }
        if(email===""){ error=true; setEmailw(EMPTY_FIELD_ERROR); }

        if(!error){
            setLoading1(true);
            axios.post(URL+'/checkemailexistence', { email: email }).then(response => {
                if(response.status === 200){
                    let data = response.data;

                    if(data.err){
                        setProcessingw1(PROCESSING_ERROR); setLoading1(false);
                    }else{
                        if(data.success){
                            setEmail(email); sendotp(email);
                        }else{
                            console.log('hree');
                            setProcessingw1(NO_EMAIL_EXISTS); setLoading1(false);
                        }
                    }
                }else{
                    setProcessingw1(PROCESSING_ERROR); setLoading1(false);
                }
            });
        }
    }

    const sendotp = (arg=email) => {
		setOtpwarning(''); setProcessingw1('');

        axios.post(URL+'/sendotp', {email: arg}).then(response => {
			if(response.status === 200){
				let data = response.data;

				if(data.err){
					setProcessingw1(PROCESSING_ERROR); setOtpwarning(PROCESSING_ERROR);
				}else{
					setOtp(data.otp.toString());
					let slider = document.getElementById('fpslider') as HTMLDivElement;
                    slider.scrollLeft = window.innerWidth;
					console.log(data.otp);
				}
			}else{
				setProcessingw1(PROCESSING_ERROR); setOtpwarning(PROCESSING_ERROR);
			}

			setLoading1(false); setOtploading(false);
		});
    }

    const scrollToResetPage = () => {
        let slider = document.getElementById('fpslider') as HTMLDivElement;
        slider.scrollLeft = window.innerWidth*2;
    }

    const passwordTracker = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const element = event.target as HTMLInputElement;
		setPassword(element.value);
	}

	const lowercaseCheck = (string: string) => {
		return string !== string.toUpperCase();
	}

	const uppercaseCheck = (string: string) => {
		return !(string === string.toLowerCase());
	}

	const numericCheck = (string: string) => {
		return /\d/.test(string);
		//return /^[0-9A-Z]+$/i.test(string);
	}

    const resetpassword = () => {
        setProcessingw2(''); setPasswordw('');
        let error = false;

        //Check password
		let pass2Input = document.getElementById('pass2input') as HTMLInputElement;
		let pass2 = pass2Input.value;
		if(password!=='' && uppercaseCheck(password) && lowercaseCheck(password) && password.length>=PASSWORD_LENGTH && numericCheck(password)){
			if(password!==pass2){
				setPasswordw(UNSIMILAR_PASSWORDS); error = true;
			}
		}else{
			setPasswordw(PASSWORD_REQ_ERROR); error=true;
		}

        if(!error){
            setLoading2(true);
            axios.post(URL+'/changepassword', {email: email, password: password}).then(response => {
                if(response.status===200){
                    let data = response.data;
                    if(data.err){
                        setProcessingw2(PROCESSING_ERROR); setLoading2(false); 
                    }else{
                        sessionStorage.setItem('shuttlersuser', JSON.stringify(data.user));
                        setShowmodal(true); setLoading2(false); 
                    }
                }else{
                    setProcessingw2(PROCESSING_ERROR); setLoading2(false); 
                }
            });
        }
    }

    return (
        <div className="font-poppins w-full box-border flex flex-col items-center justify-start px-4">
            <Navbar/>
            <div id="fpslider" className="mt-20 w-full box-border flex flex-row items-start justify-start overflow-x-hidden scroll-smooth snap-x snap-mandatory">
                <div className='min-w-full max-w-full box-border px-36 flex flex-col items-center justify-start snap-center'>
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
                            <input id="emailinput" type="text" className='box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4] active:outline-none focus:outline-none'/>
						    <div className='mt-2 text-sm h-6' style={{color:ERROR700}}>{emailw}</div>
                        </div>

                        <button className='flex flex-row items-center justify-center w-full h-12 mt-12 rounded-md text-white text-lg' style={{backgroundColor:PRIMARY700}} onClick={()=>{ checkemail(); }}>
                            <div style={{display:loading1?'none':'flex'}}>Reset Password</div>
							<LoadingSpinner
								loading={loading1}
								size={'20px'}
								borderColor={'white'}
								borderTopColor={PRIMARY700}
							/>
                        </button>
                        <div className='w-full text-center mt-2 text-sm h-6' style={{color:ERROR700}}>{processingw1}</div>

                        <Link to="/signin" className='mt-8 flex flex-row items-center justify-center'>
                            <img alt="back" src="back.png" className='mr-2'/>
                            Back to Login
                        </Link>
                    </div>
                </div>

                <div className='min-w-full max-w-full box-border px-36 flex flex-col items-center justify-start snap-center'>
                    <img className='border-4 p-0.5 rounded-md' alt="mail" src="mail.png" style={{backgroundColor: LIGHTPURPLE}}/>
                    <div className='w-full text-center mt-8 font-bold text-xl' style={{color:PRIMARY800}}>
                        Confirm Email
                    </div>
                    <div className='w-full text-center text-md mt-2 font-bold' style={{color:NEUTRAL500}}>
                        We sent a code to <strong>{email}</strong>
                    </div>

                    <div className='mt-8 w-full box-border'>
                        <SplitInput
                            inputRef={inputRef}
                            otp={otpinput}
                            onPress={onPress}
                            setOtp={setOtpinput}
                            confirmotp={()=>{ if(!otploading && otpinput===otp){ scrollToResetPage(); } }}
                            otplen={4}
                        />            

                        <button className='flex flex-row items-center justify-center w-full h-12 mt-12 rounded-md text-white text-lg' style={{backgroundColor:PRIMARY700}} onClick={()=>{ if(!otploading && otpinput===otp){ scrollToResetPage(); } }}>
                            <div style={{display:otploading?'none':'flex'}}>Confirm</div>
							<LoadingSpinner
								loading={otploading}
								size={'20px'}
								borderColor={'white'}
								borderTopColor={PRIMARY700}
							/>
                        </button>
						<div className='w-full text-center text-lg mt-3 h-6' style={{color:ERROR700}}>{otpwarning}</div>

                        <div className='mt-6 flex flex-row items-center justify-center'>
                            Did't receive an email? 
                            <div className='ml-2 font-bold' style={{color:SECONDARY500}} onClick={()=>{ if(!otploading){ setOtploading(true); sendotp(); } }}>Click to resend</div>
                        </div>

                        <Link to="/signin" className='mt-8 flex flex-row items-center justify-center'>
                            <img alt="back" src="back.png" className='mr-2'/>
                            Back to Login
                        </Link>
                    </div>
                </div>

                <div className='min-w-full max-w-full box-border px-36 flex flex-col items-center justify-start snap-center'>
                    <img className='border-4 p-0.5 rounded-md' alt="key" src="key.png" style={{backgroundColor: LIGHTPURPLE}}/>
                    <div className='w-full text-center mt-8 font-bold text-xl' style={{color:PRIMARY800}}>
                        Set New Password
                    </div>
                    <div className='w-full text-center text-md mt-2 font-bold' style={{color:NEUTRAL500}}>
                        Must be at least 9 characters
                    </div>

                    <div className='mt-8 w-full box-border'>
                        <div className="mt-7 box-border w-full flex flex-col justify-start items-start">
                            <label className='text-lg font-bold' style={{color:NEUTRAL700}}>Password</label>
                            <div className="flex flex-row items-center justify-between box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4]">
                                <input id="passinput" type={passvisible?"text":"password"} className='box-border w-full rounded-lg active:outline-none focus:outline-none' onKeyUp={(e)=>{ passwordTracker(e); }}/>
                                <img alt="eyeimg" src={passvisible?"show.png":"hide.png"} onClick={()=>{ setPassvisible(state => !state); }}/>
                            </div>
                            <div className='mt-2 w-5/6 flex flex-row items-start justify-start box-border flex-wrap'>
								<div className='w-1/2 flex flex-row justify-start items-center box-border mt-2'>
									<div className='p-0.5' style={{backgroundColor:PRIMARY300}}>
										<img alt="tick1" src="tick.png" style={{visibility: password!=='' && lowercaseCheck(password) ?'visible':'hidden'}}/>
									</div>
									<div className='ml-2 text-sm font-bold' style={{color: password!=='' && lowercaseCheck(password) ? PRIMARY900 : NEUTRAL500}}>Lowercase characters</div>
								</div>
								<div className='w-1/2 flex flex-row justify-start items-center box-border mt-2'>
									<div className='p-0.5' style={{backgroundColor:PRIMARY300}}>
										<img alt="tick2" src="tick.png" style={{visibility: password!=='' && password.length>=PASSWORD_LENGTH ?'visible':'hidden'}}/>
									</div>
									<div className='ml-2 text-sm font-bold' style={{color: password!=='' && password.length>=PASSWORD_LENGTH ? PRIMARY900 : NEUTRAL500}}>9 characters minimum</div>
								</div>
								<div className='w-1/2 flex flex-row justify-start items-center box-border mt-2'>
									<div className='p-0.5' style={{backgroundColor:PRIMARY300}}>
										<img alt="tick3" src="tick.png" style={{visibility: password!=='' && numericCheck(password) ?'visible':'hidden'}}/>
									</div>
									<div className='ml-2 text-sm font-bold' style={{color: password!=='' && numericCheck(password) ? PRIMARY900 : NEUTRAL500}}>Numbers</div>
								</div>
								<div className='w-1/2 flex flex-row justify-start items-center box-border mt-2'>
									<div className='p-0.5' style={{backgroundColor:PRIMARY300}}>
										<img alt="tick4" src="tick.png" style={{visibility: password!=='' && uppercaseCheck(password) ?'visible':'hidden'}}/>
									</div>
									<div className='ml-2 text-sm font-bold' style={{color: password!=='' && uppercaseCheck(password) ? PRIMARY900 : NEUTRAL500}}>Uppercase characters</div>
								</div>
							</div>
                        </div>

                        <div className="mt-7 box-border w-full flex flex-col justify-start items-start">
                            <label className='text-lg font-bold' style={{color:NEUTRAL700}}>Confirm Password</label>
                            <div className="flex flex-row items-center justify-between box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4]">  
                                <input id="pass2input" type={passvisible?"text":"password"} className='box-border w-full rounded-lg active:outline-none focus:outline-none'/>
                                <img alt="eyeimg" src={passvisible?"show.png":"hide.png"} onClick={()=>{ setPassvisible(state => !state); }}/>
                            </div>
                            <div className='mt-2 text-sm h-6' style={{color:ERROR700}}>{passwordw}</div>
                        </div>

                        <button className='flex flex-row items-center justify-center w-full h-12 mt-12 rounded-md text-white text-lg' style={{backgroundColor:PRIMARY700}} onClick={()=>{ if(!loading2){ resetpassword(); } }}>
                            <div style={{display:loading2?'none':'flex'}}>Reset Password</div>
							<LoadingSpinner
								loading={loading2}
								size={'20px'}
								borderColor={'white'}
								borderTopColor={PRIMARY700}
							/>
                        </button>
						<div className='w-full text-center text-lg mt-3 h-6' style={{color:ERROR700}}>{processingw2}</div>

                        <Link to="/signin" className='mt-8 flex flex-row items-center justify-center'>
                            <img alt="back" src="back.png" className='mr-2'/>
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
            <Modal
                showmodal={showmodal}
                modalobj={FORGOTPASSWORDMODAL}
            />
        </div>
    )
}

export default Forgotpassword