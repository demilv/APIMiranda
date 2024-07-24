import ConciergeData from '../data/conciergeData.json'
import { User as UserInterface } from '../interfaces/User';


export class User {

    private static users: UserInterface[] = ConciergeData;

    static fetchAll() : UserInterface[] {
        return ConciergeData as UserInterface[];
    }

    static findById(id: number): UserInterface | undefined {
        return this.users.find(user => user.id === id);
    }

    static save(newRoom: UserInterface): UserInterface {
        this.users.push(newRoom);
        return newRoom;
    }

    static findByIdAndUpdate(id: number, updatedRoomData: Partial<UserInterface>): UserInterface | undefined {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) return undefined;

        const updatedRoom = { ...this.users[index], ...updatedRoomData } as UserInterface;
        this.users[index] = updatedRoom;
        return updatedRoom;
    }

    static findByIdAndDelete(id: number): UserInterface | undefined {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) return undefined;

        const [deletedRoom] = this.users.splice(index, 1);
        return deletedRoom;
    }
}