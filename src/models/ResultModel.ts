import { ObjectId } from 'bson';
import { model, Schema, Model, Document } from 'mongoose';

interface IResult extends Document {
    // class: string;
    // faculty: string;
    subject: string;
    date: Date;
    note: number;
    coef: number;
    observation: string;
    owner: ObjectId;
}

const ResultSchema: Schema = new Schema({
    // class: { type: String, required: true },
    // faculty: { type: String, required: true },
    subject: { type: String, required: true },
    date: { type: Date, required: true },
    note: { type: Number, required: true },
    coef: { type: Number, required: true },
    observation: { type: String, required: false },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'student'
    },
});

export const ResultModel: Model<IResult> = model('result', ResultSchema);