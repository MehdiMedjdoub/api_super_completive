import express from 'express';
import SpeakerService from '../services/SpeakerService';
import AuthService from '../services/AuthService';

class SpeakerController {
    async createSpeaker(req: express.Request, res: express.Response) {
        const speaker = await AuthService.singUp(req, res);
        // const speaker = await SpeakerService.create(req.body);
        res.status(201).json({
            error: false,
            message: "Intervenant crée avec succès",
            data: speaker
        });
    }

    async getAllSpeakers(req: express.Request, res: express.Response) {
        const speakers = await SpeakerService.getAll();
        res.status(200).json({
            error: false, 
            message: "Liste des intervenants", 
            data: speakers
        });
    }

    async getSpeakerById(req: express.Request, res: express.Response) {
        const speaker = await SpeakerService.getOneById(req.params.id);
        res.status(200).json({
            error: false, 
            message: "profile de l'intervenant ", 
            data: speaker
        });
    }

    async deleteSpeakerById(req: express.Request, res: express.Response) {
        const speaker = await SpeakerService.deleteById(req.params.id);
        res.status(200).json({
            error: false, 
            message: "l'intervenant a été supprimé", 
            data: speaker
        });
    }

    async updateSpeakerById(req: express.Request, res: express.Response) {
        const speaker = await SpeakerService.updateById(req);
        res.status(200).json({
            success: true, 
            message: "mise à jours de l'intervenant effectuée avec succès", 
            data: speaker
        });
    }
}

export default new SpeakerController();