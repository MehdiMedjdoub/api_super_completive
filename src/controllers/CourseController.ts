import express from 'express';
import CourseService from '../services/CourseService';

class CourseController {
    async createCourse(req: express.Request, res: express.Response) {
        const course = await CourseService.create(req.body);
        res.status(201).json({
            error: false,
            message: "Le cours a été crée avec succès",
            data: course
        });
    }

    async getAllCourses(req: express.Request, res: express.Response) {
        const courses = await CourseService.getAll();
        res.status(200).json({
            error: false, 
            message: "Liste des cours", 
            data: courses
        });
    }

    async deleteCourseById(req: express.Request, res: express.Response) {
        const course = await CourseService.deleteById(req.body);
        res.status(201).json({
            error: false,
            message: "Le cours a été supprimée",
            data: course
        });
    }
    // async getUserById(req: express.Request, res: express.Response) {
    //     const user = await UserService.getOneById('mehdi');
    //     res.status(200).send(user);
    // }
}

export default new CourseController();