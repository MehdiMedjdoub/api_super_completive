import { model, Schema, Model, Document } from 'mongoose';

interface IStudent extends Document {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    password:string;
    phone: string;
    adress: string;
    cp: string;
    city: string;
    faculty: string;
    class: string;
    promo: string;
    absences:[];
    delays:[];
    sanctions:[];
    results:[];
    firstLogin: Boolean;
    haveAvatar: Boolean;
    avatar: string;
}

const StudentSchema: Schema = new Schema({
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: false },
    password: { type: String, required: false },
    phone: { type: String, required: true },
    adress: { type: String, required: true },
    cp: { type: String, required: true },
    city: { type: String, required: true },
    faculty: { type: String, required: false },
    class: { type: String, required: false },
    promo: { type: String, required: false },
    absences: [
        {
        type: Schema.Types.ObjectId,
        ref: "absence"
        }
    ],
    delays: [
        {
        type: Schema.Types.ObjectId,
        ref: "delay"
        }
    ],
    sanctions: [
        {
        type: Schema.Types.ObjectId,
        ref: "sanction"
        }
    ],
    results: [
        {
        type: Schema.Types.ObjectId,
        ref: "result"
        }
    ],
    firstLogin: { type: Boolean, required: false },
    haveAvatar: { type: Boolean, required: false },
    avatar: { type: String, required: false },
});

export const StudentModel: Model<IStudent> = model('student', StudentSchema);