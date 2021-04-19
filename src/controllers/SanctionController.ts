import express from 'express';
import SanctionService from '../services/SanctionService';

class SanctionController {
    async createAbsence(req: express.Request, res: express.Response) {
        const sanction = await SanctionService.create(req.body);
        res.status(201).json({
            error: false,
            message: "Nouvelle sanction ajoutée",
            data: sanction
        });
    }

    async getAllSanctions(req: express.Request, res: express.Response) {
        const sanctions = await SanctionService.getAllByStudent(req.params.studentId);
        res.status(200).json({
            error: false, 
            message: "Liste des Sanctions", 
            data: sanctions
        });
    }

    async getSanctionById(req: express.Request, res: express.Response) {
        const sanction = await SanctionService.getOneById(req.params.id);
        res.status(200).json({
            error: false, 
            message: "Sanction ", 
            data: sanction
        });
    }

    async deleteSanctionById(req: express.Request, res: express.Response) {
        const sanction = await SanctionService.deleteById(req.params.sanctionId);
        res.status(200).json({
            error: false, 
            message: "sanction supprimée", 
            data: sanction
        });
    }
}

export default new SanctionController();