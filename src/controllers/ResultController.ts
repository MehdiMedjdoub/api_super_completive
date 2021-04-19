import express from 'express';
import ResultService from '../services/ResultService';

class ResultController {
    async createResult(req: express.Request, res: express.Response) {
        const result = await ResultService.create(req.body);
        res.status(201).json({
            error: false,
            message: "Nouvelle note ajoutée",
            data: result
        });
    }

    async getAllResults(req: express.Request, res: express.Response) {
        const results = await ResultService.getAllByStudent(req.params.studentId);
        res.status(200).json({
            error: false, 
            message: "Liste des notes", 
            data: results
        });
    }

    async getResultById(req: express.Request, res: express.Response) {
        const result = await ResultService.getOneById(req.params.id);
        res.status(200).json({
            error: false, 
            message: "note", 
            data: result
        });
    }

    async deleteResultById(req: express.Request, res: express.Response) {
        const result = await ResultService.deleteById(req.params.id);
        res.status(200).json({
            error: false, 
            message: "la note a été supprimée", 
            data: result
        });
    }
}

export default new ResultController();