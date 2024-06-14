import { useState, useEffect } from "react";
import SidebarA from "../components/SidebarA";
import { /*SECONDARY500,*/ ADMINTABLETEXTH, NEUTRAL600 } from "../theme/colors";
import StudentsTable from "../components/StudentsTable";
import DriversTable from "../components/DriversTable";
import EmptyATable from "../components/EmptyATable";
import AdminModal from "../components/AdminModal";
import { firebaseConfig } from '../firebaseconfig';
import { initializeApp } from 'firebase/app';
import { ref, getDatabase, /*update, push,*/ onValue, remove } from 'firebase/database';

export default function AdminUsersTable(){
    initializeApp(firebaseConfig);
	const db = getDatabase();

	/*const driversRef = ref(db, '/drivers');
    const usersRef = ref(db, '/users');*/

    const [activetable, setActivetable] = useState('drivers');
    const [students, setStudents] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [studentskeys, setStudentskeys] = useState<string[]>([]);
    const [driverskeys, setDriverskeys] = useState<string[]>([]);
    const [activeid, setActiveid] = useState('');
    const [activeusertype, setActiveusertype] = useState('');
    const [showmodal, setShowmodal] = useState(false);

    useEffect(() => {
        let session = sessionStorage.getItem('shuttlerssession');
        
        if(session===null || session==='null' || session===undefined || session==='undefined'){
            sessionStorage.removeItem('shuttlerssession');
            window.location.href = '/admin/signin';
        }

        const db = getDatabase();

        const driversRef = ref(db, '/drivers');
        const usersRef = ref(db, '/users');

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

        console.log('effect');
        return ()=>{ driversSub(); usersSub(); }
    }, []);

    const deletefunc = (arg: string, usertype: string, id: string) => {
        if(arg==='deleteproceed'){
            const customref = ref(db, `/${usertype}s/`+id);
            remove(customref).then(()=>{
                setShowmodal(false);
                setActiveid(''); setActiveusertype('');
            });  
        }

        if(arg==='deletecancel'){
            setShowmodal(false);
            setActiveid(''); setActiveusertype(''); 
        }
    }

    const deleteuser = (id: string) => {
        setShowmodal(true);
        setActiveid(id); setActiveusertype('user'); 
    }

    const deletedriver = (id: string) => {
        setShowmodal(true);
        setActiveid(id); setActiveusertype('driver'); 
    }

    return(
        <div className="w-full h-full flex flex-row items-center justify-between">
            <AdminModal
                visible={showmodal}
                person={activeusertype}
                btnclick={(arg, usertype, id)=>{ deletefunc(arg, usertype, id); }}
                id={activeid}
            />
            <SidebarA/>
            <div className="w-[80%]  pl-4 pr-8 pt-10 pb-8 h-full flex flex-col items-start justify-start">
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
                    </div>
                    
                    <div className="w-full h-[100%] mt-2 flex flex-row items-center justify-center">
                        {
                            activetable==='students'?
                                students.length>0?
                                    <StudentsTable
                                        keys={studentskeys.reverse()}
                                        students={students.reverse()}
                                        deleteuser={(id)=>{ deleteuser(id); }}
                                    />
                                :   <EmptyATable table="students"/>
                            :   drivers.length>0?
                                    <DriversTable
                                        keys={driverskeys.reverse()}
                                        drivers={drivers.reverse()}
                                        deletedriver={(id)=>{ deletedriver(id); }}
                                    />
                                :   <EmptyATable table="drivers"/>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    );
}