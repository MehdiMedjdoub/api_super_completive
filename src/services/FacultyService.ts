import { FacultyModel } from '../models/FacultyModel'

import { CRUD } from '../interfaces/CrudInterface';
import mongoose from "mongoose";

class FacultyService implements CRUD {

    async getAll() {
        return FacultyModel.find();
    }

    async getOneById(id: string) {
        return FacultyModel.find({_id: id}).exec();
    }

    async create(newClass: any) {
        const id = mongoose.Types.ObjectId();
        const faculty = new FacultyModel(newClass);
        faculty.save();
    }

    async deleteById(id: string) {
        return FacultyModel.deleteOne({_id: id}).exec();
    }

    async updateById(req: any) {
        return await FacultyModel.findOneAndUpdate({_id: req.params.id}, req.body).exec();
    }
}

export default new FacultyService();