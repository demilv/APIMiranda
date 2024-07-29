import { Schema, model, Types } from 'mongoose';
import { User } from '../../interfaces/User';

const userSchema = new Schema<User>({
    id: Types.ObjectId,
    photo: { type: String },
    name: {type: String},
    startDate: {type: String},
    email: {type: String},
    job: {type: String},
    phone: {type: String},
    status: {type: Boolean},
    pass: {type: String},
  });
  
  export const UserModel = model<User>('User', userSchema);