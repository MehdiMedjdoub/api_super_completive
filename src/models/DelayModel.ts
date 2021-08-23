import { ObjectId } from 'bson';
import { model, Schema, Model, Document } from 'mongoose';

interface IDelay extends Document {
    motive: string;
    isJustified: boolean;
    owner: ObjectId;
    date: Date;
}

const DelaySchema: Schema = new Schema({
    motive: { type: String, required: false },
    isJustified: { type: Boolean, required: false },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'student'
    },
    date: { type: Date, required: true }
});

export const DelayModel: Model<IDelay> = model('delay', DelaySchema);