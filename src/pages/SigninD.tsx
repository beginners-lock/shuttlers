import setfavicon from "../constants/setfavicon";
import { NEUTRAL500, SECONDARY500, SECONDARY800 } from "../theme/colors";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import LoadingSpinner from "../components/Spinner";
import { EMPTY_FIELD_ERROR, INVALID_EMAIL_ERROR, INVALID_PASSWORD, PROCESSING_ERROR } from "../constants/messages";
import { URL } from "../constants/globalvariables";
import SplitInput from "../components/SplitInput";

export default function SigninD(){
    useEffect(()=>{
        setfavicon({ type:"driver" });
    }, []);

    let inputRef = useRef<HTMLInputElement>(null);
    const [passvisible, setPassvisible] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [processingwarning1, setProcesswarning1] = useState('');
    const [emailwarning, setEmailwarning] = useState('');
    const [passwarning, setPasswarning] = useState('');

    const clearwarnings = () => {
        setProcesswarning1(''); setEmailwarning(''); setPasswarning('');
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
                        <input id="driverpasswinput" type={passvisible?'text':'password'} className="rounded-md h-10 w-[100%] focus:outline-none active:outline-none"/>
                        <img alt="eye" src={passvisible?"../show.png":"../hide.png"} onClick={()=>{setPassvisible((state)=>{ return !state; })}}/>
                    </div>
                    <div className='mt-2 text-xs h-6 text-red-700'>{passwarning}</div>
                </div>

                <div className="w-full flex flex-row justify-between items-center mt-4 font-semibold">
                    <div style={{color:'#94A3B8'}}>
                        <input type="checkbox" className="mr-2"/>
                        Remember Credentials
                    </div>
                    <div style={{color: SECONDARY500}}>Forgot password</div>
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
                <div className='w-full text-center text-xs mt-3 h-6 text-red-700'>{processingwarning1}</div>

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

            
            <div className="min-w-full max-w-full h-full flex flex-col items-center justify-start pt-6 px-4 font-poppins">
                <img alt="logo" className="w-8" src="../logoD.png"/>
                <div className="w-full mt-4">
                    <img alt="goback" src="../gobackD.png" onClick={()=>{ goback(1); }}/>
                </div>

                <div className="w-[190px] text-xl font-semibold text-center" style={{color: SECONDARY800}}>Car Details</div>
                
                <div className="mt-2 w-[270px] text-sm text-center" style={{color: NEUTRAL500}}>Enter the accurate details as regards your vehicle</div>

                <div className="w-full mt-8 flex flex-col items-start justify-start">
                    <label>Car Type</label>
                    <select id="drivercartype" className="mt-2 border border-slate-400 rounded-md h-10 w-full text-sm px-2" onChange={(e)=>{ console.log(e.target.value); }}>
                        <option className="text-xs" value={''}>Select your car type</option>
                        <option className="text-xs"  value={'sedan'}>Sedan</option>
                        <option className="text-xs"  value={'sienna'}>Sienna</option>
                    </select>
                    <div className="text-red-700 text-xs mt-1">{ctwarning}</div>
                </div>

                <div className="w-full mt-8 flex flex-col items-start justify-start">
                    <label>Car Category</label>
                    <select className="mt-2 border border-slate-400 rounded-md h-10 w-full text-sm px-2" defaultValue={''}>
                        <option className="text-xs" value={''}>Select your car category</option>
                    </select>
                </div>

                <div className="w-full mt-8 flex flex-col items-start justify-start">
                    <label>Car Number</label>
                    <input id="drivercarnumber" type="text" className="mt-2 px-2 border border-slate-400 rounded-md h-10 w-full"/>
                    <div className="text-red-700 text-xs mt-1">{cnwarning}</div>
                </div>

                <button className="mt-8 w-full rounded-full text-white py-2 flex flex-row items-center justify-center" style={{backgroundColor:SECONDARY800}} onClick={()=>{ if(!loading2){ submitClick(); } }}>
                    {
                        loading2?
                            <LoadingSpinner
                                loading={loading2}
                                size={'20px'}
                                borderTopColor="transparent"
                                borderColor="white"
                            />
                        :   'Submit'
                    }
                </button>
                <div className="text-center w-full text-red-700 text-xs mt-1">{processwarning2}</div>
            </div>
        </div>
    );
}