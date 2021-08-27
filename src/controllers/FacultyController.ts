import express from 'express';
import FacultyService from '../services/FacultyService';

class FacultyController {
    async createFaculty(req: express.Request, res: express.Response) {
        const faculty = await FacultyService.create(req.body);
        //const student = await StudentService.create(req.body);
        res.status(201).json({
            success: true,
            message: "Filière ajouté avec succès",
            data: faculty
        });
    }

    async getAllFaculties(req: express.Request, res: express.Response) {
        const faculties = await FacultyService.getAll();
        res.status(200).json({
            success: true, 
            message: "Liste des Filières", 
            data: faculties
        });
    }

    async getFacultyById(req: express.Request, res: express.Response) {
        const faculty = await FacultyService.getOneById(req.params.id);

        if (faculty.length < 1) {
            res.status(404).json({
                success: false, 
                message: "Filière non trouvé", 
            });
        }

        res.status(200).json({
            success: true, 
            message: "Filière", 
            data: faculty
        });
    }

    async deleteFacultyById(req: express.Request, res: express.Response) {
        await FacultyService.deleteById(req.params.id);
        res.status(200).json({
            success: true, 
            message: "La Filière a été supprimé",
        });
    }

    async updateFacultyById(req: express.Request, res: express.Response) {
        const faculty = await FacultyService.updateById(req);
        res.status(200).json({
            success: true, 
            message: "mise à jours de la Filière effectuée avec succès", 
            data: faculty
        });
    }
}

export default new FacultyController();