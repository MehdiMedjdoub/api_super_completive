import { model, Schema, Model, Document } from 'mongoose';

interface IRole extends Document {
  name: string;
}

const RoleSchema: Schema = new Schema({
  name: { type: String, required: true },
});

export const RoleModel: Model<IRole> = model('role', RoleSchema);