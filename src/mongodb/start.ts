import { connect } from "mongoose";
import {randomRooms} from './Seeds/room'

async function run() {
  await connect('mongodb://127.0.0.1:27017/test');

  await randomRooms.save();

  
}

run().catch(err => console.log(err));