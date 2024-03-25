import { useEffect } from "react";

type SidebarProps = {
    showstate: boolean,
    hide: ()=>void
}

export default function Sidebar({ showstate, hide }: SidebarProps){
    const url = window.location.href;

	useEffect(()=>{
		
	}, [url]);

    return(
        <div className="absolute z-0 w-full h-[100%] flex flex-row items-start justify-start" style={{left:showstate ? '0px':'-100vw', transitionDuration:'250ms'}} onClick={(e)=>{ e.stopPropagation(); hide(); }}>
            <div className="border h-full w-96 px-6 py-8 box-border flex flex-col items-start justify-start" style={{borderColor:'grey', backgroundColor:'white'}}>
                <img alt="profpic" src="profilepic.png" style={{width:"70px"}}/>
                <div className="flex flex-col items-start justify-start mt-3.5">
                    <div className="font-bold text-lg">Daniel Osakwe</div>
                    <div className="mt-0.5 text-lg">19CF026772</div>
                    <div className="mt-0.5 text-lg">Computer Science</div>
                </div>

                <div className="mt-16 flex flex-col items-start justify-start">
                    <div className="w-full py-2 mb-8 flex flex-row items-center justify-start font-semibold text-lg" onClick={()=>{ if(url.slice(url.lastIndexOf('/')+1)!=='user'){ window.location.href = '/user' } }}>
                        <img alt="homeimg" src="home.png" className="mr-2" style={{width:"30px"}}/>
                        Home
                    </div>

                    <div className="w-full py-2 mb-8 flex flex-row items-center justify-start font-semibold text-lg" onClick={()=>{ console.log('trips'); }}>
                        <img alt="tripsimg" src="trips.png" className="mr-2" style={{width:"30px"}}/>
                        My Trips
                    </div>

                    <div className="w-full py-2 mb-8 flex flex-row items-center justify-start font-semibold text-lg" onClick={()=>{ console.log('notifications'); }}>
                        <img alt="notificationsimg" src="notifications.png" className="mr-2" style={{width:"30px"}}/>
                        Notifications
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-start justify-start">
                    <div className="w-full py-2 mb-8 flex flex-row items-center justify-start font-semibold text-lg" onClick={()=>{ if(url.slice(url.lastIndexOf('/')+1)!=='settings'){ window.location.href = '/settings' } }}>
                        <img alt="settingsimg" src="settings.png" className="mr-2" style={{width:"30px"}}/>
                        Settings
                    </div>

                    <div className="w-full py-2 mb-8 flex flex-row items-center justify-start font-semibold text-lg" onClick={()=>{ console.log('help'); }}>
                        <img alt="helpimg" src="help.png" className="mr-2" style={{width:"30px"}}/>
                        Help and Feedback
                    </div>
                </div>
            </div>
        </div>
    );
}