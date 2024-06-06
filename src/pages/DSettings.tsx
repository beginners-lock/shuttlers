import { useState, useEffect } from "react";
import setfavicon from '../constants/setfavicon';
import { ERROR700, NEUTRAL600, NEUTRAL700, SECONDARY900 } from "../theme/colors";
import Modal from "../components/Modal";
import { LOGOUTMODAL } from "../constants/modalvariables";
//import { DriverType } from "../constants/types";
import DNavbar from "../components/DNavbar";

export default function DSettings(){
    const [showmodal, setShowmodal] = useState(false);
    //const [driver, setDriver] = useState<DriverType|null>(null);

    useEffect(()=>{
        let session = sessionStorage.getItem('shuttlerssession');

		if(session && session!=='undefined' && session!==undefined && session!=='null' && session!==null){
			let driver = JSON.parse(session);
            if(driver.type==='driver'){
                //setDriver(driver);
            }else{
                sessionStorage.clear();
			    window.location.href = '/';
            }
		}else{
			window.location.href = '/';
		}

        setfavicon({ type:'driver' });
    }, []);

    return(
        <div className="font-poppins w-full h-full box-border flex flex-col items-center justify-start px-2 pb-16 overflow-y-auto">
            <div className="w-full h-auto pb-20">
            <div className="mt-4 w-full flex flex-row items-center justify-between py-4 px-4 font-bold"  style={{color:SECONDARY900}}>
                <img alt="backimg" src="../back.png" onClick={()=>{ window.location.href = '/user'; }}/>
                Profile Settings
                <div></div>
            </div>

            <div className="w-full px-4 box-border mt-2 flex flex-col items-center justify-start">
                <div className="w-[23%]"></div>
                <div className="w-[54%] flex flex-col items-center justify-start">
                    <img alt="profileimg" src="../profilepic.png"/>
                    <div className="mt-4 font-semibold text-sm" style={{color:SECONDARY900}}>Daniel Osakwe</div>
                    <div className="mt-0.5 font-semibold text-sm" style={{color:NEUTRAL700}}>Car 06</div>
                </div>
                <div className="w-[140px] mt-2 flex justify-end">
                    <div className="rounded-full text-sm w-full py-2 px-3 border flex flex-row items-center justify-center" style={{color: NEUTRAL600, borderColor: NEUTRAL600}}>
                        Edit Profile
                        <img className="ml-2" alt="epimg" src="../editprofile.png"/>
                    </div>
                </div>
            </div>

            <div className="w-full mt-6 p-4 box-border text-lg">
                <div className="flex flex-row items-center justify-start mt-3 py-2 text-sm">
                    <img className="mr-3 w-5" alt="suitcaseimg" src="../suitcase.png"/>
                    Wallet
                </div>

                <div className="flex flex-row items-center justify-start mt-3 py-2 text-sm">
                    <img className="mr-3 w-5" alt="building" src="../building.png"/>
                    Messages
                </div>

                <div className="flex flex-row items-center justify-start mt-3 py-2 text-sm">
                    <img className="mr-3 w-5" alt="building" src="../building.png"/>
                    Account info
                </div>
            </div>

            <div className="w-full mt-6 p-4 box-border text-lg">
                <div className="w-full flex flex-row items-center justify-between box-border py-4 text-sm">
                    Language
                    <div className="flex flex-row box-border items-center justify-end">
                        English-US
                        <img className="ml-4" alt="nextimg" src="../next.png"/>
                    </div>
                </div>
                <div className="w-full flex flex-row items-center justify-between box-border py-4 text-sm">
                    Change Password
                    <div><img alt="nextimg" src="../next.png"/></div>
                </div>
                <div className="w-full flex flex-row items-center justify-between box-border py-4 text-sm">
                    Privacy Policy & Terms
                    <div><img alt="nextimg" src="../next.png"/></div>
                </div>
            </div>

            <div className="w-full mt-6 p-4 box-border text-lg font-semibold text-sm" style={{color:ERROR700}}>
                <div className="w-full flex flex-row items-center justify-start box-border py-4" onClick={()=>{ setShowmodal(true); }}>
                    <img className="mr-3 w-5" alt="logout" src="../logout.png"/>
                    Log Out
                </div>

                <div className="w-full flex flex-row items-center justify-start box-border py-4">
                    <img className="mr-3 w-5" alt="delete" src="../deleteaccount.png"/>
                    Delete Account
                </div>
            </div>
            </div>
            
            <Modal
                showmodal={showmodal}
                modalobj={LOGOUTMODAL}
                hidemodal={()=>{ setShowmodal(false); }}
            />

            <DNavbar/>
        </div>
    );
}