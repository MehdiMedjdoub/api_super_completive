import { StudentModel } from '../models/StudentModel'
import { SanctionModel } from '../models/SanctionModel'
import { CRUD } from '../interfaces/CrudInterface';
import mongoose from "mongoose";

class SanctionService implements CRUD {

    async getAll() {
        return SanctionModel.find();
    }

    async getAllByStudent(studentId: any) {
        return SanctionModel.find({owner: studentId}).populate('student').exec(); 
    }

    async getOneById(id: string) {
        return SanctionModel.find({_id: id}).exec();
    }

    async create(newSanction: any) {
        const userId = newSanction.userId
        const id = mongoose.Types.ObjectId();
        const sanction = new SanctionModel(newSanction);

        sanction.owner = mongoose.Types.ObjectId(userId);
        sanction.save();

        StudentModel.findOneAndUpdate({_id: userId}, {$push: {absences: sanction._id}}).exec()
    }

    async deleteById(id: string) {
        return SanctionModel.deleteOne({_id: id}).exec();
    }
}

export default new SanctionService();