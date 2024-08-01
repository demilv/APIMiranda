import { UserModel } from '../mongodb/Schemas/user';
import { User as UserInterface } from '../interfaces/User';
import { APIError } from '../errors/APIerror';
import { Types } from 'mongoose';


export class User {

    static async fetchAll() : Promise<UserInterface[]> {
        try{
            const users = await UserModel.find({});
            return users as UserInterface[];
        } catch(error) {
            throw new APIError('Users not found: ' + 404);
        }
    }

   
    static async getUser(id: string) {    
        const objectId = new Types.ObjectId(id); 

        const user = await UserModel.findById(objectId); 
        
        if (!user) {
            throw new APIError('User not found', 404);            
        }
        return user;
    }
    

    /*
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
    }*/
}