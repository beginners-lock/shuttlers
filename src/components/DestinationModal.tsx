import { LOCATIONS } from "../constants/location";
import { MODALBODYTEXT, MODALBG, NEUTRAL500, NEUTRAL300, PRIMARY700 } from "../theme/colors";

type DestModal = {
    showmodal: boolean,
    closemodal?: ()=>void,
    locationbtnprop?: (type: string, location: string)=>void
    locationbackbtn?: (type: string)=>void,
    locationexception: string | null,
    current: string | null
}

export default function DestinationModal({showmodal, closemodal, locationbackbtn, locationbtnprop, locationexception, current}: DestModal){
    const type = "destinationmodal";
    const title = "Your Destination";
    const body = "Select your destination from the drop-down to get the fastest ride";
    const buttontext = "Continue";
    const dropdowntext = "Select your destination from the drop-down";
    
    const locationbtnclick = (type: string) => {
        let el = document.getElementById('locationselect') as HTMLSelectElement;
        if(locationbtnprop){ locationbtnprop(type, el.value); }
    }

    return(
        <div className="absolute z-0 w-full h-[100%] flex flex-row items-center justify-center" style={{backgroundColor: MODALBG, display:showmodal?'flex':'none'}}>
            <div className="bg-white w-[450px] box-border rounded-xl p-8">
                <div className="w-full h-full flex flex-col items-center justify-start box-border">
                    <div className="w-full flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center justify-start text-md" onClick={()=>{ if(locationbackbtn){ locationbackbtn("destinationmodal"); } }}>
                            <img alt="goback" src="../goback.png" className="mr-2"/>
                            Go back
                        </div>
                        <img alt="close" src="../modalclose.png" onClick={()=>{ if(closemodal){ closemodal(); } }} />
                    </div>

                    <div className="mt-5 text-center text-2xl font-semibold" style={{color:PRIMARY700}}>{title}</div>

                    <div className="text-center text-md mt-3.5" style={{color: MODALBODYTEXT}}>{body}</div>

                    <select id="locationselect" className="w-full text-sm mt-2 p-3 border rounded-md box-border" style={{color: NEUTRAL500, borderColor: NEUTRAL300}} defaultValue={""}>
                        <option value="" selected>{dropdowntext}</option>
                        {
                            LOCATIONS.map((location) => {
                                if(locationexception){
                                    if(!location.includes(locationexception) && location!==current ){
                                        return <option value={location} className="text-xs">{location}</option>
                                    }else{
                                        return '';
                                    }
                                }else{
                                    return <option value={location} className="text-xs">{location}</option>
                                }
                            })
                        }
                    </select>

                    <button className="w-full text-white font-md rounded-full mt-6 p-2" style={{backgroundColor:PRIMARY700}} onClick={()=>{ locationbtnclick(type); }}>{buttontext}</button>
                </div>
            </div>
        </div>
    );
}