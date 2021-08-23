import {UserModel} from '../models/UserModel'
import { CRUD } from '../interfaces/CrudInterface';

class UserService implements CRUD {

    async getAll() {
        return UserModel.find();
    }

    getOneById(firstName: string) {
        return UserModel.find({firstName: firstName}).exec();
    }

    async create(resource: any) {
        // return UserModel.addUser(resource);
    }

    async deleteById(id: string) {
        //return UserModel.removeUserById(id);
    }

    // async patchById(id: string, resource: PatchUserDto) {
    //     return UserModel.patchUserById(id, resource);
    // }

    // async putById(id: string, resource: PutUserDto) {
    //     return UserModel.putUserById(id, resource);
    // }
}

export default new UserService();