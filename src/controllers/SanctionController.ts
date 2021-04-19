import express from 'express';
import SanctionService from '../services/SanctionService';

class SanctionController {
    async createSanction(req: express.Request, res: express.Response) {

        if (!req.body.motive || !req.body.type || !req.body.owner || !req.body.startDate || !req.body.duration) {
            res.status(400).json({
                success: false,
                message: "Une ou plusieurs données obligatoires sont manquantes",
            });
        }

        const sanction = await SanctionService.create(req.body);
        res.status(201).json({
            success: true,
            message: "Nouvelle sanction ajoutée",
            data: sanction
        });
    }

    async getAllSanctions(req: express.Request, res: express.Response) {
        const sanctions = await SanctionService.getAllByStudent(req.params.studentId);
        res.status(200).json({
            success: true, 
            message: "Liste des Sanctions", 
            data: sanctions
        });
    }

    async getSanctionById(req: express.Request, res: express.Response) {
        const sanction = await SanctionService.getOneById(req.params.id);
        res.status(200).json({
            success: true, 
            message: "Sanction ", 
            data: sanction
        });
    }

    async deleteSanctionById(req: express.Request, res: express.Response) {
        const sanction = await SanctionService.deleteById(req.params.sanctionId);
        res.status(200).json({
            success: true, 
            message: "sanction supprimée", 
            data: sanction
        });
    }

    async updateSanctionById(req: express.Request, res: express.Response) {
        const sanction = await SanctionService.updateById(req);
        res.status(200).json({
            success: true, 
            message: "sanction mise à jour", 
            data: sanction
        });
    }
}

export default new SanctionController();