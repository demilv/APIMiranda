import { RoomModel } from '../mongodb/Schemas/room';
import { Room as RoomInterface } from '../interfaces/Room';
import { APIError } from '../errors/APIerror';
import { Types } from 'mongoose';

export class Room {
    static async fetchAll(): Promise<RoomInterface[]> {
        try {
            const rooms = await RoomModel.find({});
            return rooms as RoomInterface[];
        } catch (error) {
            throw new APIError('Rooms not found: ' + 404);
        }
    }

    static async getRoom(id: string){    
        const objectId = new Types.ObjectId(id); 

        const room = await RoomModel.findById(objectId);        
        if (!room){
            throw new APIError('Room not found: ', 404);            
        }
        return room;
    }

    /*
    static async save(newRoom: RoomInterface): Promise<RoomInterface> {
        try {
            const room = new RoomModel(newRoom);
            await room.save();
            return room as RoomInterface;
        } catch (error) {
            throw new Error('Error saving room: ' + error.message);
        }
    }

    static async Edit(id: string, updatedRoomData: Partial<RoomInterface>): Promise<RoomInterface | null> {
        try {
            const updatedRoom = await RoomModel.findByIdAndUpdate(id, updatedRoomData, { new: true });
            return updatedRoom as RoomInterface | null;
        } catch (error) {
            throw new Error('Error updating room: ' + error.message);
        }
    }

    static async Delete(id: string): Promise<RoomInterface | null> {
        try {
            const deletedRoom = await RoomModel.findByIdAndDelete(id);
            return deletedRoom as RoomInterface | null;
        } catch (error) {
            throw new Error('Error deleting room: ' + error.message);
        }
    }
    */
}
