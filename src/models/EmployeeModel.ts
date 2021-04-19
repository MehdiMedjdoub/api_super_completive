import { PaginateModel, model, Schema, Model, Document } from 'mongoose';
//import mongoosePaginate from 'mongoose-paginate-v2';

interface IEmployee extends Document {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    phone: string;
    adress: string;
    complAdress: string;
    cp: string;
    city: string;
    function: string;
    roles: [];
    identifiant: string;
    poste: string;
    firstLogin: Boolean;
}

const EmployeeSchema: Schema = new Schema({
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: false },
    password: { type: String, required: false },
    phone: { type: String, required: true },
    adress: { type: String, required: true },
    complAdress: { type: String, required: false },
    cp: { type: String, required: true },
    city: { type: String, required: true },
    function: { type: String, required: false },
    roles: [
        {
        type: Schema.Types.ObjectId,
        ref: "role"
        }
    ],
    identifiant: { type: String, required: false },
    poste: { type: String, required: false },
    firstLogin: { type: Boolean, required: false }
});

// EmployeeSchema.plugin(mongoosePaginate);

// interface EmployeeModel<T extends Document> extends PaginateModel<T> {}
 
export const EmployeeModel: Model<IEmployee> = model('employee', EmployeeSchema);