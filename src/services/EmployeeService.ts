import { EmployeeModel } from '../models/EmployeeModel'
import { CRUD } from '../interfaces/CrudInterface';
import mongoose from "mongoose";

class EmployeeService implements CRUD {

    async getAll() {
        //return await EmployeeModel.paginate().then(result => console.log(result));
        return await EmployeeModel.find();
    }

    async getOneById(id: string) {
        return EmployeeModel.find({_id: id}).exec();
    }

    async create(newEmployee: any) {
        const employee = new EmployeeModel(newEmployee);
        employee.save();
    }

    async deleteById(id: string) {
        return EmployeeModel.deleteOne({_id: id}).exec();
    }

    async updateById(employee: any) {
        return EmployeeModel.findOneAndUpdate({_id: employee._id}, employee).exec();
    }
}

export default new EmployeeService();