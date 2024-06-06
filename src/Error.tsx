export const ErrorPage = () => {
    const backtosafety = () => {
        let session = sessionStorage.getItem('shuttlerssession');
        console.log(session);
        if(session && session!=='null' && session!==null && session!=='undefined' && session!==undefined){
            let sess: any = JSON.parse(session);
            if(sess.type==='user' && sess.id){
                window.location.href = '/user/dashboard?id='+sess.id;
            }

            if(sess?.type==='driver' && sess.id){
                window.location.href = '/driver/dashboard?id='+sess.id;
            }

            if(sess?.type==='admin'){
                window.location.href = '/admin/dashboard';
            }
        }else{
            window.location.href='/';
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center font-poppins">
            <div className="text-3xl md:text-6xl font-bold">404 ERROR</div>
            <div className="text-xl md:text-3xl font-bold mt-2 md:mt-4">Page not found</div>
            <div className="text-md md:text-2xl font-semibold mt-12">...Seems you got lost...</div>
            <div className="text-sm md:text-xl text-white bg-green-700 font-semibold cursor-pointer px-5 py-2.5 rounded-lg shadow-lg mt-4" onClick={()=>{ backtosafety(); }}>
                Head back home
            </div>
        </div>
    );
}
