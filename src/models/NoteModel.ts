import { ObjectId } from 'bson';
import { model, Schema, Model, Document } from 'mongoose';

interface INote extends Document {
    content: string;
    margin: string;
    rotate: string;
    color: string;
    owner: ObjectId;
}

const NoteSchema: Schema = new Schema({
    content: { type: String, required: true },
    margin: { type: String, required: true },
    rotate: { type: String, required: true },
    color: { type: String, required: true },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'employee'
    },
});

export const NoteModel: Model<INote> = model('note', NoteSchema);