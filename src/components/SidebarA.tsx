import { SECONDARY800 } from "../theme/colors";

export default function SidebarA(){
    const logout = () => {
        sessionStorage.removeItem('shuttlerssession');
        window.location.href = '/admin/signin';
    }

    return(
        <div className="w-[250px] px-5 py-10 rounded-tr-xl rounded-br-xl h-full text-white flex flex-col justify-start items-start font-poppins" style={{backgroundColor:SECONDARY800}}>
            <div className="flex flex-row items-center justify-start">
                <img className="w-8" alt="logo" src="../logoAwhite.png" />
                <div className="h-8 ml-2 pl-2 flex flex-row items-center border-0 border-l-[1px] border-white text-lg font-semibold">Shuttlers!</div>
            </div>

            <div className="mt-12 w-full">
                <div className="w-full text-semibold text-xs border-0 border-b-[1px] border-white pb-2 mb-4">ADMIN INTERFACE</div>
                <div className="px-2 py-2 mb-2 flex flex-row items-center justify-start rounded-md cursor-pointer" style={{background:window.location.pathname==='/admin/dashboard'?'rgba(255,255,255,0.1)':'rgba(255,255,255,0)'}} 
                    onClick={()=>{ if(window.location.pathname!=="/admin/dashboard"){ window.location.href="/admin/dashboard"; } }}>
                    <img className="w-4" alt="dashboardicon" src="../dashboardAwhite.png"/>
                    <div className="ml-2 text-sm">Dashboard</div>
                </div>
                <div className="px-2 py-2 mb-2 flex flex-row items-center justify-start rounded-md cursor-pointer" style={{background:window.location.pathname==='/admin/userstable'?'rgba(255,255,255,0.1)':'rgba(255,255,255,0)'}}
                    onClick={()=>{ if(window.location.pathname!=="/admin/userstable"){ window.location.href="/admin/userstable"; } }}>
                    <img className="w-4" alt="usersicon" src="../usersAwhite.png"/>
                    <div className="ml-2 text-sm">Users</div>
                </div>
                <div className="px-2 py-2 mb-2 flex flex-row items-center justify-start rounded-md cursor-pointer" style={{background:window.location.pathname==='/admin/emissionstable'?'rgba(255,255,255,0.1)':'rgba(255,255,255,0)'}}
                    onClick={()=>{ if(window.location.pathname!=="/admin/emissionstable"){ window.location.href="/admin/emissionstable"; } }}>
                    <img className="w-4" alt="emissionsicon" src="../emissionsAwhite.png"/>
                    <div className="ml-2 text-sm">Emission Analysis</div>
                </div>
            </div>

            <div className="mt-12 w-full">
                <div className="w-full text-semibold text-xs border-0 border-b-[1px] border-white pb-2 mb-4">ACCOUNT</div>
                <div className="px-2 py-2 mb-2 flex flex-row items-center justify-start rounded-md cursor-pointer">
                    <img className="w-4" alt="dashboardicon" src="../notificationsAwhite.png"/>
                    <div className="ml-2 text-sm">Notifications</div>
                </div>
                <div className="px-2 py-2 mb-2 flex flex-row items-center justify-start rounded-md cursor-pointer">
                    <img className="w-4" alt="usersicon" src="../settingsAwhite.png"/>
                    <div className="ml-2 text-sm">Settings</div>
                </div>
            </div>

            <div className="mt-20 px-2 py-2 mb-2 flex flex-row items-center justify-start rounded-md cursor-pointer" onClick={()=>{ logout(); }}>
                <img className="w-4" alt="usersicon" src="../logoutAwhite.png"/>
                <div className="ml-2 text-sm">Logout</div>
            </div>
        </div>
    )
}