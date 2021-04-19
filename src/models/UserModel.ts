import { model, Schema, Model, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
});

export const UserModel: Model<IUser> = model('user', UserSchema);