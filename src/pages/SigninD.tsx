import setfavicon from "../constants/setfavicon";
import { NEUTRAL500, SECONDARY500, SECONDARY800 } from "../theme/colors";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import LoadingSpinner from "../components/Spinner";
import { EMPTY_FIELD_ERROR, INVALID_EMAIL_ERROR, INVALID_PASSWORD, PROCESSING_ERROR, INVALID_OTP_ERROR, UNSIMILAR_PASSWORDS, DRIVER_PASSWORD_ERROR } from "../constants/messages";
import { URL } from "../constants/globalvariables";
import SplitInput from "../components/SplitInput";

export default function SigninD(){
    useEffect(()=>{
        setfavicon({ type:"driver" });
    }, []);

    let inputRef = useRef<HTMLInputElement>(null);
    const [otp, setOtp] = useState('');
    const [otpinput, setOtpinput] = useState('');
    const [email, setEmail] = useState('');

    const [passvisible1, setPassvisible1] = useState(false);
    const [passvisible2, setPassvisible2] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [otploading, setOtploading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const [processwarning1, setProcesswarning1] = useState('');
    const [processwarning2, setProcesswarning2] = useState('');
    const [emailwarning, setEmailwarning] = useState('');
    const [passwarning, setPasswarning] = useState('');
    const [otpwarning, setOtpwarning] = useState('');
    const [npwarning, setNpwarning] = useState('');
    const [cpwarning, setCpwarning] = useState('')

    const clearwarnings = () => {
        setProcesswarning1(''); setEmailwarning(''); setPasswarning('');
    }

    const clearcpwarnings = () => {
        setNpwarning(''); setCpwarning(''); setProcesswarning2('');
    }

    const onPress = () => { 
        inputRef.current?.focus(); 
    }

    const next = (pg: number) => {
        let el = document.getElementById("signindscrollpane") as HTMLDivElement;
        el.scrollTop = 0;
        el.scrollLeft = window.innerWidth * pg;
    }

    const goback = (page: number) => {
        let el = document.getElementById("signindscrollpane") as HTMLDivElement;
        el.scrollTop = 0;
        el.scrollLeft = window.innerWidth*page;
    }

    const loginbtnclick = () => {
        clearwarnings();
        let error = false;
        let emailel = document.getElementById('driveremailinput') as HTMLInputElement;
        let passwel = document.getElementById('driverpasswinput') as HTMLInputElement;

        //Checks
        if(emailel.value.indexOf('@')===-1 || !emailel.value.indexOf('@')){
            setEmailwarning(INVALID_EMAIL_ERROR); error=true;
        }   

        if(!emailel.value){
            setEmailwarning(EMPTY_FIELD_ERROR); error=true;
        }

        if(!passwel.value){
            setPasswarning(EMPTY_FIELD_ERROR); error=true;
        }

        if(!error){
            let data = {
                email: emailel.value,
                password: passwel.value
            };

            setLoading1(true);
            axios.post(URL+'/driverlogin', data).then(async (response)=> {
                if(response.status===200){
                    let resdata = response.data;

                    if(!resdata.err){
                        if(resdata.correct){
                            sessionStorage.setItem('shuttlerssession', JSON.stringify(resdata.driver));
                            window.location.href = '/driver/dashboard?id='+resdata.driver.id;
                            setLoading1(false);
                        }else{
                            setProcesswarning1(INVALID_PASSWORD); setLoading1(false);
                        }
                    }else{
                        console.log(resdata);
                        if(resdata.message){
                            setProcesswarning1(resdata.message);
                        }else{
                            setProcesswarning1(PROCESSING_ERROR);
                        }
                        setLoading1(false);
                    }
                }else{
                    setProcesswarning1(PROCESSING_ERROR); setLoading1(false);
                }
            });
        }
    }

    const forgotscroll = () => {
        clearwarnings();
        let error = false;

        let emailel = document.getElementById('driveremailinput') as HTMLInputElement;

        //Checks
        if(emailel.value.indexOf('@')===-1 || !emailel.value.indexOf('@')){
            setEmailwarning(INVALID_EMAIL_ERROR); error=true;
        }  
        
        if(!emailel.value){
            setEmailwarning(EMPTY_FIELD_ERROR); error=true;
        }

        if(!error){
            setLoading1(true);
            setEmail(emailel.value);
            sendotp(emailel.value);
        }
    }

    const sendotp = (email: string) => {
        setLoading1(true); setOtploading(true); setProcesswarning1(''); setOtpwarning('');

        axios.post(URL+'/sendotp', { email: email}).then(response => {
            if(response.status === 200){
				let data = response.data;

				if(data.err){
					setProcesswarning1(PROCESSING_ERROR); setOtpwarning(PROCESSING_ERROR);
				}else{
					setOtp(data.otp.toString()); console.log(data.otp.toString());
					next(1);
				}
			}else{
				setProcesswarning1(PROCESSING_ERROR); setOtpwarning(PROCESSING_ERROR);
			}

			setLoading1(false); setOtploading(false);
        });
    }

    const finishotp = () => {
        setOtpwarning('');
        if(otp === otpinput){
            next(2);
        }else{
            setOtpwarning(INVALID_OTP_ERROR);
        }
    }

    const changepassword = () => {
        clearcpwarnings();
        let err = false;

        const newpass = document.getElementById('drivernewpassw') as HTMLInputElement;
        const confirmpass = document.getElementById('driverconfirmpassw') as HTMLInputElement;

        if(confirmpass.value !== newpass.value){
            setNpwarning(UNSIMILAR_PASSWORDS); setCpwarning(UNSIMILAR_PASSWORDS); err=true;
        }

        if(newpass.value.length<8){
            setNpwarning(DRIVER_PASSWORD_ERROR); err=true;
        }

        if(confirmpass.value.length<8){
            setCpwarning(DRIVER_PASSWORD_ERROR); err=true;
        }

        if(!newpass.value){
            setNpwarning(EMPTY_FIELD_ERROR); err=true;
        }

        if(!confirmpass.value){
            setCpwarning(EMPTY_FIELD_ERROR); err=true;
        }

        if(!err){
            let data = {
                email: email,
                password: newpass.value
            }
            setLoading2(true);
            axios.post(URL+'/changedriverpassword', data ).then(async response => {
                
                if(response.status===200){
                    let resdata = response.data;
                    if(!resdata.err){
                        sessionStorage.setItem('shuttlerssession', JSON.stringify(resdata.driver));
                        window.location.href = '/driver/dashboard?id='+resdata.driver.id;
                        setLoading2(false);
                    }else{
                        setProcesswarning2(PROCESSING_ERROR); setLoading2(false);
                    }
                }else{
                    setProcesswarning2(PROCESSING_ERROR); setLoading2(false);
                }
            });
        }

    }

    return(
        <div id="signindscrollpane" className="w-full h-full pb-10 flex flex-row justify-start items-start overflow-x-hidden scroll-smooth">
            <div className="min-w-full max-w-full min-h-full max-h-full flex flex-col items-center justify-start pt-6 px-4 font-poppins">
                <img alt="logo" className="w-8" src="../logoD.png"/>
                <div className="mt-8 w-full flex flex-col items-start justify-start">
                    <div className="w-[190px] text-xl font-semibold" style={{color: SECONDARY800}}>
                        Become a Certified Driver 🚗 
                    </div>
                    <div className="mt-2 w-[300px] text-sm font-semibold" style={{color: NEUTRAL500}}>
                        A team committed to ensuring secure travels for students
                    </div>
                </div>
                
                <div className="w-full mt-4 flex flex-col items-start justify-start">
                    <label>Email</label>
                    <input id="driveremailinput" className="mt-2 border border-slate-400 rounded-md h-10 w-full px-2"/>
                    <div className='mt-2 text-xs h-6 text-red-700'>{emailwarning}</div>
                </div>

                <div className="w-full mt-6 flex flex-col items-start justify-start">
                    <label>Password</label>
                    <div className="flex flex-row items-center justify-between box-border px-2 w-full h-11 mt-2 rounded-lg border border-slate-400">
                        <input id="driverpasswinput" type={passvisible1?'text':'password'} className="rounded-md h-10 w-[100%] focus:outline-none active:outline-none"/>
                        <img alt="eye" src={passvisible1?"../show.png":"../hide.png"} onClick={()=>{setPassvisible1((state)=>{ return !state; })}}/>
                    </div>
                    <div className='mt-2 text-xs h-6 text-red-700'>{passwarning}</div>
                </div>

                <div className="w-full flex flex-row justify-between items-center mt-4 font-semibold">
                    <div style={{color:'#94A3B8'}}>
                        <input type="checkbox" className="mr-2"/>
                        Remember Credentials
                    </div>
                    <div style={{color: SECONDARY500}} onClick={()=>{ forgotscroll(); }}>Forgot password</div>
                </div>

                <button className="mt-8 w-full rounded-full text-white py-2 font-semibold flex flex-row items-center justify-center" style={{backgroundColor:SECONDARY800}} onClick={()=>{ loginbtnclick(); }}>
                    {
                        !loading1?
                            'Login'
                        :
                            <LoadingSpinner
                                loading={loading1}
                                size={'20px'}
                                borderColor={'white'}
                                borderTopColor={'transparent'}
                            />
                    }
                </button>
                <div className='w-full text-center text-xs mt-3 h-6 text-red-700'>{processwarning1}</div>

                <div className="mt-4 flex flex-row font-semibold" style={{color: NEUTRAL500}}>
                    Don't have an account? 
                    <div className="ml-2 cursor-pointer" style={{color: SECONDARY500}} onClick={()=>{ window.location.href="/driver/signup"; }}>Sign Up</div>
                </div>
            </div>
            <div className="min-w-full max-w-full h-full flex flex-col items-center justify-start pt-6 px-4 font-poppins">
                <img alt="logo" className="w-8" src="../logoD.png"/>
                <div className="w-full mt-4" onClick={()=>{ goback(0); }}>
                    <img alt="goback" src="../gobackD.png"/>
                </div>

                <div className="w-[190px] text-xl font-semibold text-center" style={{color: SECONDARY800}}>Enter code</div>
                
                <div className="mt-2 w-[270px] text-sm text-center" style={{color: NEUTRAL500}}>{'A code has been sent to '+email}</div>

                <SplitInput
                    inputRef={inputRef}
                    otp={otpinput}
                    onPress={onPress}
                    setOtp={setOtpinput}
                    confirmotp={()=>{ if(!otploading){ finishotp(); } }}
                    otplen={4}
                /> 

                <button className="mt-10 w-full rounded-full text-white py-2 flex flex-row items-center justify-center" style={{backgroundColor:SECONDARY800}} onClick={()=>{ if(!otploading){ finishotp(); } }}>
                    {
                        otploading?
                            <LoadingSpinner
                                loading={otploading}
                                size={'20px'}
                                borderTopColor="transparent"
                                borderColor="white"
                            />
                        :   'Continue'
                    }
                </button>
                <div className="text-center w-full text-red-700 text-xs mt-1">{otpwarning}</div>

                <button className="mt-6 w-full rounded-full text-white py-2 flex flex-row items-center justify-center" style={{backgroundColor:SECONDARY800}} onClick={()=>{ if(email){ sendotp(email); } }}>
                    Resend
                </button>

                <div className="mt-4 font-semibold" style={{color: SECONDARY500}} onClick={()=>{ window.location.href="/driver/signin"; }}>Login</div>
            </div>

            
            <div className="relative min-w-full max-w-full h-full flex flex-col items-center justify-start pt-6 px-4 font-poppins">
                <img alt="logo" className="w-8" src="../logoD.png"/>
                <div className="w-full mt-4">
                    <img alt="goback" src="../gobackD.png" onClick={()=>{ goback(1); }}/>
                </div>

                <div className="w-[190px] text-xl font-semibold text-center" style={{color: SECONDARY800}}>Change Password</div>

                <div className="w-full mt-8 flex flex-col items-start justify-start">
                    <label>New password</label>
                    <div className="flex flex-row items-center justify-between box-border px-2 w-full h-11 mt-2 rounded-lg border border-slate-400">
                        <input id="drivernewpassw" type={passvisible2?'text':'password'} className="rounded-md h-10 w-[100%] focus:outline-none active:outline-none"/>
                        <img alt="eye" src={passvisible2?"../show.png":"../hide.png"} onClick={()=>{setPassvisible2((state)=>{ return !state; })}}/>
                    </div>
                    <div className="text-red-700 text-xs mt-1">{npwarning}</div>
                </div>

                <div className="w-full mt-8 flex flex-col items-start justify-start">
                    <label>Confirm Password</label>
                    <div className="flex flex-row items-center justify-between box-border px-2 w-full h-11 mt-2 rounded-lg border border-slate-400">
                        <input id="driverconfirmpassw" type={passvisible2?'text':'password'} className="rounded-md h-10 w-[100%] focus:outline-none active:outline-none"/>
                        <img alt="eye" src={passvisible2?"../show.png":"../hide.png"} onClick={()=>{setPassvisible2((state)=>{ return !state; })}}/>
                    </div>
                    <div className="text-red-700 text-xs mt-1">{cpwarning}</div>
                </div>

                <button className="mt-14 w-full rounded-full text-white py-2 flex flex-row items-center justify-center" style={{backgroundColor:SECONDARY800}} onClick={()=>{ if(!loading2){ changepassword(); } }}>
                    {
                        loading2?
                            <LoadingSpinner
                                loading={loading2}
                                size={'20px'}
                                borderTopColor="transparent"
                                borderColor="white"
                            />
                        :   'Change password'
                    }
                </button>
                <div className="text-center w-full text-red-700 text-xs mt-1">{processwarning2}</div>
            </div>
        </div>
    );
}