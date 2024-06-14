import { ADMINTABLETEXTH, NEUTRAL500 } from "../theme/colors";

type StudentsTableProps = {
    keys: string[],
    students: any[],
    deleteuser: (id:string)=>void
}

export default function StudentsTable({keys, students, deleteuser}: StudentsTableProps){
    return(
        <div className="w-full h-[100%]">
            <div className="border-0 border-t-[1px] border-b-[1px] w-full flex flex-row items-center justify-start mb-1" style={{borderColor:ADMINTABLETEXTH, color:ADMINTABLETEXTH}}>
                <div className="px-1.5 py-0.5 text-sm w-[11%] font-semibold text-left">Date of Reg.</div>
                <div className="px-1.5 py-0.5 text-sm w-[19%] font-semibold text-center">Name</div>
                <div className="px-1.5 py-0.5 text-sm w-[14%] font-semibold text-center">Booked Rides</div>
                <div className="px-1.5 py-0.5 text-sm w-[15%] font-semibold text-center">Matric Number</div>
                <div className="px-1.5 py-0.5 text-sm w-[16%] font-semibold text-center">Course</div>
                <div className="px-1.5 py-0.5 text-sm w-[17%] font-semibold text-center">Student Mail</div>
                <div className="px-1.5 py-0.5 text-sm w-[8%] font-semibold text-center"></div>
            </div>

            {
                students.map((student, index) => {
                    return(
                        <div key={keys[index]} className="w-full flex flex-row items-center justify-start" style={{color:NEUTRAL500}}>
                            <div className="px-1.5 py-1.5 text-sm w-[11%] text-left">{student.regdate.split(' ')[1]}</div>
                            <div className="px-1.5 py-1.5 text-sm w-[19%] text-center">{student.firstname+' '+student.lastname}</div>
                            <div className="px-1.5 py-1.5 text-sm w-[14%] text-center">{student?.rides ? Object.keys(student.rides).length : 0}</div>
                            <div className="px-1.5 py-1.5 text-sm w-[15%] text-center">{student.matricnumber}</div>
                            <div className="px-1.5 py-1.5 text-sm w-[16%] text-center">{student.course.length>20?student.course.slice(0, 17)+'...':student.course}</div>
                            <div className="px-1.5 py-1.5 text-sm w-[17%] text-center">{student.email.length>20?student.email.slice(0, 17)+'...':student.email}</div>
                            <div className="px-1.5 py-1.5 text-sm w-[8%] text-red-700 font-semibold text-center cursor-pointer" onClick={()=>{ deleteuser(keys[index]); }}>Delete</div>
                        </div>
                    )
                })
            }
        </div>
    )
}