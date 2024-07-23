import express, { Request, Response, NextFunction } from 'express';
import { Room } from '../services/room';

export const getAllRooms = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const rooms = await Room.find();
        return res.json({ rooms });
    } catch (e) {
        return next(e);
    }
};

export const getOneRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        return res.json({ room });
    } catch (e) {
        return next(e);
    }
};

export const setNewRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newRoom = new Room(req.body);
        const savedRoom = await newRoom.save();
        return res.status(201).json({ room: savedRoom });
    } catch (e) {
        return next(e);
    }
};

export const updateRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }
        return res.json({ room: updatedRoom });
    } catch (e) {
        return next(e);
    }
};

export const deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedRoom = await Room.findByIdAndDelete(req.params.id);
        if (!deletedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }
        return res.json({ message: 'Room deleted successfully' });
    } catch (e) {
        return next(e);
    }
};
