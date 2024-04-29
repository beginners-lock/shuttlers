import { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import SplitInput from '../components/SplitInput';
import { EMPTY_FIELD_ERROR, INVALID_EMAIL_ERROR, INVALID_MATRIC_ERROR, INVALID_OTP_ERROR, PASSWORD_REQ_ERROR, PROCESSING_ERROR, SIMILAR_USER, UNSIMILAR_PASSWORDS } from '../constants/messages';
import { PASSWORD_LENGTH, URL } from '../constants/globalvariables';
import { PRIMARY800, PRIMARY300, NEUTRAL500, NEUTRAL700, PRIMARY700, PRIMARY900, ERROR700, SECONDARY500, LIGHTPURPLE } from '../theme/colors';
import LoadingSpinner from '../components/Spinner';
import axios from 'axios';

const Signup = () => {
	let inputRef = useRef<HTMLInputElement>(null);

	const [otp, setOtp] = useState<string>('');
    const [otpinput, setOtpinput] = useState<string>('');
	const [email, setEmail] = useState('');
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [matricnumber, setMatricnumber] = useState('');
	const [password, setPassword] = useState('');
	const [passvisible, setPassvisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [otploading, setOtploading] = useState(false);

	//Input Warnings
	const [fnamew, setFnamew] = useState('');
	const [lnamew, setLnamew] = useState('');
	const [matricw, setMatricw] = useState('');
	const [emailw, setEmailw] = useState('');
	const [passwordw, setPasswordw] = useState('');
	const [processwarning, setProcesswarning] = useState('');
	const [otpwarning, setOtpwarning] = useState('');

	const onPress = () => { 
        inputRef.current?.focus(); 
    }

	const resetwarnings = () => {
		setFnamew(''); setLnamew(''); setMatricw(''); setEmailw(''); setPasswordw('');
	}

	const unsetdetails = () => {
		let fninput = document.getElementById('fninput') as HTMLInputElement;
		let lninput = document.getElementById('lninput') as HTMLInputElement;
		let passinput = document.getElementById('passinput') as HTMLInputElement;
		let pass2input = document.getElementById('pass2input') as HTMLInputElement;
		let matricinput = document.getElementById('matricinput') as HTMLInputElement;
		let emailinput = document.getElementById('emailinput') as HTMLInputElement;


		fninput.value = ''; lninput.value = ''; passinput.value = ''; pass2input.value = '';
		matricinput.value = ''; emailinput.value = '';

		setFirstname(''); setLastname(''); setPassword('');
		setMatricnumber(''); setEmail('');
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

	const signup = () => {
		resetwarnings();
		let error = false;

		//Check first name
		let fnInput = document.getElementById('fninput') as HTMLInputElement;
		let fname = fnInput.value;
		if(fname===""){ error = true; setFnamew(EMPTY_FIELD_ERROR); }

		//Check last name
		let lnInput = document.getElementById('lninput') as HTMLInputElement;
		let lname = lnInput.value;
		if(lname===""){ error = true; setLnamew(EMPTY_FIELD_ERROR); }

		//Check matric number
		let matricInput = document.getElementById('matricinput') as HTMLInputElement;
		let matric = matricInput.value;
		if(matric.length!==10){ error = true; setMatricw(INVALID_MATRIC_ERROR); }
		if(matric===""){ error = true; setMatricw(EMPTY_FIELD_ERROR); }

		//Check email
		let emailInput = document.getElementById('emailinput') as HTMLInputElement;
		let email = emailInput.value;
		if(email.length<17){ error = true; setEmailw(INVALID_EMAIL_ERROR); }
		if(!email.includes('@stu.cu.edu.ng')){ error = true; setEmailw(INVALID_EMAIL_ERROR); }
		if(email===""){ error = true; setEmailw(EMPTY_FIELD_ERROR); }

		
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


		//If no error was recorded proceed to signup
		if(!error){
			setLoading(true);
			setFirstname(fname); setLastname(lname); setEmail(email); setMatricnumber(matric);

			axios.post(URL+'/userdetailsexistencecheck', {email: email, matric: matric}).then(response => {
				if(response.status===200){
					let data = response.data;
					if(data.err){
						setLoading(false); setProcesswarning(PROCESSING_ERROR);
					}else{
						if(data.msg){ //This is means there is a user already registered with that email or matric number
							setLoading(false); setProcesswarning(SIMILAR_USER);
						}else{
							sendotp(email);
						}
					}
				}else{
					setLoading(false); setProcesswarning(PROCESSING_ERROR);
				}
				
			});
		}
	}

	const sendotp = (arg = email) => {
		setOtpwarning(''); setProcesswarning('');

		axios.post(URL+'/sendotp', {email: arg}).then(response => {
			if(response.status === 200){
				let data = response.data;

				if(data.err){
					setProcesswarning(PROCESSING_ERROR); setOtpwarning(PROCESSING_ERROR);
				}else{
					setOtp(data.otp.toString());
					let slider = document.getElementById('createslider') as HTMLDivElement;
                    slider.scrollLeft = window.innerWidth;
					console.log(data.otp);
				}
			}else{
				setProcesswarning(PROCESSING_ERROR); setOtpwarning(PROCESSING_ERROR);
			}

			setLoading(false); setOtploading(false);
		});
	}

	const goback = () => {
		let otpelem = document.getElementById('otpinput') as HTMLInputElement;
		otpelem.value = '';
		unsetdetails(); resetwarnings(); setOtp(''); setOtpinput(''); setOtpwarning('');
		let slider = document.getElementById('createslider') as HTMLDivElement;
        slider.scrollLeft = 0;
	} 

	const finish = () => {
		setOtpwarning('');
		
		if(otpinput === otp){
			setOtploading(true);
			axios.post(URL+'/createaccount', {fname: firstname, lname: lastname, email: email, matric: matricnumber, password: password}).then(response => {
				if(response.status===200){
					let data = response.data;
					if(data.err){
						setOtpwarning(PROCESSING_ERROR); setOtploading(false);
					}else{
						//State store user details in session
						sessionStorage.setItem('shuttlersuser', JSON.stringify(data.user));
						window.location.href = '/user/dashboard';
						setOtploading(false);
					}
				}else{
					setOtpwarning(PROCESSING_ERROR); setOtploading(false);
				}
			});
		}else{	
			setOtpwarning(INVALID_OTP_ERROR);
		}
	}

	return (
		<div className="font-poppins w-full box-border flex flex-col items-center justify-start p-4">
			<Navbar/>
			<div id="createslider" className="w-full box-border mt-24 flex flex-row items-center justify-start overflow-x-hidden scroll-smooth snap-x snap-mandatory">
				<div className="min-w-full max-w-full box-border px-24 snap-center">
					<div className='w-full flex flex-col justify-start items-center'>
						<div className='flex flex-row items-center justify-center px-4 py-1.5 text-2xl font-bold rounded-full' style={{color: PRIMARY800, backgroundColor: PRIMARY300}}>
							Welcome to Shuttlers! 
							<img className="ml-0.5" alt="hand" src="../hand.png"/>
						</div>
						<div className='mt-2 font-bold' style={{color: NEUTRAL500}}>A team commited to ensuring secure travels for students</div>
					</div>
					<div className="w-full box-border mt-8">
						<div className="box-border w-full flex flex-row items-center justify-between">
							<div className='box-border w-[48%] flex flex-col justify-start items-start'>
								<label className='text-lg' style={{color:NEUTRAL700}}>Last Name</label>
								<input id="lninput" type="text" className='box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4] active:outline-none focus:outline-none'/>
								<div className='mt-2 text-sm h-6' style={{color:ERROR700}}>{lnamew}</div>
							</div>
							<div className='box-border w-[48%] flex flex-col justify-start items-start'>
								<label className='text-lg' style={{color:NEUTRAL700}}>First Name</label>
								<input id="fninput" type="text" className='box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4] active:outline-none focus:outline-none'/>
								<div className='mt-2 text-sm h-6' style={{color:ERROR700}}>{fnamew}</div>
							</div>
						</div>

						<div className="mt-7 box-border w-full flex flex-row items-center justify-between">
							<div className='box-border w-[48%] flex flex-col justify-start items-start'>
								<label className='text-lg' style={{color:NEUTRAL700}}>Matric Number</label>
								<input id="matricinput" type="text" className='box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4] active:outline-none focus:outline-none'/>
								<div className='mt-2 text-sm h-6' style={{color:ERROR700}}>{matricw}</div>
							</div>
							<div className='box-border w-[48%] flex flex-col justify-start items-start'>
								<label className='text-lg' style={{color:NEUTRAL700}}>Email</label>
								<input id="emailinput" type="text" className='box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4] active:outline-none focus:outline-none'/>
								<div className='mt-2 text-sm h-6' style={{color:ERROR700}}>{emailw}</div>
							</div>
						</div>

						<div className="mt-7 box-border w-full flex flex-col justify-start items-start">
							<label className='text-lg' style={{color:NEUTRAL700}}>Create Password</label>
							<div className="flex flex-row items-center justify-between box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4]">
								<input id="passinput" type={passvisible?"text":"password"} className='box-border w-full rounded-lg active:outline-none focus:outline-none' onKeyUp={(e)=>{ passwordTracker(e); }}/>
								<img alt="eyeimg" src={passvisible?"../show.png":"../hide.png"} onClick={()=>{ setPassvisible(state => !state); }}/>
							</div>
							<div className='mt-2 w-5/6 flex flex-row items-start justify-start box-border flex-wrap'>
								<div className='w-1/2 flex flex-row justify-start items-center box-border mt-2'>
									<div className='p-0.5' style={{backgroundColor:PRIMARY300}}>
										<img alt="tick1" src="../tick.png" style={{visibility: password!=='' && lowercaseCheck(password) ?'visible':'hidden'}}/>
									</div>
									<div className='ml-2 text-sm font-bold' style={{color: password!=='' && lowercaseCheck(password) ? PRIMARY900 : NEUTRAL500}}>Lowercase characters</div>
								</div>
								<div className='w-1/2 flex flex-row justify-start items-center box-border mt-2'>
									<div className='p-0.5' style={{backgroundColor:PRIMARY300}}>
										<img alt="tick2" src="../tick.png" style={{visibility: password!=='' && password.length>=PASSWORD_LENGTH ?'visible':'hidden'}}/>
									</div>
									<div className='ml-2 text-sm font-bold' style={{color: password!=='' && password.length>=PASSWORD_LENGTH ? PRIMARY900 : NEUTRAL500}}>9 characters minimum</div>
								</div>
								<div className='w-1/2 flex flex-row justify-start items-center box-border mt-2'>
									<div className='p-0.5' style={{backgroundColor:PRIMARY300}}>
										<img alt="tick3" src="../tick.png" style={{visibility: password!=='' && numericCheck(password) ?'visible':'hidden'}}/>
									</div>
									<div className='ml-2 text-sm font-bold' style={{color: password!=='' && numericCheck(password) ? PRIMARY900 : NEUTRAL500}}>Numbers</div>
								</div>
								<div className='w-1/2 flex flex-row justify-start items-center box-border mt-2'>
									<div className='p-0.5' style={{backgroundColor:PRIMARY300}}>
										<img alt="tick4" src="../tick.png" style={{visibility: password!=='' && uppercaseCheck(password) ?'visible':'hidden'}}/>
									</div>
									<div className='ml-2 text-sm font-bold' style={{color: password!=='' && uppercaseCheck(password) ? PRIMARY900 : NEUTRAL500}}>Uppercase characters</div>
								</div>
							</div>
						</div>

						<div className="mt-7 box-border w-full flex flex-col justify-start items-start">
							<label className='text-lg' style={{color:NEUTRAL700}}>Confirm Password</label>
							<div className="flex flex-row items-center justify-between box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4]">
								<input id="pass2input" type={passvisible?"text":"password"} className='box-border w-full rounded-lg active:outline-none focus:outline-none'/>
								<img alt="eyeimg" src={passvisible?"../show.png":"../hide.png"} onClick={()=>{ setPassvisible(state => !state); }}/>
							</div>
							<div className='mt-2 text-sm h-6' style={{color:ERROR700}}>{passwordw}</div>
						</div>

						<button className='flex flex-row items-center justify-center w-full h-12 mt-12 rounded-md text-white text-lg' style={{backgroundColor:PRIMARY700}} onClick={()=>{if(!loading){ signup(); }}}>
							<div style={{display:loading?'none':'flex'}}>Sign up</div>
							<LoadingSpinner
								loading={loading}
								size={'20px'}
								borderColor={'white'}
								borderTopColor={PRIMARY700}
							/>
						</button>
						<div className='w-full text-center text-lg mt-3 h-6' style={{color:ERROR700}}>{processwarning}</div>
					</div>
				</div>
				
				
				<div className='min-w-full max-w-full box-border px-36 flex flex-col items-center justify-start snap-center'>
                    <img className='border-4 p-0.5 rounded-md' alt="mail" src="../mail.png" style={{backgroundColor: LIGHTPURPLE}}/>
                    <div className='w-full text-center mt-8 font-bold text-xl' style={{color:PRIMARY800}}>
                        Email Confirmation
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
                            confirmotp={()=>{ if(!otploading){ finish(); } }}
                            otplen={4}
                        />            

                        <button className='flex flex-row items-center justify-center w-full h-12 mt-12 rounded-md text-white text-lg' style={{backgroundColor:PRIMARY700}} onClick={()=>{ if(!otploading){ finish(); } }}>
							<div style={{display:otploading?'none':'flex'}}>Continue</div>
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

                        <div className='mt-8 flex flex-row items-center justify-center' onClick={()=>{goback();}}>
                            <img alt="back" src="../back.png" className='mr-2'/>
                            Back to Signup
                        </div>
                    </div>
                </div>
			</div>
		</div>
	)
}

export default Signup