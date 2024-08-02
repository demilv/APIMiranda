import { Request, Response, NextFunction } from 'express';
import { Room as RoomService } from '../services/room';
//import { Room as RoomInterface } from '../interfaces/Room';

const fetchAllRooms = async () => {
    try {
        const rooms = await RoomService.fetchAll();
        if (!rooms) {
            throw new Error('Rooms not found');
        }
        return rooms;
    } catch (e) {
        throw e;
    }
};

export const getAllRooms = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const rooms = await fetchAllRooms();
        return res.json(rooms);
    } catch (e) {
        return next(e);
    }
};

export const getOneRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rooms = await fetchAllRooms();        
        const roomIndex = parseInt(req.params.id, 10)-1;

        if (isNaN(roomIndex) || roomIndex < 0 || roomIndex >= rooms.length) {
            return res.status(404).json({ message: 'Room not found' });
        }

        const room = rooms[roomIndex];
        return res.status(200).json(room);
    } catch (e) {
        return next(e);
    }
};

/*
export const setNewRoom = (req: Request, res: Response, next: NextFunction) => {
    try {
        const newRoom: RoomInterface = req.body;
        if (!newRoom.id || !newRoom.fotoLink || !newRoom.number || !newRoom.floor || 
            !newRoom.bedType || !newRoom.amenities || !newRoom.price || !newRoom.status || !newRoom.offer) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const savedRoom = RoomService.save(newRoom);
        return res.status(201).json({ room: savedRoom });
    } catch (e) {
        return next(e);
    }
};

export const updateRoom = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const updatedRoomData: Partial<RoomInterface> = req.body;
        const updatedRoom = RoomService.findByIdAndUpdate(id, updatedRoomData);
        if (!updatedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }
        return res.json({ room: updatedRoom });
    } catch (e) {
        return next(e);
    }
};

export const deleteRoom = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const deletedRoom = RoomService.findByIdAndDelete(id);
        if (!deletedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }
        return res.json({ message: 'Room deleted successfully' });
    } catch (e) {
        return next(e);
    }
};*/