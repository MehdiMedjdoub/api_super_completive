import { CommonRoutesConfig } from './CommonRoutes';
import AttendanceController from '../controllers/AttendanceController';
import express from 'express';
import AuthJwt from '../middlewares/authJwt'

export class AttendancesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'AttendancesRoutes');
    }

    configureRoutes(): express.Application {    
        this.app
            .route(`/attendances/day`)
            .get(
                // AuthJwt.verifyToken, 
                AttendanceController.getAllAttendancesByDay);
    
                this.app
            .route(`/attendances`)
            .post(
                // AuthJwt.verifyToken, 
                AttendanceController.createAttendance);
        return this.app;
    }
}