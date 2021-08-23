import express from 'express';
import InstitutionService from '../services/InstitutionService';

class InstitutionController {
    async createInstitution(req: express.Request, res: express.Response) {
        const institution = await InstitutionService.create(req.body);
        res.status(201).json({
            error: false,
            message: "L'établissement a été crée avec succès",
            data: institution
        });
    }

    async getAllInstitution(req: express.Request, res: express.Response) {
        const institutions = await InstitutionService.getAll();
        res.status(200).json({
            success: true, 
            message: "Liste des établissements", 
            data: institutions
        });
    }

    async getInstitutionById(req: express.Request, res: express.Response) {
        const institution = await InstitutionService.getOneById(req.params.id);

        if (institution.length < 1) {
            res.status(404).json({
                success: false, 
                message: "établissement non trouvé", 
            });
        }

        res.status(200).json({
            success: true, 
            message: "informations de l'établissement", 
            data: institution
        });
    }

    async deleteInstitutionById(req: express.Request, res: express.Response) {
        const institution = await InstitutionService.deleteById(req.params.id);
        res.status(200).json({
            success: true, 
            message: "l'établissement a été supprimé ", 
            data: institution
        });
    }

    async updateInstitutionById(req: express.Request, res: express.Response) {
        const institution = await InstitutionService.updateById(req);
        res.status(200).json({
            success: true, 
            message: "l'établissement a été modifié ", 
            data: institution
        });
    }
}

export default new InstitutionController();