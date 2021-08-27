import { model, Schema, Model, Document, ObjectId } from 'mongoose';

interface IClass extends Document {
  name: string;
}

const ClassSchema: Schema = new Schema({
  name: { type: String, required: true }
});

export const ClassModel: Model<IClass> = model('class', ClassSchema);