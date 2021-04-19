import express from 'express';
import EmployeeService from '../services/EmployeeService';
import AuthService from '../services/AuthService';


class EmployeeController {
    async createEmployee(req: express.Request, res: express.Response) {
        const employee = await AuthService.singUp(req.body);
        res.status(201).json({
            error: false,
            message: "Utilisateur crée avec succès",
            data: employee
        });
    }

    async getAllEmployee(req: express.Request, res: express.Response) {
        const employees = await EmployeeService.getAll();
        res.status(200).json({
            error: false, 
            message: "Liste de l'equipe administratif", 
            data: employees
        });
    }

    async getEmployeeById(req: express.Request, res: express.Response) {
        const employe = await EmployeeService.getOneById(req.params.id);
        res.status(200).json({
            error: false, 
            message: "profile de l'employé ", 
            data: employe
        });
    }

    async deleteEmployeeById(req: express.Request, res: express.Response) {
        const employe = await EmployeeService.deleteById(req.params.id);
        res.status(200).json({
            error: false, 
            message: "l'employé a été supprimé ", 
            data: employe
        });
    }

    async updateEmployeeById(req: express.Request, res: express.Response) {
        console.log(req)
        const employe = await EmployeeService.updateById(req.body);
        res.status(200).json({
            error: false, 
            message: "l'employé a été modifié ", 
            data: employe
        });
    }
}

export default new EmployeeController();