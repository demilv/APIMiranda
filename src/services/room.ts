import roomData from '../data/roomData.json'

export class Room {
    static fetchAll() {
        return roomData;
    }
}