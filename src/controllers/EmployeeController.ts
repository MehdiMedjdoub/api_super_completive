import express from 'express';
import EmployeeService from '../services/EmployeeService';
import AuthService from '../services/AuthService';


class EmployeeController {
    async createEmployee(req: express.Request, res: express.Response) {
        const employee = await AuthService.singUp(req, res);
        res.status(201).json({
            success: true,
            message: "Utilisateur crée avec succès",
            data: employee
        });
    }

    async getAllEmployee(req: express.Request, res: express.Response) {
        const employees = await EmployeeService.getAll();
        res.status(200).json({
            success: true, 
            message: "Liste de l'equipe administratif", 
            data: employees
        });
    }

    async getEmployeeById(req: express.Request, res: express.Response) {
        const employee = await EmployeeService.getOneById(req.params.id);
        console.log(employee)
        if (employee.length < 1) {
            res.status(404).json({
                success: false, 
                message: "utilisateur non trouvé", 
            });
        }

        res.status(200).json({
            success: true, 
            message: "profile de l'employé ", 
            data: employee
        });
    }

    async deleteEmployeeById(req: express.Request, res: express.Response) {
        const employe = await EmployeeService.deleteById(req.params.id);
        res.status(200).json({
            success: true, 
            message: "l'employé a été supprimé ", 
            data: employe
        });
    }

    async updateEmployeeById(req: express.Request, res: express.Response) {
        const employe = await EmployeeService.updateById(req);
        res.status(200).json({
            success: true, 
            message: "l'employé a été modifié ", 
            data: employe
        });
    }
}

export default new EmployeeController();