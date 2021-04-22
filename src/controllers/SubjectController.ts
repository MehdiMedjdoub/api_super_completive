import express from 'express';
import SubjectService from '../services/StudentService';

class SubjectController {
    async createSubject(req: express.Request, res: express.Response) {
        const subject = await SubjectService.create(req.body);
        //const student = await StudentService.create(req.body);
        res.status(201).json({
            success: true,
            message: "Matière ajouté avec succès",
            data: subject
        });
    }

    async getAllSubjects(req: express.Request, res: express.Response) {
        const students = await SubjectService.getAll();
        res.status(200).json({
            success: true, 
            message: "Liste des Matières", 
            data: students
        });
    }

    async getSubjectById(req: express.Request, res: express.Response) {
        const subject = await SubjectService.getOneById(req.params.id);

        if (subject.length < 1) {
            res.status(404).json({
                success: false, 
                message: "Matière non trouvé", 
            });
        }

        res.status(200).json({
            success: true, 
            message: "Matière", 
            data: subject
        });
    }

    async deleteSubjectById(req: express.Request, res: express.Response) {
        await SubjectService.deleteById(req.params.id);
        res.status(200).json({
            success: true, 
            message: "La matière a été supprimé",
        });
    }

    async updateSubjectById(req: express.Request, res: express.Response) {
        const student = await SubjectService.updateById(req);
        res.status(200).json({
            success: true, 
            message: "mise à jours de la matière effectuée avec succès", 
            data: student
        });
    }
}

export default new SubjectController();