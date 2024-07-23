const express = require('express');
const {getAllRooms, getOneRoom, setNewRoom, updateRoom, deleteRoom} = require('../controllers/room');
const router = express.Router();

router.get("/", getAllRooms)

router.get("/:id", getOneRoom)

router.post("/newRoom", setNewRoom)

router.put("/upRoom/:id", updateRoom)

router.delete("/delRoom/:id", deleteRoom)



module.exports = router;