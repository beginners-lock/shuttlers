import { SECONDARY900 } from "../theme/colors";

export default function DNavbar(){
    const urlstring = window.location.search;
    const params = new URLSearchParams(urlstring);
    const id = params.get('id');

    return(
        <div className="flex flex-row justify-between items-center fixed bottom-4 w-[300px] h-12 rounded-full px-4 py-2 box-border" style={{backgroundColor: SECONDARY900}}>
            <div className="rounded-full flex flex-row items-center justify-start px-2 py-1.5" style={{backgroundColor:window.location.pathname==='/driver/dashboard'?'#FFFFFF4D':'transparent'}} onClick={()=>{ window.location.href='/driver/dashboard?id='+id; }}>
                <img alt="homeicon" src="../homeiconnavbar.png"/>
                <div className=" text-sm ml-2 text-white" style={{display:window.location.pathname==='/driver/dashboard'?'flex':'none'}}>Home</div>
            </div>

            <div className="rounded-full flex flex-row items-center justify-start px-2 py-1.5" style={{backgroundColor:window.location.pathname==='/driver/trips'?'#FFFFFF4D':'transparent'}} onClick={()=>{ window.location.href='/driver/trips?id='+id; }}>
                <img alt="tripsicon" src="../tripsiconnavbar.png"/>
                <div className=" text-sm ml-2 text-white" style={{display:window.location.pathname==='/driver/trips'?'flex':'none'}}>Trips</div>
            </div>

            <div className="rounded-full flex flex-row items-center justify-start px-2 py-1.5" style={{backgroundColor:window.location.pathname==='/driver/settings'?'#FFFFFF4D':'transparent'}} onClick={()=>{ window.location.href='/driver/settings?id='+id; }}>
                <img alt="profileicon" src="../profileiconnavbar.png"/>
                <div className=" text-sm ml-2 text-white" style={{display:window.location.pathname==='/driver/settings'?'flex':'none'}}>Profile</div>
            </div>
        </div>
    );
}