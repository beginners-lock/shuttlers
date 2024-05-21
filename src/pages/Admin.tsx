import { useState } from "react";
import SidebarA from "../components/SidebarA";
import { ADMINTABLETEXTH, ADMINPRIMARY1, SECONDARY500, NEUTRAL600 } from "../theme/colors";
import EmptyATable from "../components/EmptyATable";
import StudentsTable from "../components/StudentsTable";
import DriversTable from "../components/DriversTable";
import EmissionsTable from "../components/EmissionsTable";

export default function Admin(){
    const [activetable, setActivetable] = useState('drivers');
    const [students, setStudents] = useState([0]);
    const [drivers, setDrivers] = useState([0]);
    const [emissions, setEmissions] = useState([0]);


    return(
        <div className="w-full h-full flex flex-row items-center justify-between">
            <SidebarA/>
            <div className="w-[1100px] px-8 pt-10 pb-8 h-full flex flex-col items-start justify-start">
                <div className="text-xl font-semibold" style={{color:ADMINPRIMARY1}}>Welcome, Admin!</div>
                
                <div className="mt-6 w-full flex flex-row items-center justify-between">
                    <div className="w-[220px] h-[120px] rounded-md px-5 py-7 flex flex-col items-start justify-between" style={{backgroundColor:'#EFEAFF'}}>
                        <div className="w-full flex flex-row items-center justify-between">
                            <div className="text-xs font-semibold" style={{color:ADMINPRIMARY1}}>No of Rides</div>
                            <img alt="car" src="../premiumcar.png"/>
                        </div>
                        <div className="font-bold text-2xl" style={{color:ADMINPRIMARY1}}>0</div>
                    </div>

                    <div className="w-[220px] h-[120px] rounded-md px-5 py-7 flex flex-col items-start justify-between" style={{backgroundColor:'#EFEAFF'}}>
                        <div className="w-full flex flex-row items-center justify-between">
                            <div className="text-xs font-semibold" style={{color:ADMINPRIMARY1}}>No of Drivers</div>
                            <img alt="car" src="../premiumcar.png"/>
                        </div>
                        <div className="font-bold text-2xl" style={{color:ADMINPRIMARY1}}>0</div>
                    </div>

                    <div className="w-[220px] h-[120px] rounded-md px-5 py-7 flex flex-col items-start justify-between" style={{backgroundColor:'#EFEAFF'}}>
                        <div className="w-full flex flex-row items-center justify-between">
                            <div className="text-xs font-semibold" style={{color:ADMINPRIMARY1}}>No of Students</div>
                            <img alt="car" src="../premiumcar.png"/>
                        </div>
                        <div className="font-bold text-2xl" style={{color:ADMINPRIMARY1}}>0</div>
                    </div>

                    <div className="w-[220px] h-[120px] rounded-md px-5 py-7 flex flex-col items-start justify-between" style={{backgroundColor:'#EFEAFF'}}>
                        <div className="w-full flex flex-row items-center justify-between">
                            <div className="text-xs font-semibold" style={{color:ADMINPRIMARY1}}>Booked Rides</div>
                            <img alt="car" src="../premiumcar.png"/>
                        </div>
                        <div className="font-bold text-2xl" style={{color:ADMINPRIMARY1}}>0</div>
                    </div>
                </div>

                <div className="mt-6 w-full h-[30%] flex flex-col items-start justify-start">
                    <div className="w-full flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center justify-start">
                            <div className="w-1.5 h-6 rounded-full " style={{backgroundImage:'linear-gradient(#002060, #8E44AD)'}}></div>
                            <div className="cursor-pointer border-0 border-b-[1px] pb-1 text-sm font-semibold ml-2" style={{color:activetable==='drivers'?ADMINTABLETEXTH:NEUTRAL600, borderColor:activetable==='drivers'?ADMINTABLETEXTH:'transparent'}} onClick={()=>{ setActivetable('drivers'); }}>
                                Drivers Table
                            </div>
                            <div className="cursor-pointer border-0 border-b-[1px] pb-1 text-sm font-semibold ml-8" style={{color:activetable==='students'?ADMINTABLETEXTH:NEUTRAL600, borderColor:activetable==='students'?ADMINTABLETEXTH:'transparent'}} onClick={()=>{ setActivetable('students'); }}>
                                Students Table
                            </div>
                        </div>

                        <div className="text-xs cursor-pointer" style={{color:SECONDARY500}}>View All</div>
                    </div>
                    
                    <div className="w-full h-[100%] mt-2 flex flex-row items-center justify-center">
                        {
                            activetable==='students'?
                                students.length>0?
                                    <StudentsTable/>
                                :   <EmptyATable table="students"/>
                            :   drivers.length>0?
                                    <DriversTable/>
                                :   <EmptyATable table="drivers"/>
                        }
                        
                    </div>
                </div>

                <div className="mt-6 w-full h-[30%] flex flex-col items-start justify-start">
                    <div className="w-full flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center justify-start">
                            <div className="w-1.5 h-5 rounded-full " style={{backgroundImage:'linear-gradient(#002060, #8E44AD)'}}></div>
                            <div className="text-sm font-semibold ml-2" style={{color:ADMINTABLETEXTH}}>Carbon Emissions Data</div>
                        </div>

                        <div className="text-xs cursor-pointer" style={{color:SECONDARY500}}>View All</div>
                    </div>
                    
                    <div className="w-full h-[100%] mt-2 flex flex-row items-center justify-center">
                        {
                            emissions.length>0?
                                <EmissionsTable/>
                            :   <EmptyATable table="emissions"/>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}