import { StudentModel } from '../models/StudentModel'
import { DelayModel } from '../models/DelayModel'
import { CRUD } from '../interfaces/CrudInterface';
import mongoose from "mongoose";

class DelayService implements CRUD {

    async getAll() {
        return DelayModel.find();
    }

    async getAllByStudent(studentId: any) {
        return DelayModel.find({owner: studentId}).populate('student').exec(); 
    }

    async getOneById(id: string) {
        return DelayModel.find({_id: id}).exec();
    }

    async create(newDelay: any) {
        console.log(newDelay)
        const userId = newDelay.userId
        const id = mongoose.Types.ObjectId();

        const delay = new DelayModel(newDelay);
        delay.owner = mongoose.Types.ObjectId(userId);
        delay.save();

        StudentModel.findOneAndUpdate({_id: userId}, {$push: {delays: delay._id}}).exec()
    }

    async deleteById(id: string) {
        return DelayModel.deleteOne({_id: id}).exec();
    }
}

export default new DelayService();