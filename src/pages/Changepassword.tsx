import { useState } from "react";
import { ERROR700, PRIMARY700, NEUTRAL700, PRIMARY900, PRIMARY300, NEUTRAL500 } from "../theme/colors";
import Modal from "../components/Modal";
import { CHANGEPASSWORDMODAL } from "../constants/modalvariables";
import { PASSWORD_LENGTH, URL } from "../constants/globalvariables";
import { UNSIMILAR_PASSWORDS, PASSWORD_REQ_ERROR, EMPTY_FIELD_ERROR, PROCESSING_ERROR, INVALID_PASSWORD } from "../constants/messages";
import LoadingSpinner from "../components/Spinner";
import axios from "axios";

export default function Changepassword(){
    const [showmodal, setShowmodal] = useState(false);
    const [oldpass, setOldpass] = useState('');
    const [password, setPassword] = useState('');
    const [pass2, setPass2] = useState('');
    const [oldpassw, setOldpassw] = useState('');
    const [pass2w, setPass2w] = useState('');
    const [passvisible, setPassvisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [processw, setProcessw] = useState('');

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
        setProcessw(''); setOldpassw(''); setPass2w('');
        let error = false;

        //Check password
		let oldpassInput = document.getElementById('oldpassinput') as HTMLInputElement;
		let oldpass = oldpassInput.value;

        if(oldpass===''){
            setOldpassw(EMPTY_FIELD_ERROR); error=true;
        }
        
        let pass2Input = document.getElementById('pass2input') as HTMLInputElement;
		let pass2 = pass2Input.value;
		if(password!=='' && uppercaseCheck(password) && lowercaseCheck(password) && password.length>=PASSWORD_LENGTH && numericCheck(password)){
			if(password!==pass2){
				setPass2w(UNSIMILAR_PASSWORDS); error = true;
			}
		}else{
			setPass2w(PASSWORD_REQ_ERROR); error=true;
		}

        let session = sessionStorage.getItem('shuttlersuser');
        let user = {}

        if(session){
            user = JSON.parse(session);
        }else{
            error=true; window.location.href = '/signin';
        }

        if(!error){
            setLoading(true);
            axios.post(URL+'/checkandchangepassword', {user: user, oldpass:oldpass, newpass:password}).then(response => {
                if(response.status === 200){
                    let data = response.data;

                    if(data.err){
                        setProcessw(PROCESSING_ERROR);
                    }else{
                        if(data.msg === 'success'){
                            setShowmodal(true);
                        }else{
                            console.log(data.msg)
                            setOldpassw(INVALID_PASSWORD);
                        }
                    }
                }else{
                    setProcessw(PROCESSING_ERROR);
                }

                setLoading(false);
            });
        }
    }

    return(
        <div className="font-poppins w-full box-border flex flex-col items-center justify-start px-4 overflow-hidden">
            <div className="mt-4 w-full flex flex-row items-center justify-between py-4 px-4 text-xl font-bold"  style={{color:PRIMARY700}}>
                <img alt="backimg" src="back.png" onClick={()=>{ window.location.href="/user"; }}/>
                Change Password
                <div></div>
            </div>
            
            <div className="mt-8 w-[450px]">
                <div className="mt-7 box-border w-full flex flex-col justify-start items-start">
                    <label className='text-lg' style={{color:NEUTRAL700}}>Old Password</label>
                    <div className="flex flex-row items-center justify-between box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4]">  
                        <input id="oldpassinput" type={passvisible?"text":"password"} className='box-border w-full rounded-lg active:outline-none focus:outline-none'/>
                        <img alt="eyeimg" src={passvisible?"show.png":"hide.png"} onClick={()=>{ setPassvisible(state => !state); }}/>
                    </div>
                    <div className='mt-2 text-sm h-6' style={{color:ERROR700}}>{oldpassw}</div>
                </div>

                <div className="mt-7 box-border w-full flex flex-col justify-start items-start">
                    <label className='text-lg' style={{color:NEUTRAL700}}>New Password</label>
                    <div className="flex flex-row items-center justify-between box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4]">  
                        <input id="pass1input" type={passvisible?"text":"password"} className='box-border w-full rounded-lg active:outline-none focus:outline-none' onKeyUp={(e)=>{ passwordTracker(e); }}/>
                        <img alt="eyeimg" src={passvisible?"show.png":"hide.png"} onClick={()=>{ setPassvisible(state => !state); }}/>
                    </div>
                    <div className='mt-2 w-[420px] flex flex-row items-start justify-start box-border flex-wrap'>
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
                    <label className='text-lg' style={{color:NEUTRAL700}}>Confirm Password</label>
                    <div className="flex flex-row items-center justify-between box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4]">  
                        <input id="pass2input" type={passvisible?"text":"password"} className='box-border w-full rounded-lg active:outline-none focus:outline-none'/>
                        <img alt="eyeimg" src={passvisible?"show.png":"hide.png"} onClick={()=>{ setPassvisible(state => !state); }}/>
                    </div>
                    <div className='mt-2 text-sm h-6' style={{color:ERROR700}}>{pass2w}</div>
                </div>

                <button className='flex flex-row items-center justify-center w-full h-12 mt-12 rounded-md text-white text-lg' style={{backgroundColor:PRIMARY700}} onClick={()=>{ if(!loading){ resetpassword(); } }}>
                    <div style={{display:loading?'none':'flex'}}>Reset Password</div>
                    <LoadingSpinner
                        loading={loading}
                        size={'20px'}
                        borderColor={'white'}
                        borderTopColor={PRIMARY700}
                    />
                </button>
                <div className='w-full text-centr mt-2 text-sm h-6' style={{color:ERROR700}}>{processw}</div>
            </div>

            <Modal
                showmodal={showmodal}
                modalobj={CHANGEPASSWORDMODAL}
            />
        </div>
    );
}