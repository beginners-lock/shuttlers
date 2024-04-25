import { NEUTRAL500, SECONDARY500, SECONDARY800 } from "../theme/colors";

export default function SigninD(){
    return(
        <div className="w-full h-full flex flex-col items-center justify-start pt-6 px-4 font-poppins">
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
                <input className="mt-2 border border-slate-400 rounded-md h-10 w-full"/>
            </div>

            <div className="w-full mt-8 flex flex-col items-start justify-start">
                <label>Password</label>
                <input className="mt-2 border border-slate-400 rounded-md h-10 w-full"/>
            </div>

            <div className="w-full flex flex-row justify-between items-center mt-4 font-semibold">
                <div style={{color:'#94A3B8'}}>
                    <input type="checkbox" className="mr-2"/>
                    Remember Credentials
                </div>
                <div style={{color: SECONDARY500}}>Forgot password</div>
            </div>

            <button className="mt-8 w-full rounded-full text-white py-2 font-semibold flex flex-row items-center justify-center" style={{backgroundColor:SECONDARY800}}>
                Login
            </button>

            <div className="mt-4 flex flex-row font-semibold" style={{color: NEUTRAL500}}>
                Don't have an account? 
                <div className="ml-2" style={{color: SECONDARY500}}>Sign Up</div>
            </div>
        </div>
    );
}