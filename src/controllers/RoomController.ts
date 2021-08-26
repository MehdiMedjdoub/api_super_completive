import express from 'express';
import RoomService from '../services/RoomService';

class RoomController {
    async createRoom(req: express.Request, res: express.Response) {
        const room = await RoomService.create(req.body);
        //const student = await StudentService.create(req.body);
        res.status(201).json({
            success: true,
            message: "Salle ajouté avec succès",
            data: room
        });
    }

    async getAllRooms(req: express.Request, res: express.Response) {
        const rooms = await RoomService.getAll();
        res.status(200).json({
            success: true, 
            message: "Liste des Salles", 
            data: rooms
        });
    }

    async getRoomById(req: express.Request, res: express.Response) {
        const room = await RoomService.getOneById(req.params.id);

        if (room.length < 1) {
            res.status(404).json({
                success: false, 
                message: "Salle non trouvé", 
            });
        }

        res.status(200).json({
            success: true, 
            message: "Salle", 
            data: room
        });
    }

    async deleteRoomById(req: express.Request, res: express.Response) {
        await RoomService.deleteById(req.params.id);
        res.status(200).json({
            success: true, 
            message: "La salle a été supprimé",
        });
    }

    async updateRoomById(req: express.Request, res: express.Response) {
        const room = await RoomService.updateById(req);
        res.status(200).json({
            success: true, 
            message: "mise à jours de la salle effectuée avec succès", 
            data: room
        });
    }
}

export default new RoomController();