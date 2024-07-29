import { Schema, model, Types } from 'mongoose';
import { Room } from '../../interfaces/Room';


const roomSchema = new Schema<Room>({
  id: Types.ObjectId,
  fotoLink: { type: [] },
  number: {type: String},
  floor: {type: Number},
  bedType: {type: String},
  amenities: {type: []},
  price: {type: Number},
  status: {type: Boolean},
  offer: {type: Number},
});

export const RoomModel = model<Room>('Room', roomSchema);