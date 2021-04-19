import express from 'express';
import DelayService from '../services/DelayService';

class DelayController {
    async createDelay(req: express.Request, res: express.Response) {

        if(!req.body.date) {
            res.status(400).send({
                success: false,
                message: "une date est requise pour ajouter un retard"
            })
            return;
        }

        if(req.body.isJustified) {
            if(!req.body.motive) {
                res.status(400).json({
                    success: false, 
                    message: "un motif est requis si un retard est justifié"
                });
            }
        }

        const delay = await DelayService.create(req);
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
        const delay = await DelayService.getOneById(req.params.delayId);
        res.status(200).json({
            error: false, 
            message: "retard", 
            data: delay
        });
    }

    async deleteDelayById(req: express.Request, res: express.Response) {
        const delay = await DelayService.deleteById(req.params.delayId);
        res.status(200).json({
            error: false, 
            message: "retard supprimé"
        });
    }

    async updateDelayById(req: express.Request, res: express.Response) {
        return await DelayService.updateById(req, res);
        // res.status(200).json({
        //     error: false, 
        //     message: "retard mis à jour", 
        //     data: delay
        // });
    }
}

export default new DelayController();