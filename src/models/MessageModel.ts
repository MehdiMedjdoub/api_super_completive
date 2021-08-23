import { ObjectId } from 'bson';
import { model, Schema, Model, Document } from 'mongoose';

interface IMessage extends Document {
    object: string;
    content: string;
    adminSender: string;
    adminRecipient: string;
    speakerSender: ObjectId;
    speakerRecipient: ObjectId;
    studentSender: ObjectId;
    studentRecipient: ObjectId;
    date: Date;
    status: string;
}

const MessageSchema: Schema = new Schema({
    object: { type: String, required: true },
    content: { type: String, required: true },
    adminSender: { type: String, required: false },
    adminRecipient: { type: String, required: false },
    speakerSender: {
        type: Schema.Types.ObjectId,
        ref: 'speaker'
    },
    speakerRecipient: {
        type: Schema.Types.ObjectId,
        ref: 'speaker'
    },
    studentSender: {
        type: Schema.Types.ObjectId,
        ref: 'student'
    },
    studentRecipient: {
        type: Schema.Types.ObjectId,
        ref: 'student'
    },
    date: { type: Date, required: true },
    status: { type: String, required: false },
});

export const MessageModel: Model<IMessage> = model('message', MessageSchema);