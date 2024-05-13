import setfavicon from "../constants/setfavicon";
import { NEUTRAL500, SECONDARY500, SECONDARY800 } from "../theme/colors";
import { useEffect, useState, useRef } from "react";
import { DriverDataType } from "../constants/types";
import { DRIVER_PASSWORD_ERROR, EMPTY_FIELD_ERROR, INVALID_EMAIL_ERROR, INVALID_FULLNAME, INVALID_OTP_ERROR, INVALID_PHONE_ERROR, PROCESSING_ERROR, SIMILAR_DRIVER } from "../constants/messages";
import axios from "axios";
import LoadingSpinner from "../components/Spinner";
import SplitInput from "../components/SplitInput";
import { URL } from "../constants/globalvariables";
import { firebaseConfig } from '../firebaseconfig';
import { initializeApp } from "firebase/app";
import { ref, getDatabase, update } from "firebase/database";


export default function SignupD(){
    useEffect(()=>{
        setfavicon({ type:"driver" });
    }, []);

    
    let inputRef = useRef<HTMLInputElement>(null);
    const [driverdata, setDriverdata] = useState<DriverDataType|null>(null);
    const [otp, setOtp] = useState('');
    const [otpinput, setOtpinput] = useState<string>('');
    const [email, setEmail] = useState('');
    
    const [fnwarning, setFnwarning] = useState('');
    const [pwarning, setPwarning] = useState('');
    const [ewarning, setEwarning] = useState('');
    const [pwwarning, setPwwarning] = useState('');
    const [ctwarning, setCtwarning] = useState('');
    const [cnwarning, setCnwarning] = useState('');
    const [processwarning1, setProcesswarning1] = useState('');
    const [processwarning2, setProcesswarning2] = useState('');
    const [otpwarning, setOtpwarning] = useState('');

    const [passvisible, setPassvisible] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [otploading, setOtploading] = useState(false);

    const onPress = () => { 
        inputRef.current?.focus(); 
    }

    const next = (pg: number) => {
        let el = document.getElementById("signupdscrollpane") as HTMLDivElement;
        el.scrollTop = 0;
        el.scrollLeft = window.innerWidth * pg;
        console.log('next');
    }

    const clearwarnings = () => {
        setFnwarning(''); setPwarning(''); setEwarning(''); setPwwarning(''); setProcesswarning1('');
    }

    const firstpagebtnclick = () => {
        let error = false;
        clearwarnings();
        let fnel = document.getElementById('driverfullname') as HTMLInputElement;
        let eel = document.getElementById('driveremail') as HTMLInputElement;
        let pel = document.getElementById('driverphone') as HTMLInputElement;
        let pwel = document.getElementById('driverpassword') as HTMLInputElement;
        
        
        if( fnel.value.indexOf(' ')===-1 || !fnel.value.indexOf(' ') ){
            setFnwarning(INVALID_FULLNAME);
            error = true;
        }

        if( eel.value.indexOf('@')===-1 || !eel.value.indexOf('@') ){
            setEwarning(INVALID_EMAIL_ERROR); 
            error = true;  
        }

        if(pel.value.length<11){
            setPwarning(INVALID_PHONE_ERROR);
            error = true;
        }

        if(pwel.value.length<8){
            setPwwarning(DRIVER_PASSWORD_ERROR);
            error = true;
        }

        if(!fnel.value || !eel.value || !pel.value || !pwel.value){
            if(!fnel.value){
                setFnwarning(EMPTY_FIELD_ERROR);
            }

            if(!eel.value){
                setEwarning(EMPTY_FIELD_ERROR);
            }

            if(!pel.value){
                setPwarning(EMPTY_FIELD_ERROR);
            }

            if(!pwel.value){
                setPwwarning(EMPTY_FIELD_ERROR);
            }
            
            error = true;
        }

        if(!error){
            let data = {
                fullname: fnel.value,
                email: eel.value,
                phone: pel.value,
                password: pwel.value,
                cartype: '',
                carnumber: ''
            }   

            setDriverdata(data);
            setLoading1(true);
            axios.post(URL+'/driverdetailsexistencecheck', {email: eel.value}).then((response) => {
                if(response.status===200){
                    let data = response.data;

                    if(data.err){
                        setProcesswarning1(PROCESSING_ERROR); setLoading1(false);
                    }else{
                        if(data.msg){//Then there is a similar email
                            setProcesswarning1(SIMILAR_DRIVER); setLoading1(false);
                        }else{
                            sendotp(eel.value); setEmail(eel.value);
                        }
                    }
                }else{
                    setProcesswarning1(PROCESSING_ERROR); setLoading1(false);
                }
            })
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
            console.log('got');
            next(2);
        }else{
            setOtpwarning(INVALID_OTP_ERROR);
        }
    }

    const goback = (page: number) => {
        let el = document.getElementById("signupdscrollpane") as HTMLDivElement;
        el.scrollTop = 0;
        el.scrollLeft = window.innerWidth*page;
        console.log('next');
    }

    const submitClick = () => {
        let error = false;
        setCnwarning(''); setCtwarning(''); setProcesswarning2('');

        let ctel = document.getElementById('drivercartype') as HTMLSelectElement;
        let cnel = document.getElementById('drivercarnumber') as HTMLInputElement;

        if(!ctel.value){
            setCtwarning(EMPTY_FIELD_ERROR); error=true;
        }

        if(!cnel.value){
            setCnwarning(EMPTY_FIELD_ERROR); error=true;
        }

        if(!error){
            let data = { ...driverdata };
            data.cartype = ctel.value;
            data.carnumber = cnel.value;
            console.log(data);

            setLoading2(true);
            axios.post(URL+'/createdriveraccount',  data).then(response => {
                if(response.status===200){
                    let resdata = response.data;
                    
                    if(!resdata.err){
                        //Add the driers branch to the firebase real-time database
                        initializeApp(firebaseConfig);
                        const db = getDatabase();
                        const driverRef = ref(db, 'drivers/'+resdata.driver.id);

                        update(driverRef, {
                            wallet: 0,
                            rides: []
                        }).then(()=>{
                            sessionStorage.setItem('shuttlerssession', JSON.stringify(resdata.driver));
                            window.location.href = '/driver/dashboard?id='+resdata.driver.id;
                            setLoading2(false);
                        });
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
        <div id="signupdscrollpane" className="w-full h-full pb-10 flex flex-row justify-start items-start overflow-x-hidden scroll-smooth">
            <div className="min-w-full max-w-full min-h-full max-h-full flex flex-col items-center justify-start pt-6 px-4 font-poppins">
                <img alt="logo" className="w-8" src="../logoD.png"/>
                <div className="mt-8 w-full flex flex-col items-start justify-start">
                    <div className="w-[190px] text-xl font-semibold" style={{color: SECONDARY800}}>
                        Become a Certified Driver 🚗 
                    </div>
                    <div className="mt-2 w-[300px] text-sm" style={{color: NEUTRAL500}}>
                        A team committed to ensuring secure travels for students
                    </div>
                </div>
                
                <div className="w-full mt-4 flex flex-col items-start justify-start">
                    <label>Full Name</label>
                    <input type="text" id="driverfullname" className="px-2 mt-2 border border-slate-400 rounded-md h-10 w-full"/>
                    <div className="text-red-700 text-xs mt-1">{fnwarning}</div>
                </div>

                <div className="w-full mt-8 flex flex-col items-start justify-start">
                    <label>Email</label>
                    <input type="email" id="driveremail" className="px-2 mt-2 border border-slate-400 rounded-md h-10 w-full"/>
                    <div className="text-red-700 text-xs mt-1">{ewarning}</div>
                </div>

                <div className="w-full mt-8 flex flex-col items-start justify-start">
                    <label>Phone Number</label>
                    <input type="phone" id="driverphone" className="px-2 mt-2 border border-slate-400 rounded-md h-10 w-full"/>
                    <div className="text-red-700 text-xs mt-1">{pwarning}</div>
                </div>

                <div className="w-full mt-8 flex flex-col items-start justify-start">
                    <label>Password</label>
                    <div className="flex flex-row items-center justify-between box-border px-2 w-full h-11 mt-2 rounded-lg border border-slate-400">
                        <input id="driverpassword" type={passvisible?'text':'password'} className="rounded-md h-10 w-[100%] focus:outline-none active:outline-none"/>
                        <img alt="eye" src={passvisible?"../show.png":"../hide.png"} onClick={()=>{setPassvisible((state)=>{ return !state; })}}/>
                    </div>
                    <div className="text-red-700 text-xs mt-1">{pwwarning}</div>
                </div>

                <button className="mt-8 w-full rounded-full text-white py-2 flex flex-row items-center justify-center" style={{backgroundColor:SECONDARY800}} onClick={()=>{ if(!loading1){ firstpagebtnclick(); } }}> 
                    {
                        loading1?
                            <LoadingSpinner
                                loading={loading1}
                                size={'20px'}
                                borderTopColor="transparent"
                                borderColor="white"
                            />
                        :   'Continue'
                    }
                </button>
                <div className="text-center w-full text-red-700 text-xs mt-1">{processwarning1}</div>

                <div className="mt-4 flex flex-row font-semibold" style={{color: NEUTRAL500}}>
                    Already have an account? 
                    <div className="ml-2" style={{color: SECONDARY500}} onClick={()=>{ window.location.href="/driver/signin"; }}>Login</div>
                </div>

                <div className="w-full mt-8 font-semibold text-center" style={{color: NEUTRAL500}}>
                    By sigining up, you agree to our
                    <div className="ml-2 inline" style={{color: SECONDARY500}}>Terms and Conditions</div> and
                    <div className="ml-2 inline" style={{color: SECONDARY500}}>Privacy Policy</div>
                </div>

                <div className="box-border min-h-28 max-h-28 border-transparent border"></div>
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