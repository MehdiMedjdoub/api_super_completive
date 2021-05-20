import {PromoModel} from '../models/PromoModel'
import { CRUD } from '../interfaces/CrudInterface'
import mongoose from 'mongoose'

class PromoService implements CRUD {

    async getAll() {
        return PromoModel.find();
    }

    getOneById(firstName: string) {
        return PromoModel.find({firstName: firstName}).exec();
    }

    async create(newPromo: any) {
        const promo = new PromoModel(newPromo);
        promo.save();
    }

    async deleteById(id: string) {
        return PromoModel.deleteOne({_id: id}).exec();
    }

    // async putById(course: any) {
    //     return CourseModel.putUserById(id, resource);
    // }
}

export default new PromoService();