
import express from 'express';
import SalleService from '../services/SalleService';

class SalleController {
    async createSalle(req: express.Request, res: express.Response) {
        const salle = await SalleService.create(req.body);
        res.status(201).json({
            error: false,
            message: "La salle a été ajoutée avec succès",
            data: salle
        });
    }

    async getAllSalles(req: express.Request, res: express.Response) {
        const salles = await SalleService.getAll();
        res.status(200).json({
            error: false, 
            message: "Liste des cours", 
            data: salles
        });
    }

    async deleteSalleById(req: express.Request, res: express.Response) {
        const salle = await SalleService.deleteById(req.body);
        res.status(201).json({
            error: false,
            message: "La salle a été supprimée",
            data: salle
        });
    }
    // async getUserById(req: express.Request, res: express.Response) {
    //     const user = await UserService.getOneById('mehdi');
    //     res.status(200).send(user);
    // }
}

export default new SalleController();