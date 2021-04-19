import express from 'express';
import StudentService from '../services/StudentService';
import AuthService from '../services/AuthService';
class StudentController {
    async createStudent(req: express.Request, res: express.Response) {
        const student = await AuthService.singUp(req, res);
        //const student = await StudentService.create(req.body);
        res.status(201).json({
            success: true,
            message: "Etudiant ajouté avec succès",
            data: student
        });
    }

    async getAllStudent(req: express.Request, res: express.Response) {
        const students = await StudentService.getAll();
        res.status(200).json({
            success: true, 
            message: "Liste des étudiants", 
            data: students
        });
    }

    async getStudentById(req: express.Request, res: express.Response) {
        const student = await StudentService.getOneById(req.params.id);

        if (student.length < 1) {
            res.status(404).json({
                success: false, 
                message: "Etudiant non trouvé", 
            });
        }

        res.status(200).json({
            success: true, 
            message: "profile de l'étudiant ", 
            data: student
        });
    }

    async deleteStudentById(req: express.Request, res: express.Response) {
        await StudentService.deleteById(req.params.id);
        res.status(200).json({
            success: true, 
            message: "L'étudiant a été supprimé",
        });
    }

    async updateStudentById(req: express.Request, res: express.Response) {
        const student = await StudentService.updateById(req);
        res.status(200).json({
            success: true, 
            message: "mise à jours de l'étudiant effectuée avec succès", 
            data: student
        });
    }
}

export default new StudentController();