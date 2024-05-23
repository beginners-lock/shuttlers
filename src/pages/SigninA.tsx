import { ADMINBG, ADMINGRAY1, ADMINPRIMARY1, ERROR700, SECONDARY500 } from "../theme/colors";
import LoadingSpinner from "../components/Spinner";
import { useState } from "react";
import { EMPTY_FIELD_ERROR, PROCESSING_ERROR } from "../constants/messages";
import axios from "axios";
import { URL } from "../constants/globalvariables";

export default function SigninA(){
    const [passvisible, setPassvisible] = useState(false);
    const [emailwarning, setEmailwarning] = useState('');
    const [passwarning, setPasswarning] = useState('');
    const [processwarning, setProcesswarning] = useState('');
    const [loading, setLoading] = useState(false);

    const login = () => {
        setEmailwarning(''); setPasswarning(''); setProcesswarning('');
        let error = false;
        let emailEl = document.getElementById('emailinput') as HTMLInputElement;
        let passEl = document.getElementById('passinput') as HTMLInputElement;

        if(emailEl.value.trim()===''){
            setEmailwarning(EMPTY_FIELD_ERROR); error=true;
        }

        if(passEl.value.trim()===''){
            setPasswarning(EMPTY_FIELD_ERROR); error=true;
        }

        if(error===false){
            setLoading(true);
            axios.post(URL+'/adminlogin', {email: emailEl.value, pass: passEl.value}).then((response) => {
                if(response.status === 200){
                    let resdata = response.data;
                    if(!resdata.err){
                        if(resdata.user){
                            sessionStorage.setItem('shuttlerssession', JSON.stringify(resdata.user));
                            window.location.href="/admin/dashboard";
                        }else{
                            setLoading(false); setProcesswarning("Invalid credentials");
                        }
                    }else{
                        setLoading(false); setProcesswarning(PROCESSING_ERROR);
                    }
                }else{
                    setLoading(false); setProcesswarning(PROCESSING_ERROR);
                }
            });
        }
    }

    return(
        <div className="w-full h-full flex flex-row justify-center items-center font-poppins" style={{backgroundColor: ADMINBG}}>
            <div className="bg-white w-[400px] h-[500px] rounded-lg px-10 py-8 shadow-lg flex flex-col items-center justify-start">
                <img alt="logo" src="../logoA.png" className="w-10"/>
                <div className="font-semibold text-lg mt-4" style={{color:ADMINPRIMARY1}}>Admin Login</div>
                <div className="font-semibold text-sm mt-0.5" style={{color:ADMINGRAY1}}>Provide your details to login</div>
                <div className="mt-8 w-full flex flex-col items-start justify-start">
                    <label className="text-xs font-semibold">Email</label>
                    <input id="emailinput" className="w-full h-8 mt-1 border-0 border-b-2 border-slate-300 text-sm px-2 active:outline-none focus:outline-none" type="text"/>
                    <div className='mt-1 text-xs' style={{color:ERROR700}}>{emailwarning}</div>
                </div>

                <div className="mt-8 w-full flex flex-col items-start justify-start">
                    <label className="text-xs font-semibold">Password</label>
                    <div className=" border-0 border-b-2 border-slate-300 w-full flex flex-row items-center justify-start mt-1">
                        <input id="passinput" className="w-full h-8 text-sm px-2 active:outline-none focus:outline-none" type={passvisible?"text":"password"} />
                        <img alt="eyeimg" className="cursor-pointer w-5" src={passvisible?"../show.png":"../hide.png"} onClick={()=>{ setPassvisible(state => !state); }}/>
                    </div>
                    <div className='mt-1 text-xs' style={{color:ERROR700}}>{passwarning}</div>
                </div>

                <div className="mt-6 w-full text-right text-xs" style={{color:SECONDARY500}}>Forgot password?</div>

                <div className='mt-6 text-xs' style={{color:ERROR700}}>{processwarning}</div>
                <div className="w-full mt-1 text-white rounded-md py-2 text-sm text-center cursor-pointer flex flex-row items-center justify-center" style={{backgroundColor:ADMINPRIMARY1}} onClick={()=>{ login(); }}>
                    {
                        loading ?
                            <LoadingSpinner
                                loading={loading}
                                size={"20px"}
                                borderColor="white"
                                borderTopColor="transparent"
                            />
                        :   'Login'
                    }
                </div>
            </div>
        </div>
    )
}