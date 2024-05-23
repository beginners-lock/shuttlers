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
                <div className="px-1.5 py-0.5 text-sm w-[20%] font-semibold text-center">Name</div>
                <div className="px-1.5 py-0.5 text-sm w-[14%] font-semibold text-center">Completed Rides</div>
                <div className="px-1.5 py-0.5 text-sm w-[18%] font-semibold text-center">Drivers Number</div>
                <div className="px-1.5 py-0.5 text-sm w-[19%] font-semibold text-center">Drivers Mail</div>
                <div className="px-1.5 py-0.5 text-sm w-[17%] font-semibold text-center">Status</div>
            </div>

            {
                drivers.map((driver, index) => {
                    return(
                        <div key={keys[index]} className="w-full flex flex-row items-center justify-start" style={{color:NEUTRAL500}}>
                            <div className="px-1.5 py-1.5 text-sm w-[12%] text-left">{driver.regdate.split(' ')[1]}</div>
                            <div className="px-1.5 py-1.5 text-sm w-[20%] text-center">{driver.fullname}</div>
                            <div className="px-1.5 py-1.5 text-sm w-[14%] text-center">{Object.keys(driver.trips).length}</div>
                            <div className="px-1.5 py-1.5 text-sm w-[18%] text-center">{driver.phone}</div>
                            <div className="px-1.5 py-1.5 text-sm w-[19%] text-center">{driver.email}</div>
                            <div className="px-1.5 py-1.5 text-sm w-[17%] text-center flex flex-row items-center justify-center">
                                <div className="w-16 py-0.5 rounded-full" style={{backgroundColor:driver.verified?ACTIVE.bg:INACTIVE.bg, color:driver.verified?ACTIVE.color:INACTIVE.color}}>{driver.verified?'Active':'Inactive'}</div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}