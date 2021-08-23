import { SpeakerModel } from '../models/SpeakerModel'
import { SubjectModel } from '../models/SubjectModel'
import { CRUD } from '../interfaces/CrudInterface';
import mongoose from "mongoose";

class SpeakerService implements CRUD {

    async getAll() {
        return SpeakerModel.find();
    }

    async getOneById(id: string) {
        return SpeakerModel.find({_id: id}).exec();
    }

    async create(newSpeaker: any) {
        const id = mongoose.Types.ObjectId();
        const speaker = new SpeakerModel(newSpeaker);
        speaker.save();
    }

    async deleteById(id: string) {
        return SpeakerModel.deleteOne({_id: id}).exec();
    }

    async updateById(req: any) {
        const subjects = req.body.subjects

        let newSubject
        let subjectId

        await SpeakerModel.findOneAndUpdate({_id: req.body.speaker._id}, req.body.speaker).exec();
        await SpeakerModel.findOneAndUpdate({_id: req.body.speaker._id}, {$set: {subjects: []}}).exec();
        subjects.forEach(async (subject: any) => {
            newSubject = await SubjectModel.findOne({name: subject}).then(async data => {
                subjectId = data._id;
                await SpeakerModel.findOneAndUpdate({_id: req.body.speaker._id}, {$push: {subjects: subjectId}}).exec();
                await SubjectModel.findOneAndUpdate({_id: data._id}, {$push: {owners: req.body.speaker._id}}).exec();
            });
        });

        const speakerUpdated = await SpeakerModel.find({_id: req.body.speaker._id}).exec();
        return speakerUpdated
    }
}

export default new SpeakerService();