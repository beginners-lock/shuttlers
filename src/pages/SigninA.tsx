import { ADMINBG, ADMINGRAY1, ADMINPRIMARY1, SECONDARY500 } from "../theme/colors"
import { useState } from "react";

export default function SigninA(){
    const [passvisible, setPassvisible] = useState(false);

    return(
        <div className="w-full h-full flex flex-row justify-center items-center font-poppins" style={{backgroundColor: ADMINBG}}>
            <div className="bg-white w-[400px] h-[500px] rounded-lg px-10 py-8 shadow-lg flex flex-col items-center justify-start">
                <img alt="logo" src="../logoA.png" className="w-10"/>
                <div className="font-semibold text-lg mt-4" style={{color:ADMINPRIMARY1}}>Admin Login</div>
                <div className="font-semibold text-sm mt-0.5" style={{color:ADMINGRAY1}}>Provide your details to login</div>
                <div className="mt-8 w-full flex flex-col items-start justify-start">
                    <label className="text-xs font-semibold">Email</label>
                    <input className="w-full h-8 mt-1 border-0 border-b-2 border-slate-300 text-sm px-2 active:outline-none focus:outline-none" type="text"/>
                </div>

                <div className="mt-8 w-full flex flex-col items-start justify-start">
                    <label className="text-xs font-semibold">Password</label>
                    <div className=" border-0 border-b-2 border-slate-300 w-full flex flex-row items-center justify-start mt-1">
                        <input className="w-full h-8 text-sm px-2 active:outline-none focus:outline-none" type={passvisible?"text":"password"} />
                        <img alt="eyeimg" className="cursor-pointer w-5" src={passvisible?"../show.png":"../hide.png"} onClick={()=>{ setPassvisible(state => !state); }}/>
                    </div>
                </div>

                <div className="mt-8 w-full text-right text-xs" style={{color:SECONDARY500}}>Forgot password?</div>
                <div className="w-full mt-8 text-white rounded-md py-2 text-sm text-center cursor-pointer" style={{backgroundColor:ADMINPRIMARY1}}>Login</div>
            </div>
        </div>
    )
}