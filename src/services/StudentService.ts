import { StudentModel } from '../models/StudentModel'
import { CRUD } from '../interfaces/CrudInterface';
import mongoose from "mongoose";

class StudentService {

    async getAll(req: any, res:any) {
        return StudentModel.find();
    }

    async getAllPaginated(req: any, res:any) {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const startIndex = (page - 1) * limit
        const endIndex = page * limit 
        const lastPage = Math.ceil((await StudentModel.countDocuments().exec()) / limit)

        const result = {
            next: {},
            previous: {},
            results: {},
            lastPage: lastPage
        }

        if (endIndex < (await StudentModel.countDocuments().exec())) {
            result.next = {
                page: page + 1,
                limit: limit,
            }
        }

        if (startIndex > 0) {
            result.previous = {
                page: page - 1,
                limit: limit,
            }
        }

        try {
            result.results = await StudentModel.find().limit(limit).skip(startIndex);
            return result
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
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