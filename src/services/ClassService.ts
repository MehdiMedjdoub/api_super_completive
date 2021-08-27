import { ClassModel } from '../models/ClassModel'

import { CRUD } from '../interfaces/CrudInterface';
import mongoose from "mongoose";

class ClassService implements CRUD {

    async getAll() {
        return ClassModel.find();
    }

    async getOneById(id: string) {
        return ClassModel.find({_id: id}).exec();
    }

    async create(newClass: any) {
        const id = mongoose.Types.ObjectId();
        const classType = new ClassModel(newClass);
        classType.save();
    }

    async deleteById(id: string) {
        return ClassModel.deleteOne({_id: id}).exec();
    }

    async updateById(req: any) {
        return await ClassModel.findOneAndUpdate({_id: req.params.id}, req.body).exec();
    }
}

export default new ClassService();