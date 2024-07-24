import roomData from '../data/roomData.json'
import { Room as RoomInterface } from '../interfaces/Room';

export class Room {

    private static rooms: RoomInterface[] = roomData;

    static fetchAll() : RoomInterface[] {
        return roomData as RoomInterface[];
    }

    static findById(id: number): RoomInterface | undefined {
        return this.rooms.find(room => room.id === id);
    }

    static save(newRoom: RoomInterface): RoomInterface {
        this.rooms.push(newRoom);
        return newRoom;
    }

    static findByIdAndUpdate(id: number, updatedRoomData: Partial<RoomInterface>): RoomInterface | undefined {
        const index = this.rooms.findIndex(room => room.id === id);
        if (index === -1) return undefined;

        const updatedRoom = { ...this.rooms[index], ...updatedRoomData } as RoomInterface;
        this.rooms[index] = updatedRoom;
        return updatedRoom;
    }

    static findByIdAndDelete(id: number): RoomInterface | undefined {
        const index = this.rooms.findIndex(room => room.id === id);
        if (index === -1) return undefined;

        const [deletedRoom] = this.rooms.splice(index, 1);
        return deletedRoom;
    }
}