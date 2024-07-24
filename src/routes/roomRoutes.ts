const express = require('express');
import {getAllRooms, getOneRoom /*setNewRoom, updateRoom, deleteRoom*/} from '../controllers/room';
const router = express.Router();

router.get("/", getAllRooms)

router.get("/:id", getOneRoom)

//router.post("/newRoom", setNewRoom)

//router.put("/upRoom/:id", updateRoom)

//router.delete("/delRoom/:id", deleteRoom)



export default router;