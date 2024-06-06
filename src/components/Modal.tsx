import { MODALBG, PRIMARY700, NEUTRAL300, MODALBODYTEXT, NEUTRAL500, SECONDARY800 } from "../theme/colors";
//import { FORGOTPASSWORDMODAL, CHANGEPASSWORDMODAL, CURRENTLOCATIONMODAL, DESTINATIONMODAL, PAYMENTMETHODMODAL, DEPARTMENTMODAL, HOSTELMODAL, RIDETYPEMODAL, RECENTRIDESMODAL, LOGOUTMODAL, ARRIVINGMODAL } from "../theme/messages";
import { ModalObjType } from "../constants/modalvariables";
import { LOCATIONS } from "../constants/location";


//const isModalPaymentListType = (x: any): x is ModalPaymentListType => x.text && x.img;

type ModalProps = {
    modalobj: ModalObjType,
    showmodal: boolean,
    hidemodal?: ()=>void,
    type?: string,
    closemodal?: ()=>void,
    locationbtnprop?: (type: string, location: string)=>void
    locationbackbtn?: (type: string)=>void
}

export default function Modal({ modalobj, showmodal, hidemodal, type, closemodal, locationbtnprop, locationbackbtn }: ModalProps ){    
    const locationbtnclick = (type: string) => {
        let el = document.getElementById('locationselect') as HTMLSelectElement;
        if(locationbtnprop){ locationbtnprop(type, el.value); }
    }

    return(
        <div className="absolute z-0 w-full h-[100%] flex-row items-center justify-center" style={{backgroundColor: MODALBG, display: showmodal ? 'flex' : 'none'}}>
            <div className="bg-white w-[450px] box-border rounded-xl p-8">
                <div className="w-full h-full flex flex-col items-center justify-start box-border">
                    <img alt="modaltick" src="../modaltick.png" style={{display:modalobj.type==="changepasswordmodal" || modalobj.type==="forgotpasswordmodal"?"flex":"none" }}/>

                    {
                        modalobj.type==="currentlocationmodal"?
                            <div>
                                <div className="w-full flex flex-row items-center justify-end" style={{display: !modalobj.goback && !modalobj.close ? "none" : "flex"}}>
                                    <img alt="close" src="../modalclose.png" style={{visibility: modalobj.close?'visible':'hidden'}} onClick={()=>{ if(closemodal){ closemodal(); } }} />
                                </div>

                                <div className="mt-5 text-center text-2xl font-semibold" style={{color: type==='driver'?SECONDARY800:PRIMARY700}}>{typeof modalobj.title==="string" ? modalobj.title : ''}</div>

                                <div className="text-center text-md mt-3.5" style={{color: MODALBODYTEXT}}>{modalobj.body}</div>

                                <select id="locationselect" className="w-full text-sm mt-2 p-3 border rounded-md box-border" style={{display: modalobj.dropdown?'flex':'none', color: NEUTRAL500, borderColor: NEUTRAL300}} defaultValue={""}>
                                    <option value="" selected>
                                        {
                                            typeof modalobj.dropdowntext === 'string' ? 
                                                modalobj.dropdowntext
                                            :   ''
                                        }
                                    </option>
                                    {
                                        LOCATIONS.map((location) => {
                                            return <option value={location} className="text-xs">{location}</option>
                                        })
                                    }
                                </select>

                                <button className="w-full text-white font-md rounded-full mt-6 p-2" style={{backgroundColor: type==='driver'?SECONDARY800:PRIMARY700}} onClick={()=>{ locationbtnclick(modalobj.type); }}>{modalobj.buttontext}</button>
                            </div>
                        : ""
                    }

                    { 
                        modalobj.type==="destinationmodal"?
                            <div>
                                <div className="w-full flex flex-row items-center justify-between" style={{display: !modalobj.goback && !modalobj.close ? "none" : "flex"}}>
                                    <div className="flex flex-row items-center justify-start text-md" style={{visibility: modalobj.goback?'visible':'hidden'}} onClick={()=>{ if(locationbackbtn){ locationbackbtn("destinationmodal"); } }}>
                                        <img alt="goback" src="../goback.png" className="mr-2"/>
                                        Go back
                                    </div>
                                    <img alt="close" src="../modalclose.png" style={{visibility: modalobj.close?'visible':'hidden'}} onClick={()=>{ if(closemodal){ closemodal(); } }} />
                                </div>

                                <div className="mt-5 text-center text-2xl font-semibold" style={{color: type==='driver'?SECONDARY800:PRIMARY700}}>{typeof modalobj.title==="string" ? modalobj.title : ''}</div>

                                <div className="text-center text-md mt-3.5" style={{color: MODALBODYTEXT}}>{modalobj.body}</div>

                                <select id="locationselect" className="w-full text-sm mt-2 p-3 border rounded-md box-border" style={{display: modalobj.dropdown?'flex':'none', color: NEUTRAL500, borderColor: NEUTRAL300}} defaultValue={""}>
                                    <option value="" selected>
                                        {
                                            typeof modalobj.dropdowntext === 'string' ? 
                                                modalobj.dropdowntext
                                            :   ''
                                        }
                                    </option>
                                    {
                                        LOCATIONS.map((location) => {
                                            return <option value={location} className="text-xs">{location}</option>
                                        })
                                    }
                                </select>

                                <button className="w-full text-white font-md rounded-full mt-6 p-2" style={{backgroundColor: type==='driver'?SECONDARY800:PRIMARY700}} onClick={()=>{ locationbtnclick(modalobj.type); }}>{modalobj.buttontext}</button>
                            </div>
                        : ""
                    }
                </div>
            </div>
        </div>
    );
}