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

    static save(newUser: UserInterface): UserInterface {
        this.users.push(newUser);
        return newUser;
    }

    static findByIdAndUpdate(id: number, updatedUserData: Partial<UserInterface>): UserInterface | undefined {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) return undefined;

        const updatedUser = { ...this.users[index], ...updatedUserData } as UserInterface;
        this.users[index] = updatedUser;
        return updatedUser;
    }

    static findByIdAndDelete(id: number): UserInterface | undefined {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) return undefined;

        const [deletedUser] = this.users.splice(index, 1);
        return deletedUser;
    }
}