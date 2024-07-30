import { Schema, model, Types } from 'mongoose';
import { Booking } from '../../interfaces/Booking';


const bookingSchema = new Schema<Booking>({
  id: Types.ObjectId,
  fotoLink: { type: String },
  guest: {type: String},
  orderDate: {type: String},
  checkInDate: {type: String},
  checkOutDate: {type: String},
  specialRequest: {type: String},
  status: {type: String}
});

export const BookingModel = model<Booking>('Booking', bookingSchema);