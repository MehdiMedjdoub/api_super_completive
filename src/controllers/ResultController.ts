import express from 'express';
import ResultService from '../services/ResultService';

class ResultController {
    async createResult(req: express.Request, res: express.Response) {
        const result = await ResultService.create(req);
        res.status(201).json({
            success: true,
            message: "Nouvelle note ajoutée",
            data: result
        });
    }

    async getAllResults(req: express.Request, res: express.Response) {
        const results = await ResultService.getAllByStudent(req.params.studentId);
        res.status(200).json({
            success: true, 
            message: "Liste des notes", 
            data: results
        });
    }

    async getResultById(req: express.Request, res: express.Response) {
        const result = await ResultService.getOneById(req.params.studentId);
        res.status(200).json({
            success: true, 
            message: "note", 
            data: result
        });
    }

    async deleteResultById(req: express.Request, res: express.Response) {
        const result = await ResultService.deleteById(req.params.studentId);
        res.status(200).json({
            success: true, 
            message: "la note a été supprimée", 
            data: result
        });
    }

    async updateResultById(req: express.Request, res: express.Response) {
        const delay = await ResultService.updateById(req);
        res.status(200).json({
            success: true, 
            message: "retard mis à jour", 
            data: delay
        });
    }
}

export default new ResultController();