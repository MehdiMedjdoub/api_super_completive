import { CommonRoutesConfig } from './CommonRoutes';
import AttendancesService from '../services/AttendanceService';
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
                AttendancesService.getAllByDay);
    
        return this.app;
    }
}