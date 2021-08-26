import { model, Schema, Model, Document, ObjectId } from 'mongoose';

interface IRoom extends Document {
  name: string;
}

const RoomSchema: Schema = new Schema({
  name: { type: String, required: true }
});

export const RoomModel: Model<IRoom> = model('room', RoomSchema);