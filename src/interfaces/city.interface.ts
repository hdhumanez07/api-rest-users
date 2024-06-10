import { Types } from 'mongoose';

export interface ICity {
  name: string;
  department: typeof Types.ObjectId;
}
