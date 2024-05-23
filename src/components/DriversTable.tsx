import { SECONDARY800, NEUTRAL500, ADMINTABLETEXTH } from "../theme/colors"

type DriversTableProps = {
    keys: string[],
    drivers: any[]
}

export default function DriversTable({ keys, drivers }: DriversTableProps){
    const ACTIVE = { bg:'#27AE6040', color:'#27AE60'};
    const INACTIVE = { bg:'#FBDDDD', color:'red'};

    return(
        <div className="w-full h-[100%]">
            <div className="border-0 border-t-[1px] border-b-[1px] w-full flex flex-row items-center justify-start mb-1" style={{borderColor:ADMINTABLETEXTH, color:ADMINTABLETEXTH}}>
                <div className="px-1.5 py-0.5 text-sm w-[12%] font-semibold text-left">Date of Reg.</div>
                <div className="px-1.5 py-0.5 text-sm w-[18%] font-semibold text-center">Name</div>
                <div className="px-1.5 py-0.5 text-sm w-[18%] font-semibold text-center">Completed Rides</div>
                <div className="px-1.5 py-0.5 text-sm w-[18%] font-semibold text-center">Drivers Number</div>
                <div className="px-1.5 py-0.5 text-sm w-[17%] font-semibold text-center">Drivers Mail</div>
                <div className="px-1.5 py-0.5 text-sm w-[17%] font-semibold text-center">Status</div>
            </div>

            <div className="w-full flex flex-row items-center justify-start" style={{color:NEUTRAL500}}>
                <div className="px-1.5 py-1.5 text-sm w-[12%] text-left">10/10/2023</div>
                <div className="px-1.5 py-1.5 text-sm w-[18%] text-center">Sample Name</div>
                <div className="px-1.5 py-1.5 text-sm w-[18%] text-center">100</div>
                <div className="px-1.5 py-1.5 text-sm w-[18%] text-center">08123456789</div>
                <div className="px-1.5 py-1.5 text-sm w-[17%] text-center">samplename@gmail.com</div>
                <div className="px-1.5 py-1.5 text-sm w-[17%] text-center flex flex-row items-center justify-center">
                    <div className="w-16 py-0.5 rounded-full" style={{backgroundColor:ACTIVE.bg, color:ACTIVE.color}}>Active</div>
                </div>
            </div>

            <div className="w-full flex flex-row items-center justify-start" style={{color:NEUTRAL500}}>
                <div className="px-1.5 py-1.5 text-sm w-[12%] text-left">10/10/2023</div>
                <div className="px-1.5 py-1.5 text-sm w-[18%] text-center">Sample Name</div>
                <div className="px-1.5 py-1.5 text-sm w-[18%] text-center">100</div>
                <div className="px-1.5 py-1.5 text-sm w-[18%] text-center">08123456789</div>
                <div className="px-1.5 py-1.5 text-sm w-[17%] text-center">samplename@gmail.com</div>
                <div className="px-1.5 py-1.5 text-sm w-[17%] text-center flex flex-row items-center justify-center">
                    <div className="w-16 py-0.5 rounded-full" style={{backgroundColor:INACTIVE.bg, color:INACTIVE.color}}>Inactive</div>
                </div>
            </div>
        </div>
    )
}