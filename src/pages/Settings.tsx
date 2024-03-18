import { ERROR700, NEUTRAL600, NEUTRAL700, NEUTRAL800, PRIMARY700, PRIMARY900 } from "../theme/colors";
import Modal from "../components/Modal";
import { LOGOUTMODAL } from "../theme/messages";

export default function Settings(){
    return(
        <div className="font-poppins w-full box-border flex flex-col items-center justify-start px-4 overflow-hidden">
            <div className="mt-4 w-full flex flex-row items-center justify-between py-4 px-4 text-xl font-bold"  style={{color:PRIMARY700}}>
                <img alt="backimg" src="back.png"/>
                Profile Settings
                <div></div>
            </div>

            <div className="w-full px-4 box-border mt-2 flex flex-row items-start justify-between">
                <div className="w-[23%]"></div>
                <div className="w-[54%] flex flex-col items-center justify-start">
                    <img alt="profileimg" src="profilepic.png"/>
                    <div className="mt-4 font-semibold" style={{color:PRIMARY900}}>Daniel Osakwe</div>
                    <div className="mt-0.5 font-semibold" style={{color:NEUTRAL700}}>19CJ025802</div>
                    <div className="mt-0.5 font-semibold" style={{color:NEUTRAL700}}>Computer Engineering</div>
                    <div className="mt-0.5 font-semibold" style={{color:NEUTRAL700}}>daniel.osakwe@stu.cu.edu.ng</div>
                </div>
                <div className="w-[23%] flex justify-end">
                    <div className="rounded-full w-36 py-2 px-3 border flex flex-row items-center justify-center" style={{color: NEUTRAL600, borderColor: NEUTRAL600}}>
                        Edit Profile
                        <img className="ml-2" alt="epimg" src="editprofile.png"/>
                    </div>
                </div>
            </div>

            <div className="w-full mt-10 p-4 box-border text-lg">
                <div className="font-semibold" style={{color: NEUTRAL800}}>Favourite Locations</div>
                <div className="flex flex-row items-center justify-start mt-4 py-4">
                    <img className="mr-3.5" alt="suitcaseimg" src="suitcase.png"/>
                    Add Departmental Building
                </div>

                <div className="flex flex-row items-center justify-start mt-4 py-4">
                    <img className="mr-3.5" alt="building" src="building.png"/>
                    Add Hostel
                </div>
            </div>

            <div className="w-full mt-10 p-4 box-border text-lg">
                <div className="w-full flex flex-row items-center justify-between box-border py-5">
                    Language
                    <div className="flex flex-row box-border items-center justify-end">
                        English-US
                        <img className="ml-4" alt="nextimg" src="next.png"/>
                    </div>
                </div>
                <div className="w-full flex flex-row items-center justify-between box-border py-5">
                    Change Password
                    <div><img alt="nextimg" src="next.png"/></div>
                </div>
                <div className="w-full flex flex-row items-center justify-between box-border py-5">
                    Privacy Policy & Terms
                    <div><img alt="nextimg" src="next.png"/></div>
                </div>
            </div>

            <div className="w-full mt-10 p-4 box-border text-lg font-semibold" style={{color:ERROR700}}>
                <div className="w-full flex flex-row items-center justify-start box-border py-5">
                    <img className="mr-3" alt="logout" src="logout.png"/>
                    Log Out
                </div>

                <div className="w-full flex flex-row items-center justify-start box-border py-5">
                    <img className="mr-3" alt="delete" src="deleteaccount.png"/>
                    Delete Account
                </div>
            </div>
            
            <Modal
                modalobj={LOGOUTMODAL}
            />
        </div>
    );
}