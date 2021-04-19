import { StudentModel } from '../models/StudentModel'
import { ResultModel } from '../models/ResultModel'
import { CRUD } from '../interfaces/CrudInterface';
import mongoose from "mongoose";

class ResultService implements CRUD {

    async getAll() {
        return ResultModel.find();
    }

    async getAllByStudent(studentId: any) {
        // return StudentModel.find({_id: studentId}).populate('absence').exec();
        return ResultModel.find({owner: studentId}).populate('student').exec(); 
    }

    async getOneById(id: string) {
        return ResultModel.find({_id: id}).exec();
    }

    async create(newResult: any) {

        const userId = newResult.userId
        const id = mongoose.Types.ObjectId();

        const result = new ResultModel(newResult);
        result.owner = mongoose.Types.ObjectId(userId);
        result.save();

        StudentModel.findOneAndUpdate({_id: userId}, {$push: {absences: result._id}}).exec()
    }

    async deleteById(id: string) {
        return ResultModel.deleteOne({_id: id}).exec();
    }
}

export default new ResultService();