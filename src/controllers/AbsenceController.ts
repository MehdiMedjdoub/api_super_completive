import express from 'express';
import AbsenceService from '../services/AbsenceService';

class AbsenceController {
    async createAbsence(req: express.Request, res: express.Response) {

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

        const absence = await AbsenceService.create(req.body);
        res.status(201).json({
            success: true,
            message: "Nouvelle absence ajoutée",
            data: absence
        });
    }

    async getAllAbsences(req: express.Request, res: express.Response) {
        const absences = await AbsenceService.getAllByStudent(req.params.studentId);
        res.status(200).json({
            success: true, 
            message: "Liste des absences", 
            data: absences
        });
    }

    async getAbsenceById(req: express.Request, res: express.Response) {
        const absence = await AbsenceService.getOneById(req.params.absenceId);
        res.status(200).json({
            success: true, 
            message: "profile de l'étudiant ", 
            data: absence
        });
    }

    async deleteAbsenceById(req: express.Request, res: express.Response) {
        const absence = await AbsenceService.deleteById(req.params.absenceId);
        res.status(200).json({
            success: true, 
            message: "absence supprimée", 
        });
    }

    async updateDelayById(req: express.Request, res: express.Response) {
        const delay = await AbsenceService.updateById(req);
        res.status(200).json({
            success: true, 
            message: "retard mis à jour", 
            data: delay
        });
    }
}

export default new AbsenceController();