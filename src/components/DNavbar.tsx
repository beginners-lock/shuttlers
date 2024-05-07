import { useState } from 'react';
import { SECONDARY900 } from "../theme/colors";

export default function DNavbar(){
    const [activetab, setActivetab] = useState('home')

    return(
        <div className="flex flex-row justify-between items-center fixed bottom-4 w-[300px] h-12 rounded-full px-4 py-2 box-border" style={{backgroundColor: SECONDARY900}}>
            <div className="rounded-full flex flex-row items-center justify-start px-2 py-1.5" style={{backgroundColor:activetab==='home'?'#FFFFFF4D':'transparent'}}>
                <img alt="homeicon" src="../homeiconnavbar.png"/>
                <div className=" text-sm ml-2 text-white" style={{display:activetab==='home'?'flex':'none'}}>Home</div>
            </div>

            <div className="rounded-full flex flex-row items-center justify-start px-2 py-1.5" style={{backgroundColor:activetab==='trips'?'#FFFFFF4D':'transparent'}}>
                <img alt="tripsicon" src="../tripsiconnavbar.png"/>
                <div className=" text-sm ml-2 text-white" style={{display:activetab==='trips'?'flex':'none'}}>Trips</div>
            </div>

            <div className="rounded-full flex flex-row items-center justify-start px-2 py-1.5" style={{backgroundColor:activetab==='profile'?'#FFFFFF4D':'transparent'}}>
                <img alt="profileicon" src="../profileiconnavbar.png"/>
                <div className=" text-sm ml-2 text-white" style={{display:activetab==='profile'?'flex':'none'}}>Profile</div>
            </div>
        </div>
    );
}