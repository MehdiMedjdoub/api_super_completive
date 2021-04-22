import express from 'express';
import SpeakerService from '../services/SpeakerService';
import AuthService from '../services/AuthService';
import { exitOnError } from 'winston';

class SpeakerController {
    async createSpeaker(req: express.Request, res: express.Response) {

        const speaker = req.body
        console.log(speaker)
        if(
            !speaker.firstName || !speaker.lastName || !speaker.email || !speaker.phone ||
            !speaker.adress || !speaker.cp || !speaker.city || !speaker.siretNumber 
            )
            {
                res.status(400).json({
                    success: false, 
                    message: "Une ou plusieurs données obligatoires sont manquantes", 
                });
                return;
            }

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(speaker.email).toLowerCase())) {
            res.status(400).json({
                success: false, 
                message: "Le format de l'adresse email n'est pas valide", 
            });
            return;
        }

        if(isNaN(speaker.phone)) {
            res.status(400).json({
                success: false, 
                message: "Le numero de téléphone doit être une serie de chiffres", 
            });
            return
        }

        if(speaker.siretNumber.length != 14) {
            res.status(400).json({
                success: false, 
                message: "Le numero siret doit être une série de 14 chiffres", 
            });
            return;
        }

        const result = await AuthService.singUp(req, res);
        res.status(201).json({
            error: false,
            message: "Intervenant crée avec succès",
            data: result
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
                return;
            }

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(speaker.email).toLowerCase())) {
            res.status(400).json({
                success: false, 
                message: "Le format de l'adresse email n'est pas valide", 
            });
            return;
        }

        if(isNaN(speaker.phone)) {
            res.status(400).json({
                success: false, 
                message: "Le numero de téléphone doit être une serie de chiffres", 
            });
            return
        }

        if(speaker.siretNumber.length != 14) {
            res.status(400).json({
                success: false, 
                message: "Le numero siret doit être une série de 14 chiffres", 
            });
            return;
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