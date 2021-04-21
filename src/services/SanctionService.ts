import { StudentModel } from '../models/StudentModel'
import { SanctionModel } from '../models/SanctionModel'
import { CRUD } from '../interfaces/CrudInterface';
import mongoose from "mongoose";

class SanctionService implements CRUD {

    async getAll() {
        return SanctionModel.find();
    }

    async getAllByStudent(studentId: any) {
        const sanctions = await SanctionModel.find({owner: studentId}).populate('student').exec(); 
        const result = []
        result.push(studentId);
        result.push(sanctions)
        return result;
    }

    async getOneById(id: string) {
        return SanctionModel.find({_id: id}).exec();
    }

    async create(req: any) {
        const userId = req.params.studentId
        const sanction = new SanctionModel(req.body);

        sanction.owner = mongoose.Types.ObjectId(userId);
        sanction.save();

        StudentModel.findOneAndUpdate({_id: userId}, {$push: {absences: sanction._id}}).exec()
    }

    async deleteById(id: string) {
        return SanctionModel.deleteOne({_id: id}).exec();
    }

    async updateById(req: any) {
        return await SanctionModel.findOneAndUpdate({_id: req.params.sanctionId}, req.body).exec();
    }
}

export default new SanctionService();