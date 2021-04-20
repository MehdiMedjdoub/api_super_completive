import { CommonRoutesConfig } from './CommonRoutes';
import EmployeeController from '../controllers/EmployeeController';
import express from 'express';
import AuthJwt from '../middlewares/authJwt'

export class EmployeesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'EmployeesRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/employees`)
            .post(AuthJwt.verifyToken, EmployeeController.createEmployee)
            .get(AuthJwt.verifyToken, EmployeeController.getAllEmployee);
    
        this.app
            .route(`/employees/:id`)
            .get(AuthJwt.verifyToken, EmployeeController.getEmployeeById)
            .delete(AuthJwt.verifyToken, EmployeeController.deleteEmployeeById)
            .put(AuthJwt.verifyToken, EmployeeController.updateEmployeeById);

        return this.app;
    }
}