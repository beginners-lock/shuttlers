import { useState, useEffect } from "react";
import SidebarA from "../components/SidebarA";
import { ADMINTABLETEXTH, ADMINPRIMARY1, SECONDARY500, NEUTRAL600 } from "../theme/colors";
import EmptyATable from "../components/EmptyATable";
import StudentsTable from "../components/StudentsTable";
import DriversTable from "../components/DriversTable";
import EmissionsTable from "../components/EmissionsTable";
import { firebaseConfig } from '../firebaseconfig';
import { initializeApp } from 'firebase/app';
import { ref, getDatabase/*, update, push*/, onValue } from 'firebase/database';

export default function Admin(){
    initializeApp(firebaseConfig);
	/*const db = getDatabase();

    const ridesRef = ref(db, '/rides');
	const driversRef = ref(db, '/drivers');
    const usersRef = ref(db, '/users');*/

    const [activetable, setActivetable] = useState('drivers');
    const [students, setStudents] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [rides, setRides] = useState([]);
    const [studentskeys, setStudentskeys] = useState<string[]>([]);
    const [driverskeys, setDriverskeys] = useState<string[]>([]);
    const [rideskeys, setRideskeys] = useState<string[]>([]);
    
    const emissions: any[] = [];
    const emisssionskeys: any[] = [];
    /*const [emissions, setEmissions] = useState([]);
    const [emisssionskeys, setEmissionskeys] = useState([]);*/

    useEffect(() => {
        let session = sessionStorage.getItem('shuttlerssession');
        
        if(session===null || session==='null' || session===undefined || session==='undefined'){
            sessionStorage.removeItem('shuttlerssession');
            window.location.href = '/admin/signin';
        }

        const db = getDatabase();

        const ridesRef = ref(db, '/rides');
        const driversRef = ref(db, '/drivers');
        const usersRef = ref(db, '/users');

        const ridesSub = onValue(ridesRef, (snapshot)=>{
            let rides: any = snapshot.val();
            setRides(Object.values(rides));
            setRideskeys(Object.keys(rides));
        });

        const driversSub = onValue(driversRef, (snapshot)=>{
            let drivers: any = snapshot.val();
            setDrivers(Object.values(drivers));
            setDriverskeys(Object.keys(drivers));
        });

        const usersSub = onValue(usersRef, (snapshot)=>{
            let users: any = snapshot.val();
            setStudents(Object.values(users));
            setStudentskeys(Object.keys(users));
        });


        return ()=>{ ridesSub(); driversSub(); usersSub(); }
    }, []);

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
                        <div className="font-bold text-2xl" style={{color:ADMINPRIMARY1}}>{rideskeys.length}</div>
                    </div>

                    <div className="w-[220px] h-[120px] rounded-md px-5 py-7 flex flex-col items-start justify-between" style={{backgroundColor:'#EFEAFF'}}>
                        <div className="w-full flex flex-row items-center justify-between">
                            <div className="text-xs font-semibold" style={{color:ADMINPRIMARY1}}>No of Drivers</div>
                            <img alt="car" src="../premiumcar.png"/>
                        </div>
                        <div className="font-bold text-2xl" style={{color:ADMINPRIMARY1}}>{driverskeys.length}</div>
                    </div>

                    <div className="w-[220px] h-[120px] rounded-md px-5 py-7 flex flex-col items-start justify-between" style={{backgroundColor:'#EFEAFF'}}>
                        <div className="w-full flex flex-row items-center justify-between">
                            <div className="text-xs font-semibold" style={{color:ADMINPRIMARY1}}>No of Students</div>
                            <img alt="car" src="../premiumcar.png"/>
                        </div>
                        <div className="font-bold text-2xl" style={{color:ADMINPRIMARY1}}>{studentskeys.length}</div>
                    </div>

                    <div className="w-[220px] h-[120px] rounded-md px-5 py-7 flex flex-col items-start justify-between" style={{backgroundColor:'#EFEAFF'}}>
                        <div className="w-full flex flex-row items-center justify-between">
                            <div className="text-xs font-semibold" style={{color:ADMINPRIMARY1}}>Booked Rides</div>
                            <img alt="car" src="../premiumcar.png"/>
                        </div>
                        <div className="font-bold text-2xl" style={{color:ADMINPRIMARY1}}>{ rides.filter((ride:any)=>{ return(!ride.arrival); }).length }</div>
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

                        <div className="text-xs cursor-pointer" style={{color:SECONDARY500}} onClick={()=>{ window.location.href="/admin/userstable"; }}>View All</div>
                    </div>
                    
                    <div className="w-full h-[100%] mt-2 flex flex-row items-center justify-center">
                        {
                            activetable==='students'?
                                students.length>0?
                                    <StudentsTable
                                        keys={studentskeys.reverse()}
                                        students={students.reverse()}
                                    />
                                :   <EmptyATable table="students"/>
                            :   drivers.length>0?
                                    <DriversTable
                                        keys={driverskeys.reverse()}
                                        drivers={drivers.reverse()}
                                    />
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

                        <div className="text-xs cursor-pointer" style={{color:SECONDARY500}}onClick={()=>{ window.location.href="/admin/emissionstable"; }}>View All</div>
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
    )
}