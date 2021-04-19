import { CommonRoutesConfig } from './CommonRoutes';
import StudentController from '../controllers/StudentController';
import express from 'express';
import AuthJwt from '../middlewares/authJwt'

export class StudentsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'StudentsRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/students`)
            .post(StudentController.createStudent)
            .get(
                // AuthJwt.verifyToken, 
                StudentController.getAllStudent);
    
        this.app
            .route(`/students/:id`)
            .get(StudentController.getStudentById)
            .delete(StudentController.deleteStudentById);
                
        return this.app;
    }
}