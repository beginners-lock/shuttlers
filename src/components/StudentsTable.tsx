import { ADMINTABLETEXTH, NEUTRAL500, SECONDARY800 } from "../theme/colors";

export default function StudentsTable(){
    return(
        <div className="w-full h-[100%]">
            <div className="border-0 border-t-[1px] border-b-[1px] w-full flex flex-row items-center justify-start mb-1" style={{borderColor:ADMINTABLETEXTH, color:ADMINTABLETEXTH}}>
                <div className="px-1.5 py-0.5 text-sm w-[12%] font-semibold text-left">Date of Reg.</div>
                <div className="px-1.5 py-0.5 text-sm w-[18%] font-semibold text-center">Name</div>
                <div className="px-1.5 py-0.5 text-sm w-[18%] font-semibold text-center">Booked Rides</div>
                <div className="px-1.5 py-0.5 text-sm w-[18%] font-semibold text-center">Matric Number</div>
                <div className="px-1.5 py-0.5 text-sm w-[17%] font-semibold text-center">Course</div>
                <div className="px-1.5 py-0.5 text-sm w-[17%] font-semibold text-center">Student Mail</div>
            </div>

            <div className="w-full flex flex-row items-center justify-start" style={{color:NEUTRAL500}}>
                <div className="px-1.5 py-1.5 text-sm w-[12%] text-left">10/10/2023</div>
                <div className="px-1.5 py-1.5 text-sm w-[18%] text-center">Sample Name</div>
                <div className="px-1.5 py-1.5 text-sm w-[18%] text-center">100</div>
                <div className="px-1.5 py-1.5 text-sm w-[18%] text-center">19CJ025802</div>
                <div className="px-1.5 py-1.5 text-sm w-[17%] text-center">Computer Engineering</div>
                <div className="px-1.5 py-1.5 text-sm w-[17%] text-center">samplename@gmail.com</div>
            </div>

            <div className="w-full flex flex-row items-center justify-start" style={{color:NEUTRAL500}}>
                <div className="px-1.5 py-1.5 text-sm w-[12%] text-left">10/10/2023</div>
                <div className="px-1.5 py-1.5 text-sm w-[18%] text-center">Sample Name</div>
                <div className="px-1.5 py-1.5 text-sm w-[18%] text-center">100</div>
                <div className="px-1.5 py-1.5 text-sm w-[18%] text-center">19CJ025802</div>
                <div className="px-1.5 py-1.5 text-sm w-[17%] text-center">Computer Engineering</div>
                <div className="px-1.5 py-1.5 text-sm w-[17%] text-center">samplename@gmail.com</div>
            </div>

            <div className="w-full flex flex-row items-center justify-start" style={{color:NEUTRAL500}}>
                <div className="px-1.5 py-1.5 text-sm w-[12%] text-left">10/10/2023</div>
                <div className="px-1.5 py-1.5 text-sm w-[18%] text-center">Sample Name</div>
                <div className="px-1.5 py-1.5 text-sm w-[18%] text-center">100</div>
                <div className="px-1.5 py-1.5 text-sm w-[18%] text-center">19CJ025802</div>
                <div className="px-1.5 py-1.5 text-sm w-[17%] text-center">Computer Engineering</div>
                <div className="px-1.5 py-1.5 text-sm w-[17%] text-center">samplename@gmail.com</div>
            </div>
        </div>
    )
}