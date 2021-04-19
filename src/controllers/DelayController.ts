import express from 'express';
import DelayService from '../services/DelayService';

class DelayController {
    async createDelay(req: express.Request, res: express.Response) {
        const delay = await DelayService.create(req.body);
        res.status(201).json({
            error: false,
            message: "Nouveau retard ajoutée",
            data: delay
        });
    }

    async getAllDelays(req: express.Request, res: express.Response) {
        const delays = await DelayService.getAllByStudent(req.params.studentId);
        res.status(200).json({
            error: false, 
            message: "Liste des retards", 
            data: delays
        });
    }

    async getDelayById(req: express.Request, res: express.Response) {
        const delay = await DelayService.getOneById(req.params.id);
        res.status(200).json({
            error: false, 
            message: "retard ", 
            data: delay
        });
    }

    async deleteDelayById(req: express.Request, res: express.Response) {
        const delay = await DelayService.deleteById(req.params.delayId);
        res.status(200).json({
            error: false, 
            message: "retard supprimé", 
            data: delay
        });
    }
}

export default new DelayController();