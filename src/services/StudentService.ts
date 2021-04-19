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
        //return AbsenceModel.deleteOne({_id: id}).exec();
    }

    // async patchById(id: string, resource: PatchUserDto) {
    //     return UserModel.patchUserById(id, resource);
    // }

    // async putById(id: string, resource: PutUserDto) {
    //     return UserModel.putUserById(id, resource);
    // }
}

export default new StudentService();