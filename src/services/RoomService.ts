import { CRUD } from '../interfaces/CrudInterface';
import { RoomModel } from '../models/RoomModel';

class RoomService implements CRUD {

    async getAll() {
        return RoomModel.find();
    }

    async getOneById(id: string) {
        return RoomModel.find({_id: id}).exec();
    }

    async create(newRoom: any) {
        const room = new RoomModel(newRoom);
        room.save();
    }

    async deleteById(id: string) {
        return RoomModel.deleteOne({_id: id}).exec();
    }

    async updateById(req: any) {
        return await RoomModel.findOneAndUpdate({_id: req.params.id}, req.body).exec();
    }
}

export default new RoomService();