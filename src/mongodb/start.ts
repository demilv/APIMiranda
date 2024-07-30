import { connect, connection } from "mongoose";
import { RoomModel } from './Schemas/room';
import { UserModel } from "./Schemas/user";
import {randomRooms} from './Seeds/room'
import { randomUsers } from "./Seeds/user";
import checkUser, { hashPassword} from "./HashingChecking/HashCheck";

export const loginUser = {
  name: 'demilv',
  pass: 'Pass123'
}



export const exampleUser = new UserModel({
  photo: 'https://randomuser.me/api/portraits/men/1.jpg',
  name: 'demilv',
  startDate: new Date('2024-01-15T10:00:00Z'),
  email: 'demilv@gmail.com',
  job: 'Software Engineer',
  phone: '123456789', 
  status: true,
  pass: 'Pass123'
});



export async function run() {
  try {
    await connect('mongodb://127.0.0.1:27017/test');

    await connection.db.dropCollection('rooms')
    await connection.db.dropCollection('users')

    exampleUser.pass = await hashPassword(exampleUser.pass);
    await exampleUser.save();

    const authenticated = await checkUser(loginUser.name, loginUser.pass);
    if (!authenticated) {
      console.log('Acceso denegado');
      return;
    }


    await UserModel.insertMany(randomUsers);
    await RoomModel.insertMany(randomRooms);

    console.log('Datos insertados correctamente');
  } catch (err) {
    console.error('Error:', err);
  }
}

run().catch(err => console.log(err));