type AdminModalProps = {
    visible: boolean,
    person: string,
    btnclick: (arg: string, usertype: string, id: string)=>void,
    id: string
}

export default function AdminModal({ visible, person, btnclick, id }: AdminModalProps){
    return(
        <div className="absolute w-full h-full flex-row justify-center items-center" style={{display:visible?'flex':'none', backgroundColor:'rgba(20, 20, 20, 0.2)'}}>
            <div className="w-[400px] h-[250px] rounded-lg bg-white shadow-lg py-4 px-6 flex flex-col items-center justify-center">
                <div className="text-lg font-semibold text-center">{'Are you sure you want to delete this '+person+' from the shuttlers database?'}</div>
                <div className="text-red-700 text-lg mt-2 font-semibold text-center">{('It can never be recovered if deleted').toUpperCase()}</div>
                <div className="mt-12 w-[80%] flex flex-row items-center justify-between">
                    <div className="text-white w-[100px] h-[50px] flex flex-row items-center justify-center bg-green-700 rounded-lg font-semibold text-lg cursor-pointer" onClick={()=>{ btnclick('deleteproceed', person, id); }}>Proceed</div>
                    <div className="text-white w-[100px] h-[50px] flex flex-row items-center justify-center bg-red-700 rounded-lg font-semibold text-lg cursor-pointer" onClick={()=>{ btnclick('deletecancel', person, id); }}>Cancel</div>
                </div>
            </div>
        </div>
    );
}