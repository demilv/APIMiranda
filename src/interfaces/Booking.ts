import { Types } from "mongoose";

export interface Booking {
    id: number,
    fotoLink: string,
    guest: string,
    orderDate: string,
    checkInDate: string,
    checkOutDate: string,
    specialRequest: string,
    status: string,
    roomId: Types.ObjectId;
}
