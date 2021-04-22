import { SubjectModel } from '../models/SubjectModel'
import { SpeakerModel } from '../models/SpeakerModel'

import { CRUD } from '../interfaces/CrudInterface';
import mongoose from "mongoose";

class SubjectService implements CRUD {

    async getAll() {
        return SubjectModel.find();
    }

    async getAllBySpeaker(speakerId: any) {

        const user = await SpeakerModel.findOne({_id: speakerId});
        
        // let userSubjects: any[] = []
        // let subject

        // user.subjects.forEach(async subjectId => {
        //     subject = await SubjectModel.findOne({_id: subjectId}).exec()
        //     userSubjects.push(subject)
        //     console.log(userSubjects)
        // });
        // console.log(userSubjects)

        let result = Promise.all(user.subjects.map(subjectId => {
            return SubjectModel.findOne({_id: subjectId}).exec()
        })).then(userSubjects => {
              return userSubjects
            // all found riders here
        }).catch(err => {
            // error here
        });

        return result;
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