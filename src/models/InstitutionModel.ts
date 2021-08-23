import { model, Schema, Model, Document, ObjectId } from 'mongoose';

interface IInstitution extends Document {
    name: string;
    type: string;
    principal: ObjectId;
    phone: string;
    adress: string;
    complAdress: string;
    cp: string;
    city: string;
}

const InstitutionSchema: Schema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    phone: { type: String, required: true },
    adress: { type: String, required: true },
    complAdress: { type: String, required: false },
    cp: { type: String, required: true },
    city: { type: String, required: true },
    principal: {
        type: Schema.Types.ObjectId,
        ref: 'employee'
    }
});

export const InstitutionModel: Model<IInstitution> = model('institution', InstitutionSchema);