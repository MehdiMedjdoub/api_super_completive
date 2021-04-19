import { StudentModel } from '../models/StudentModel'
import { ResultModel } from '../models/ResultModel'
import { CRUD } from '../interfaces/CrudInterface';
import mongoose from "mongoose";

class ResultService implements CRUD {

    async getAll() {
        return ResultModel.find();
    }

    async getAllByStudent(studentId: any) {
        return ResultModel.find({owner: studentId}).populate('student').exec(); 
    }

    async getOneById(id: string) {
        return ResultModel.find({_id: id}).exec();
    }

    async create(req: any) {
        const userId = req.params.studentId
        const result = new ResultModel(req.body);

        result.owner = mongoose.Types.ObjectId(userId);
        result.save();

        StudentModel.findOneAndUpdate({_id: userId}, {$push: {absences: result._id}}).exec()
    }

    async deleteById(id: string) {
        return ResultModel.deleteOne({_id: id}).exec();
    }

    async updateById(req: any) {
        return await ResultModel.findOneAndUpdate({_id: req.params.resultId}, req.body).exec();
    }
}

export default new ResultService();