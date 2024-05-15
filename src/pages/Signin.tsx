import { useState } from 'react';
import Navbar from '../components/Navbar';
import { PRIMARY800, PRIMARY300, NEUTRAL500, NEUTRAL700, PRIMARY700, SECONDARY500, ERROR700 } from '../theme/colors';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/Spinner';
import { EMPTY_FIELD_ERROR, INVALID_EMAIL_ERROR, INVALID_PASSWORD, NO_EMAIL_EXISTS, PROCESSING_ERROR } from '../constants/messages';
import axios from 'axios';
import { URL } from '../constants/globalvariables';

const Signin = () => {
	const [loading, setLoading] = useState(false);
	const [passvisible, setPassvisible] = useState(false);
	const [emailw, setEmailw] = useState('');
	const [passw, setPassw] = useState('');
	const [processwarning, setProcesswarning] = useState('');

	const resetwarnings = () => {
		setEmailw(''); setPassw(''); setProcesswarning('');
	}

	const login = () => {
		let error = false;
		resetwarnings();
		let emailinput = document.getElementById('emailinput') as HTMLInputElement;
		let email = emailinput.value;

		let passinput = document.getElementById('passinput') as HTMLInputElement;
		let password = passinput.value;

		if(!email.includes('@stu.cu.edu.ng') || email.length<17){ setEmailw(INVALID_EMAIL_ERROR); error=true; }
		if(email===''){ setEmailw(EMPTY_FIELD_ERROR); error=true; }
		if(password===''){ setPassw(EMPTY_FIELD_ERROR); error=true; }


		if(!error){
			setLoading(true);
			axios.post(URL+'/userlogin', {email: email, password: password}).then(response => {
				if(response.status === 200){
					let data = response.data;
					if(data.err){
						setLoading(false); setProcesswarning(PROCESSING_ERROR);
					}else{
						if(data.msg==='no email'){
							setLoading(false); setProcesswarning(NO_EMAIL_EXISTS);
						}

						if(data.msg==='invalid password'){
							setLoading(false); setProcesswarning(INVALID_PASSWORD);
						}

						if(data.msg==='success'){
							sessionStorage.setItem('shuttlerssession', JSON.stringify(data.user));
							window.location.href = '/user/dashboard?id='+data.user.id;
							setLoading(false);
						}
					}
				}else{
					setLoading(false); setProcesswarning(PROCESSING_ERROR);
				}
			});
		}
	}

	return (
		<div className="font-poppins w-full box-border flex flex-col items-center justify-start p-4">
			<Navbar/>
			<div className="w-full box-border mt-24 px-24">
				<div className='w-full flex flex-col justify-start items-center'>
					<div className='flex flex-row items-center justify-center px-4 py-1.5 text-2xl font-bold rounded-full' style={{color: PRIMARY800, backgroundColor: PRIMARY300}}>
						Sign in to Shuttlers!
					</div>
					<div className='mt-2 font-bold' style={{color: NEUTRAL500}}>A team commited to ensuring secure travels for students</div>
				</div>
				<div className="w-full box-border mt-8">
					<div className="mt-7 box-border w-full flex flex-col justify-start items-start">
						<label className='text-lg' style={{color:NEUTRAL700}}>Username or Email</label>
						<input id="emailinput" type="text" className='box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4] active:outline-none focus:outline-none'/>
						<div className='mt-2 text-sm h-6' style={{color:ERROR700}}>{emailw}</div>
					</div>
					<div className="mt-7 box-border w-full flex flex-col justify-start items-start">
						<label className='text-lg' style={{color:NEUTRAL700}}>Password</label>
						<div className="flex flex-row items-center justify-between box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4]">
							<input id="passinput" type={passvisible?"text":"password"} className='box-border w-full rounded-lg active:outline-none focus:outline-none'/>
							<img alt="eyeimg" src={passvisible?"../show.png":"../hide.png"} onClick={()=>{ setPassvisible(state => !state); }}/>
						</div>
						<div className='mt-2 text-sm h-6' style={{color:ERROR700}}>{passw}</div>
					</div>
					<div className='mt-4 w-full flex flex-row items-center justify-between'>
						<div className='' style={{color:'#94A3B8'}}>
							<input type="checkbox" className='mr-2'/>
							Remember credentials
						</div>
						<Link to="/user/forgotpassword" className='font-bold' style={{color:SECONDARY500}}>Forgot your password?</Link>
					</div>
					<button className='flex flex-row items-center justify-center w-full h-12 mt-12 rounded-md text-white text-lg' style={{backgroundColor:PRIMARY700}} onClick={()=>{ if(!loading){ login(); } }}>
							<div style={{display:loading?'none':'flex'}}>Login</div>
							<LoadingSpinner
								loading={loading}
								size={'20px'}
								borderColor={'white'}
								borderTopColor={PRIMARY700}
							/>
					</button>
					<div className='w-full text-center mt-2 text-md h-6' style={{color:ERROR700}}>{processwarning}</div>
					<div className='mt-4 flex flex-row items-center justify-center text-md'>
						Don't have an account
						<Link to="/user/signup" className="ml-1 font-bold cursor-pointer" style={{color: SECONDARY500}}>Sign up</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Signin