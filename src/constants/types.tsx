export type DriverDataType = {
    fullname: string,
    email: string,
    phone: string,
    cartype: string,
    carnumber: string
}

export type RideObj = {
    currentlocation: string | null,
    destination: string | null,
    passengers: number | null,
    price: string | null,
}