//Template for each of the Modal variable based on the modal type

export type ModalPaymentListType = {
    text: string,
    img: string
}

export type RecentRidesListType = {
    destination: string,
    time: number
}

export type ModalRideListType = {
    type: 'Economic Ride'|'Premium Ride'|'Exclusive Ride',
    car: "economiccar.png"|"premiumcar.png"|"exclusivecar.png",
    cost: number,
    time: number,
    passengers: number
}

type SpecialTitle = {
    userimg: string, 
    carimg: "economiccar.png"|"premiumcar.png"|"exclusivecar.png",
    time: number,
    cardesc: string
}

export type ModalObjType = {
    type: string,
    title: string | SpecialTitle,
    body: string,
    close: boolean,
    goback: boolean
    button: boolean,
    buttontext: string | string[],
    dropdown: boolean,
    dropdowntext: string | {img: string, text: string},
    list: false | 
    {
        text?: string,
        img?: string,
        type?: 'Economic Ride'|'Premium Ride'|'Exclusive Ride',
        car?: "economiccar.png"|"premiumcar.png"|"exclusivecar.png",
        cost?: number,
        time?: number,
        passengers?: number,
        destination?: string,
    }[]
}

export const FORGOTPASSWORDMODAL: ModalObjType = {
    type: "forgotpasswordmodal",
    title: "Successful!",
    body: "Your Password has been reset successfully!",
    close: true, goback: false,
    button: false, buttontext: "",
    dropdown: false, dropdowntext: "",
    list: false
}

export const CHANGEPASSWORDMODAL: ModalObjType = {
    type: "changepasswordmodal",
    title: "Successful!",
    body: "Your Password has been changed successfully!",
    close: true, goback: false,
    button: false, buttontext: "",
    dropdown: false, dropdowntext: "",
    list: false
}

export const CURRENTLOCATIONMODAL: ModalObjType = {
    type: "currentlocationmodal",
    title: "Where are you now?",
    body: "Select your location from the drop-down to get the fastest ride",
    close: true, goback: false,
    button: true, buttontext: "Continue",
    dropdown: true, dropdowntext: "Select your location from the drop-down",
    list: false
}

export const DESTINATIONMODAL: ModalObjType = {
    type: "destinationmodal",
    title: "Your Destination",
    body: "Select your destination from the drop-down to get the fastest ride",
    close: true, goback: true,
    button: true, buttontext: "Continue",
    dropdown: true, dropdowntext: "Select your destination from the drop-down",
    list: false
}

export const PAYMENTMETHODMODAL: ModalObjType = {
    type: "paymentmethodmodal",
    title: "Choose Payment Method",
    body: "Select your payment method for seamless transport journey",
    close: true, goback: true,
    button: false, buttontext: "",
    dropdown: false, dropdowntext: "",
    list: [{img:"applepay.png", text:"Apple Pay"}, {img:"cash.png", text:"Cash"}, {img:"card.png", text:"Add Cards"}, {img:"addpayment.png", text:"Add Payment Method"}]
}

export const RIDETYPEMODAL: ModalObjType = {
    type: "ridetypemodal",
    title: "Ride Type",
    body: "Select your preferred type of ride",
    close: true, goback: true,
    button: true, buttontext: "Confirm Ride",
    dropdown: true, dropdowntext: {img:"cash.png", text:"Cash Ride"},
    list: [
        { type: "Economic Ride", car:"economiccar.png", cost: 200, time: 2, passengers: 3  },
        { type: "Premium Ride", car:"premiumcar.png", cost: 250, time: 2, passengers: 2  },
        { type: "Exclusive Ride", car:"exclusivecar.png", cost: 300, time: 2, passengers: 1  },
    ]
}

export const RECENTRIDESMODAL: ModalObjType = {
    type: "recentridesmodal",
    title: "Recent Rides",
    body: "View your recent rides below",
    close: true, goback: false,
    button: false, buttontext: "",
    dropdown: false, dropdowntext: "",
    list: [
        { destination: "Cucrid Building", time: 12},
        { destination: "Cucrid Building", time: 12},
    ]
}

export const LOGOUTMODAL: ModalObjType = {
    type: "logoutmodal",
    title: "Logout?",
    body: "Are you sure you want to logout from your account?",
    close: false, goback: false,
    button: true, buttontext: ["Cancel", "Logout"],
    dropdown: false, dropdowntext: "",
    list: false
}

export const DEPARTMENTMODAL: ModalObjType = {
    type: "departmentmodal",
    title: "Department Building",
    body: "Select your departmental building from the drop-down to get the fastest ride",
    close: true, goback: false,
    button: true, buttontext: "Continue",
    dropdown: true, dropdowntext: "Select your departmental building from the drop-down",
    list: false
}

export const HOSTELMODAL: ModalObjType = {
    type: "hostelmodal",
    title: "Hostel",
    body: "Select your hostel from the drop-down to get the fastest ride",
    close: true, goback: false,
    button: true, buttontext: "Continue",
    dropdown: true, dropdowntext: "Select your hostel from the drop-down",
    list: false
}

export const ARRIVINGMODAL: ModalObjType = {
    type: "arrivingmodal",
    title: {carimg: "economiccar.png", userimg: "userimg2.png", time: 3, cardesc: "Benz, Yellow (ABC203XY)"},
    body: "",
    button:true, buttontext:"Confirm Ride",
    close: true, goback: true,
    dropdown: false, dropdowntext: "",
    list: false
}