import express from 'express';
import AbsenceService from '../services/AbsenceService';

class AbsenceController {
    async createAbsence(req: express.Request, res: express.Response) {
        const absence = await AbsenceService.create(req.body);
        res.status(201).json({
            error: false,
            message: "Nouvelle absence ajoutée",
            data: absence
        });
    }

    async getAllAbsences(req: express.Request, res: express.Response) {
        const absences = await AbsenceService.getAllByStudent(req.params.studentId);
        res.status(200).json({
            error: false, 
            message: "Liste des absences", 
            data: absences
        });
    }

    async getAbsenceById(req: express.Request, res: express.Response) {
        console.log(req)
        const absence = await AbsenceService.getOneById(req.params.absenceId);
        res.status(200).json({
            error: false, 
            message: "profile de l'étudiant ", 
            data: absence
        });
    }

    async deleteAbsenceById(req: express.Request, res: express.Response) {
        const absence = await AbsenceService.deleteById(req.params.absenceId);
        res.status(200).json({
            error: false, 
            message: "absence supprimée", 
            data: absence
        });
    }
}

export default new AbsenceController();