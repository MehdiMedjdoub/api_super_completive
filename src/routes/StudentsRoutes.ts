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
            .post(AuthJwt.verifyToken, StudentController.createStudent)
            .get(AuthJwt.verifyToken, StudentController.getAllStudent);
    
        this.app
            .route(`/students/:id`)
            .get(AuthJwt.verifyToken, StudentController.getStudentById)
            .delete(AuthJwt.verifyToken, StudentController.deleteStudentById)
            .put(AuthJwt.verifyToken, StudentController.updateStudentById);
                
        return this.app;
    }
}