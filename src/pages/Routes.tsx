import { useState } from "react";
import Navbar from "../components/Navbar";
import { NEUTRAL700, PRIMARY800 } from "../theme/colors";
import { LOCATIONS, PRICES } from "../constants/location";

export default function Routes(){
    const [showsidebar, setShowsidebar] = useState(false);

	const toggleSidebar = () => {
		setShowsidebar( state => { return !state; } )
	}

    return(
        <div className="font-poppins w-full box-border flex flex-col items-center justify-start px-4">
            <Navbar
				showSidebar={toggleSidebar}
			/>

            <div className="w-full flex flex-col items-start justify-start px-2">
                <div className="mt-8 w-full flex flex-row items-center justify-start text-2xl font-semibold" style={{color:PRIMARY800}}>Locations</div>
                <div className="mt-2 w-full h-60 flex flex-col items-start justify-start flex-wrap">
                    {
                        LOCATIONS.map(location => {
                            return(
                                <div className="mt-3 w-[30%] flex flex-row items-center justify-start">{location}</div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="w-full flex flex-col items-start justify-start px-2">
                <div className="mt-8 w-full flex flex-row items-center justify-start text-2xl font-semibold" style={{color:PRIMARY800}}>Pricings</div>
                <div className="mt-2 w-full flex flex-col items-start justify-start">
                    <div className="w-full flex flex-row items-center justify-start">
                        <div className="w-[42%] font-semibold text-lg" style={{color:NEUTRAL700}}>Location</div>
                        <div className="w-[42%] font-semibold text-lg" style={{color:NEUTRAL700}}>Destination</div>
                        <div className="w-[16%] font-semibold text-lg" style={{color:NEUTRAL700}}>Price</div>
                    </div>
                    {
                        PRICES.map(price => {
                            return(
                                <div className="mt-4 w-full flex flex-row items-center justify-start">
                                    <div className="w-[42%]">{price.location}</div>
                                    <div className="w-[42%]">{price.destination}</div>
                                    <div className="w-[16%]">{'₦ '+price.price}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}