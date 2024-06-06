import SidebarA from "../components/SidebarA";
/*import { useState, useEffect } from "react";*/
import EmissionsTable from "../components/EmissionsTable";
import EmptyATable from "../components/EmptyATable";
/*import { firebaseConfig } from '../firebaseconfig';
import { initializeApp } from 'firebase/app';
import { ref, getDatabase, update, push, onValue } from 'firebase/database';*/
import { ADMINTABLETEXTH/*, SECONDARY500, NEUTRAL600*/ } from "../theme/colors";

export default function AdminEmissionTable(){
    const emissions: any[] = [];
    const emisssionskeys: any[] = [];
    /*const [emissions, setEmissions] = useState([]);
    const [emisssionskeys, setEmissionskeys] = useState([]);*/

    return(
        <div className="w-full h-full flex flex-row items-center justify-between">
            <SidebarA/>
            <div className="w-[1100px] px-8 pt-10 pb-8 h-full flex flex-col items-start justify-start">
                <div className="mt-6 w-full h-[30%] flex flex-col items-start justify-start">
                    <div className="w-full flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center justify-start">
                            <div className="w-1.5 h-5 rounded-full " style={{backgroundImage:'linear-gradient(#002060, #8E44AD)'}}></div>
                            <div className="text-sm font-semibold ml-2" style={{color:ADMINTABLETEXTH}}>Carbon Emissions Data</div>
                        </div>
                    </div>
                    
                    <div className="w-full h-[100%] mt-2 flex flex-row items-center justify-center">
                        {
                            emissions.length>0?
                                <EmissionsTable
                                    keys={emisssionskeys.reverse()}
                                    data={emissions.reverse()}
                                />
                            :   <EmptyATable table="emissions"/>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    );
}