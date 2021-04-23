import {NoteModel} from '../models/NoteModel'
import { CRUD } from '../interfaces/CrudInterface'
import { EmployeeModel } from '../models/EmployeeModel';
import mongoose from 'mongoose'

class NoteService implements CRUD {

    async getAll() {
        return NoteModel.find();
    }

    getOneById(id: string) {
        return NoteModel.find({_id: id}).exec();
    }

    getAllByOwner(id: string) {
        return NoteModel.find({owner: id}).exec();
    }

    async create(req: any) {
        const ConfigNote = req.body.configNote
        const ContentNote = req.body.contentNote

        const note = new NoteModel(ConfigNote);
        note.content = ContentNote
        note.owner = mongoose.Types.ObjectId(req.body.employeeId);
        note.save();

        EmployeeModel.findOneAndUpdate({_id: req.body.employeeId}, {$push: {notes: note._id }}).exec().then(user => {

        });
        return note
    }

    async deleteById(id: string) {
        return NoteModel.deleteOne({_id: id}).exec();
    }
}

export default new NoteService();