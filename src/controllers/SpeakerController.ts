import express from 'express';
import SpeakerService from '../services/SpeakerService';
import AuthService from '../services/AuthService';

class SpeakerController {
    async createSpeaker(req: express.Request, res: express.Response) {

        const speaker = await AuthService.singUp(req, res);
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
        
        const speaker = req.body.speaker

        if(
            !speaker.firstName || !speaker.lastName || !speaker.email || !speaker.phone ||
            !speaker.adress || !speaker.cp || !speaker.city || !speaker.siretNumber 
            )
            {
                res.status(400).json({
                    success: false, 
                    message: "Une ou plusieurs données obligatoires sont manquantes", 
                });
            }

        if(speaker.siretNumber.length != 14) {
            res.status(400).json({
                success: false, 
                message: "Le numero siret doit être une série de 14 chiffres", 
            });
        }

        if(isNaN(speaker.phone)) {
            res.status(400).json({
                success: false, 
                message: "Le numero de téléphone doit être une serie de chiffres", 
            });
        }

        const result = await SpeakerService.updateById(req);
        res.status(200).json({
            success: true, 
            message: "mise à jours de l'intervenant effectuée avec succès", 
            data: result
        });
    }
}

export default new SpeakerController();