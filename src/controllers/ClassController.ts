import express from 'express';
import ClassService from '../services/ClassService';

class ClassController {
    async createClass(req: express.Request, res: express.Response) {
        const classType = await ClassService.create(req.body);
        //const student = await StudentService.create(req.body);
        res.status(201).json({
            success: true,
            message: "Matière ajouté avec succès",
            data: classType
        });
    }

    async getAllClasses(req: express.Request, res: express.Response) {
        const classType = await ClassService.getAll();
        res.status(200).json({
            success: true, 
            message: "Liste des Matières", 
            data: classType
        });
    }

    async getClassById(req: express.Request, res: express.Response) {
        const classType = await ClassService.getOneById(req.params.id);

        if (classType.length < 1) {
            res.status(404).json({
                success: false, 
                message: "Matière non trouvé", 
            });
        }

        res.status(200).json({
            success: true, 
            message: "Matière", 
            data: classType
        });
    }

    async deleteClassById(req: express.Request, res: express.Response) {
        await ClassService.deleteById(req.params.id);
        res.status(200).json({
            success: true, 
            message: "La matière a été supprimé",
        });
    }

    async updateClassById(req: express.Request, res: express.Response) {
        const classType = await ClassService.updateById(req);
        res.status(200).json({
            success: true, 
            message: "mise à jours de la matière effectuée avec succès", 
            data: classType
        });
    }
}

export default new ClassController();