import { SubjectModel } from '../models/SubjectModel'
import { CRUD } from '../interfaces/CrudInterface';
import mongoose from "mongoose";

class SubjectService implements CRUD {

    async getAll() {
        return SubjectModel.find();
    }

    async getOneById(id: string) {
        return SubjectModel.find({_id: id}).exec();
    }

    async create(newSubject: any) {
        const id = mongoose.Types.ObjectId();
        const subject = new SubjectModel(newSubject);
        subject.save();
    }

    async deleteById(id: string) {
        return SubjectModel.deleteOne({_id: id}).exec();
    }

    async updateById(req: any) {
        return await SubjectModel.findOneAndUpdate({_id: req.params.id}, req.body).exec();
    }
}

export default new SubjectService();