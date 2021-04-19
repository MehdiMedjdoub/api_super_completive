import express from 'express';
import StudentService from '../services/StudentService';

class StudentController {
    async createStudent(req: express.Request, res: express.Response) {
        const student = await StudentService.create(req.body);
        res.status(201).json({
            error: false,
            message: "Utilisateur crée avec succès",
            data: student
        });
    }

    async getAllStudent(req: express.Request, res: express.Response) {
        const students = await StudentService.getAll();
        res.status(200).json({
            error: false, 
            message: "Liste des étudiants", 
            data: students
        });
    }

    async getStudentById(req: express.Request, res: express.Response) {
        const student = await StudentService.getOneById(req.params.id);
        res.status(200).json({
            error: false, 
            message: "profile de l'étudiant ", 
            data: student
        });
    }

    async deleteStudentById(req: express.Request, res: express.Response) {
        const student = await StudentService.deleteById(req.params.id);
        res.status(200).json({
            error: false, 
            message: "L'étudiant a été supprimé", 
            data: student
        });
    }
}

export default new StudentController();