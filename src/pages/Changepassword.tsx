import { /*PRIMARY800, */PRIMARY700, NEUTRAL700 } from "../theme/colors";
import Modal from "../components/Modal";
import { CHANGEPASSWORDMODAL } from "../theme/messages";

export default function Changepassword(){
    return(
        <div className="font-poppins w-full box-border flex flex-col items-center justify-start px-4 overflow-hidden">
            <div className="mt-4 w-full flex flex-row items-center justify-between py-4 px-4 text-xl font-bold"  style={{color:PRIMARY700}}>
                <img alt="backimg" src="back.png"/>
                Change Password
                <div></div>
            </div>
            
            <div className="mt-8 w-[450px]">
                <div className="mt-7 box-border w-full flex flex-col justify-start items-start">
                    <label className='text-lg' style={{color:NEUTRAL700}}>Old Password</label>
                    <input type="text" className='box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4] active:outline-none focus:outline-none'/>
                </div>

                <div className="mt-7 box-border w-full flex flex-col justify-start items-start">
                    <label className='text-lg' style={{color:NEUTRAL700}}>New Password</label>
                    <input type="text" className='box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4] active:outline-none focus:outline-none'/>
                </div>

                <div className="mt-7 box-border w-full flex flex-col justify-start items-start">
                    <label className='text-lg' style={{color:NEUTRAL700}}>Confirm Password</label>
                    <input type="text" className='box-border px-2 w-full h-12 mt-2.5 rounded-lg border border-[#C4C4C4] active:outline-none focus:outline-none'/>
                </div>

                <button className='w-full h-12 mt-12 rounded-md text-white text-lg' style={{backgroundColor:PRIMARY700}}>
                    Done
                </button>
            </div>

            <Modal
                modalobj={CHANGEPASSWORDMODAL}
            />
        </div>
    );
}