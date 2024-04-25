import { NEUTRAL500, SECONDARY500, SECONDARY800 } from "../theme/colors";

export default function SignupD(){
    return(
        <div className="w-full pb-10">
            <div className="w-full h-full hidden flex-col items-center justify-start pt-6 px-4 font-poppins">
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
                    <label className="font-semibold">Full Name</label>
                    <input className="mt-2 border border-slate-400 rounded-md h-10 w-full"/>
                </div>

                <div className="w-full mt-8 flex flex-col items-start justify-start">
                    <label>Email</label>
                    <input className="mt-2 border border-slate-400 rounded-md h-10 w-full"/>
                </div>

                <div className="w-full mt-8 flex flex-col items-start justify-start">
                    <label>Phone Number</label>
                    <input className="mt-2 border border-slate-400 rounded-md h-10 w-full"/>
                </div>

                <div className="w-full mt-8 flex flex-col items-start justify-start">
                    <label>Password</label>
                    <input className="mt-2 border border-slate-400 rounded-md h-10 w-full"/>
                </div>

                <button className="mt-8 w-full rounded-full text-white py-2 flex flex-row items-center justify-center" style={{backgroundColor:SECONDARY800}}>
                    Continue
                </button>

                <div className="mt-4 flex flex-row font-semibold" style={{color: NEUTRAL500}}>
                    Already have an account? 
                    <div className="ml-2" style={{color: SECONDARY500}}>Login</div>
                </div>

                <div className="w-full mt-8 font-semibold text-center" style={{color: NEUTRAL500}}>
                    By sigining up, you agree to our
                    <div className="ml-2 inline" style={{color: SECONDARY500}}>Terms and Conditions</div> and
                    <div className="ml-2 inline" style={{color: SECONDARY500}}>Privacy Policy</div>
                </div>
            </div>

            
            <div className="w-full h-full flex flex-col items-center justify-start pt-6 px-4 font-poppins">
                <img alt="logo" className="w-8" src="../logoD.png"/>
                <div className="w-full mt-4">
                    <img alt="goback" src="../gobackD.png"/>
                </div>

                <div className="w-[190px] text-xl font-semibold text-center" style={{color: SECONDARY800}}>Enter code</div>
                
                <div className="mt-2 w-[270px] text-sm text-center" style={{color: NEUTRAL500}}>A code has been sent to +23480123456789</div>

                <input className="mt-10 h-16 border border-slate-500 rounded-lg"/>

                <button className="mt-10 w-full rounded-full text-white py-2 flex flex-row items-center justify-center" style={{backgroundColor:SECONDARY800}}>
                    Continue
                </button>

                <div className="mt-4 font-semibold" style={{color: SECONDARY500}}>Login</div>
            </div>

            
            <div className="w-full h-full hidden flex-col items-center justify-start pt-6 px-4 font-poppins">
                <img alt="logo" className="w-8" src="../logoD.png"/>
                <div className="w-full mt-4">
                    <img alt="goback" src="../gobackD.png"/>
                </div>

                <div className="w-[190px] text-xl font-semibold text-center" style={{color: SECONDARY800}}>Car Details</div>
                
                <div className="mt-2 w-[270px] text-sm text-center" style={{color: NEUTRAL500}}>Enter the accurate details as regards your vehicle</div>

                <div className="w-full mt-8 flex flex-col items-start justify-start">
                    <label>Car Type</label>
                    <select className="mt-2 border border-slate-400 rounded-md h-10 w-full">
                        
                    </select>
                </div>

                <div className="w-full mt-8 flex flex-col items-start justify-start">
                    <label>Car Category</label>
                    <select className="mt-2 border border-slate-400 rounded-md h-10 w-full">
                        
                    </select>
                </div>

                <div className="w-full mt-8 flex flex-col items-start justify-start">
                    <label>Car Number</label>
                    <input className="mt-2 border border-slate-400 rounded-md h-10 w-full"/>
                </div>

                <button className="mt-8 w-full rounded-full text-white py-2 flex flex-row items-center justify-center" style={{backgroundColor:SECONDARY800}}>
                    Submit
                </button>
            </div>
        </div>
    );
}