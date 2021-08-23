import { EmployeeModel } from '../models/EmployeeModel'
import { CRUD } from '../interfaces/CrudInterface';
import mongoose from "mongoose";

class EmployeeService implements CRUD {

    async getAll() {
        //return await EmployeeModel.paginate().then(result => console.log(result));
        return await EmployeeModel.find();
    }

    async getOneById(id: string) {
        return await EmployeeModel.find({_id: id}).exec();
    }

    async create(newEmployee: any) {
        const employee = new EmployeeModel(newEmployee);
        employee.save();
    }

    async deleteById(id: string) {
        return EmployeeModel.deleteOne({_id: id}).exec();
    }

    async updateById(req: any) {
        return await EmployeeModel.findOneAndUpdate({_id: req.params.id}, req.body).exec();
    }
}

export default new EmployeeService();