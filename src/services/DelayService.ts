import { StudentModel } from '../models/StudentModel'
import { DelayModel } from '../models/DelayModel'
import { CRUD } from '../interfaces/CrudInterface';
import mongoose from "mongoose";

class DelayService implements CRUD {

    async getAll() {
        return DelayModel.find();
    }

    async getAllByStudent(studentId: any) {
        const delays = await DelayModel.find({owner: studentId}).populate('student').exec(); 
        const result = []
        result.push(studentId);
        result.push(delays)
        return result;
    }

    async getOneById(id: string) {
        return DelayModel.find({_id: id}).exec();
    }

    async create(req: any) {
        const userId = req.params.studentId
        const delay = new DelayModel(req.body);
        
        delay.owner = mongoose.Types.ObjectId(userId);
        if(!req.body.isJustified) {
            delay.isJustified = false
        }
        delay.save();

        StudentModel.findOneAndUpdate({_id: userId}, {$push: {delays: delay._id}}).exec()
    }

    async deleteById(id: string) {
        return DelayModel.deleteOne({_id: id}).exec();
    }

    async updateById(req: any) {
        return await DelayModel.findOneAndUpdate({_id: req.params.delayId}, req.body).exec();
    }
}

export default new DelayService();