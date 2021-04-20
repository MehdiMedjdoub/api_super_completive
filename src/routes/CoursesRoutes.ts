import { CommonRoutesConfig } from './CommonRoutes';
import CourseController from '../controllers/CourseController';
import express from 'express';
import AuthJwt from '../middlewares/authJwt'

export class CoursesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'CoursesRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/courses`)
            .post(AuthJwt.verifyToken, CourseController.createCourse)
            .get(AuthJwt.verifyToken, CourseController.getAllCourses);
        
        this.app
            .route(`/courses/:id`)
            .delete(AuthJwt.verifyToken, CourseController.deleteCourseById);
    
        return this.app;
    }
}