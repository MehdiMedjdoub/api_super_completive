import { SpeakerModel } from '../models/SpeakerModel'
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

    // async patchById(id: string, resource: PatchUserDto) {
    //     return UserModel.patchUserById(id, resource);
    // }

    async updateById(req: any) {
        return await SpeakerModel.findOneAndUpdate({_id: req.params.id}, req.body).exec();
    }

    // async getUserByEmail(email: string) {
    //     return UserModel.getUserByEmail(email);
    // }
}

export default new SpeakerService();