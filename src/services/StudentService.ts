import { StudentModel } from '../models/StudentModel'
import { CRUD } from '../interfaces/CrudInterface';
import mongoose from "mongoose";

class StudentService implements CRUD {

    async getAll() {
        return StudentModel.find();
    }

    async getOneById(id: string) {
        return StudentModel.find({_id: id}).exec();
    }

    async create(newStudent: any) {
        const id = mongoose.Types.ObjectId();
        const student = new StudentModel(newStudent);
        student.save();
    }

    async deleteById(id: string) {
        return StudentModel.deleteOne({_id: id}).exec();
    }

    async updateById(req: any) {
        return await StudentModel.findOneAndUpdate({_id: req.params.id}, req.body).exec();
    }
}

export default new StudentService();