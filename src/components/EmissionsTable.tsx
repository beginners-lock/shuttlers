import { SECONDARY800, NEUTRAL500, ADMINTABLETEXTH } from "../theme/colors"

type EmissionTableProps = {
    data: any[]
}

export default function EmissionsTable({ data }: EmissionTableProps){
    const LOW = { bg:'#27AE6040', color:'#27AE60'};
    const MEDIUM = { bg:'#0055CC40', color:'#0055CC'};
    const HIGH = { bg:'#FBDDDD', color:'red'};

    return(
        <div className="w-full h-[100%]">
            <div className="border-0 border-t-[1px] border-b-[1px] w-full flex flex-row items-center justify-start mb-2" style={{borderColor:ADMINTABLETEXTH, color:ADMINTABLETEXTH}}>
                <div className="px-1.5 py-0.5 text-sm w-[17%] font-semibold text-left">Date</div>
                <div className="px-1.5 py-0.5 text-sm w-[17%] font-semibold text-center">Drivers Name</div>
                <div className="px-1.5 py-0.5 text-sm w-[17%] font-semibold text-center">Drivers Number</div>
                <div className="px-1.5 py-0.5 text-sm w-[20%] font-semibold text-center">Expected/Current (Level)</div>
                <div className="px-1.5 py-0.5 text-sm w-[17%] font-semibold text-center">Emission Status</div>
                <div className="px-1.5 py-0.5 text-sm w-[12%] font-semibold text-center">Action</div>
            </div>

            {
                data.map(data => {
                    return(
                        <div key={'data'+data[0]} className="w-full flex flex-row items-center justify-start" style={{color:NEUTRAL500}}>
                            <div className="px-1.5 py-1.5 text-sm w-[17%] text-left">{data[2]}</div>
                            <div className="px-1.5 py-1.5 text-sm w-[17%] text-center">Sample Name</div>
                            <div className="px-1.5 py-1.5 text-sm w-[17%] text-center">08123456789</div>
                            <div className="px-1.5 py-1.5 text-sm w-[20%] text-center">{data[1]+' ppm'}</div>
                            <div className="px-1.5 py-1.5 text-sm w-[17%] text-center flex flex-row items-center justify-center">
                                <div className="w-14 py-0.5 rounded-full" style={{backgroundColor:data[1]<=50?LOW.bg:data[1]<=150?MEDIUM.bg:HIGH.bg, color:data[1]<=50?LOW.color:data[1]<=150?MEDIUM.color:HIGH.color}}>
                                    {data[1]<=50?'Low':data[1]<=150?'Medium':'High'}
                                </div>
                            </div>
                            <div className="px-1.5 py-1.5 text-sm w-[12%] text-center flex flex-row items-center justify-center">
                                <div className="w-12 py-0.5 rounded-md text-white" style={{backgroundColor:SECONDARY800}}>Call</div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}