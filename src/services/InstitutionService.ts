import { InstitutionModel } from '../models/InstitutionModel'
import { CRUD } from '../interfaces/CrudInterface';
import mongoose from "mongoose";

class InstitutionService implements CRUD {

    async getAll() {
        return await InstitutionModel.find();
    }

    async getOneById(id: string) {
        return await InstitutionModel.find({_id: id}).exec();
    }

    async create(newInstitution: any) {
        const institution = new InstitutionModel(newInstitution);
        institution.save();
    }

    async deleteById(id: string) {
        return InstitutionModel.deleteOne({_id: id}).exec();
    }

    async updateById(req: any) {
        return await InstitutionModel.findOneAndUpdate({_id: req.params.id}, req.body).exec();
    }
}

export default new InstitutionService();