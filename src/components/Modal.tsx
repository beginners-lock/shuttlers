import { MODALBG, PRIMARY700, NEUTRAL400, NEUTRAL300, MODALBODYTEXT, SECONDARY500, LIGHTPURPLE, NEUTRAL500, NEUTRAL800 } from "../theme/colors";
//import { FORGOTPASSWORDMODAL, CHANGEPASSWORDMODAL, CURRENTLOCATIONMODAL, DESTINATIONMODAL, PAYMENTMETHODMODAL, DEPARTMENTMODAL, HOSTELMODAL, RIDETYPEMODAL, RECENTRIDESMODAL, LOGOUTMODAL, ARRIVINGMODAL } from "../theme/messages";
import { ModalObjType } from "../constants/modalvariables";


//const isModalPaymentListType = (x: any): x is ModalPaymentListType => x.text && x.img;

type ModalProps = {
    modalobj: ModalObjType,
    showmodal: boolean
}

export default function Modal({ modalobj, showmodal }: ModalProps ){
    return(
        <div className="absolute z-0 w-full h-[100%] flex-row items-center justify-center" style={{backgroundColor: MODALBG, display: showmodal ? 'flex' : 'none'}}>
            <div className="bg-white w-[450px] box-border rounded-xl p-8">
                <div className="w-full h-full flex flex-col items-center justify-start box-border">
                    <div className="w-full flex flex-row items-center justify-between" style={{display: !modalobj.goback && !modalobj.close ? "none" : "flex"}}>
                        <div className="flex flex-row items-center justify-start text-md" style={{visibility: modalobj.goback?'visible':'hidden'}}>
                            <img alt="goback" src="goback.png" className="mr-2"/>
                            Go back
                        </div>
                        <img alt="close" src="modalclose.png" style={{visibility: modalobj.close?'visible':'hidden'}} />
                    </div>

                    <img alt="modaltick" src="modaltick.png" style={{display:modalobj.type==="changepasswordmodal" || modalobj.type==="forgotpasswordmodal"?"flex":"none" }}/>
                    
                    {
                        typeof modalobj.title==="string"?
                            <div className="mt-5 text-center text-2xl font-semibold" style={{color: PRIMARY700}}>{modalobj.title}</div>
                        :   <div className="mt-5 w-full flex flex-row items-center justify-between">
                                <img alt="driverpic" src={modalobj.title.userimg}/>
                                <div className="w-[70%]" style={{color:PRIMARY700}}>
                                    <div className="font-semibold text-xl">{'Arriving in '+modalobj.title.time.toString()+' mins'}</div>
                                    <div className="mt-0.5 text-sm">{modalobj.title.cardesc}</div>
                                </div>
                                <img alt="arrivingimg" src={modalobj.title.carimg}/>
                            </div>
                    }

                    <div className="text-center text-md mt-3.5" style={{color: MODALBODYTEXT}}>{modalobj.body}</div>

                    {
                        modalobj.list?
                            modalobj.type==="paymentmethodmodal"?
                                modalobj.list.map(obj => {
                                    return(
                                        <div className="mt-2 w-full text-sm flex flex-row items-center justify-start px-5 py-3.5 border rounded-full" style={{borderColor: NEUTRAL300}}>
                                            <img className="mr-2" alt="pmimg" src={obj.img}/>
                                            {obj.text}
                                        </div>
                                    )
                                })
                            : modalobj.type==="ridetypemodal"? 
                                modalobj.list.map(obj => {
                                    return(
                                        <div className="box-border w-full mt-2 border flex flex-row items-center justify-between p-3.5 rounded-lg" style={{borderColor:NEUTRAL300}}>
                                            <img alt="rideimg" src={obj.car}/>
                                            <div className="w-[65%] text-slate-500 ">
                                                <div className="font-semibold">{obj.type}</div>
                                                <div className="mt-0.5 flex flex-row items-center justify-start text-sm">
                                                    <img className="mr-1" alt="timeimg" src="time.png"/>
                                                    <div className="mr-3">{obj.time?.toString()+' mins'}</div>
                                                    <img  className="mr-1" alt="passengersimg" src="passengers.png"/>
                                                    <div>{obj.passengers?.toString()}</div>
                                                </div>
                                            </div>
                                            <div className="font-semibold">{'₦ '+obj.cost?.toString()}</div>
                                        </div>
                                    )
                                })
                            :modalobj.type==="recentridesmodal"?
                                modalobj.list.map(obj => {
                                    return(
                                        <div className="w-full px-2.5 py-4 mt-2 flex flex-row items-center justify-between text-md font-semibold rounded-lg border" style={{borderColor:NEUTRAL300}}>
                                            <div className="flex flex-row items-center justify-start">
                                                <img alt="rrimg" src="car.png" className="mr-2"/>
                                                {obj.destination}
                                            </div>
                                            <div style={{color: SECONDARY500}}>{obj.time?.toString()+' mins ago'}</div>
                                        </div>
                                    )
                                })
                            :""
                        :""
                    }
                    
                    <select className="w-full text-sm mt-2 p-3 border rounded-md box-border" style={{display: modalobj.dropdown?'flex':'none', color: NEUTRAL300, borderColor: NEUTRAL300}}>
                        <option value="" disabled selected>
                            {
                                typeof modalobj.dropdowntext === 'string' ? 
                                    modalobj.dropdowntext
                                :   <div className="w-full flex flex-row items-center justify-start">
                                        <img alt="dropdownimg" src={modalobj.dropdowntext.img}/>
                                        <div>{modalobj.dropdowntext.text}</div>
                                    </div>
                            }
                        </option>
                    </select>


                    {
                        modalobj.type==="arrivingmodal"?
                            <div className="w-full mt-4 text-md font-semibold" style={{color: NEUTRAL800}}>
                                Actions
                                <div className="mt-3.5 mb-7 flex flex-row items-center justify-between text-sm" style={{color: NEUTRAL500}}>
                                    <div className="flex flex-col items-center justify-start">
                                        <img className="p-3 rounded-md mb-2" style={{backgroundColor:LIGHTPURPLE}} alt="rdimg" src="reachdriver.png"/>
                                        Reach Driver
                                    </div>

                                    <div className="flex flex-col items-center justify-start">
                                        <img className="p-3 rounded-md mb-2" style={{backgroundColor:LIGHTPURPLE}} alt="ifimg" src="invitefriends.png"/>
                                        Invite Friends
                                    </div>

                                    <div className="flex flex-col items-center justify-start">
                                        <img className="p-3 rounded-md mb-2" style={{backgroundColor:LIGHTPURPLE}} alt="srimg" src="safetyrules.png"/>
                                        Safety Rules
                                    </div>
                                </div>

                                Destination
                                <div className="box-border mt-3 w-full flex flex-row items-center justify-between rounded-xl p-3" style={{backgroundColor: LIGHTPURPLE}}>
                                    <div className="w-[90%] flex flex-row items-center justify-start" style={{color:NEUTRAL800}}>
                                        <img alt="searchimg" className="mr-2 rounded-full p-2" src="search2.png" style={{backgroundColor:NEUTRAL800}}/>
                                        Civil Building 
                                    </div>
                                    <img alt="officialtick" src="officialpurpletick.png"/>
                                </div>
                            </div>
                        :""
                    }
                    

                    {
                        modalobj.button?
                            Array.isArray(modalobj.buttontext) ?    
                                <div className="mt-6 flex flex-row items-center justify-between w-[80%] box-border">
                                    <button className="w-[45%] font-md rounded-full p-2 border" style={{color: NEUTRAL400, borderColor: NEUTRAL400}}>{modalobj.buttontext[0]}</button>
                                    <button className="w-[45%] text-white font-md rounded-full p-2" style={{backgroundColor: PRIMARY700}}>{modalobj.buttontext[1]}</button>
                                </div>
                            :   <button className="w-full text-white font-md rounded-full mt-6 p-2" style={{backgroundColor: PRIMARY700}}>{modalobj.buttontext}</button>
                        : ''    
                    }
                </div>
            </div>
        </div>
    );
}