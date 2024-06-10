import { IAuth } from './auth.interface';
import { Types } from 'mongoose';

export interface IUser extends IAuth {
  fullName: string;
  phone: number;
  address: string;
  birthday: Date;
  city: typeof Types.ObjectId;
  department: typeof Types.ObjectId;
}
