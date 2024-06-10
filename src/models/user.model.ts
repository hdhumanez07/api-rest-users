import { Schema, model, Model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: Number },
    birthday: { type: Date, required: true },
    city: {
      type: Schema.Types.ObjectId,
      ref: 'cities',
      required: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'departments',
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const UserModel: Model<IUser> = model('users', UserSchema);
export default UserModel;
