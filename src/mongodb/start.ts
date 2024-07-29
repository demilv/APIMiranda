import { connect } from "mongoose";
import { RoomModel } from './Schemas/room';
import { UserModel } from "./Schemas/user";
import {randomRooms} from './Seeds/room'
import { randomUsers } from "./Seeds/user";
const bcrypt = require('bcrypt');
const saltRounds = 10;


const exampleUser = new UserModel({
  photo: 'https://randomuser.me/api/portraits/men/1.jpg',
  name: 'demilv',
  startDate: new Date('2024-01-15T10:00:00Z'),
  email: 'demilv@gmail.com',
  job: 'Software Engineer',
  phone: '123456789', 
  status: true,
  pass: 'Pass123'
});

async function hashPassword(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    throw new Error('Error en la generación del hash de la contraseña');
  }
}

async function run() {
  try {
    await connect('mongodb://127.0.0.1:27017/test');
    
    exampleUser.pass = await hashPassword(exampleUser.pass);

    await UserModel.insertMany(randomUsers);
    await exampleUser.save();
    await RoomModel.insertMany(randomRooms);

    console.log('Datos insertados correctamente');
  } catch (err) {
    console.error('Error:', err);
  }
}

run().catch(err => console.log(err));