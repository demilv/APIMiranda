const express = require('express');
import {getAllBookings, getOneBooking /*setNewBooking, updateBooking, deleteBooking*/} from '../controllers/booking';
const router = express.Router();

router.get("/", getAllBookings)

router.get("/:id", getOneBooking)

//router.post("/newReview", setNewBooking)

//router.put("/upReview/:id", updateBooking)

//router.delete("/delReview/:id", deleteBooking)



export default router;