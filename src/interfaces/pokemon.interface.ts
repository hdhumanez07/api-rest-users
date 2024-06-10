import { Types } from 'mongoose';

export interface IPokemon {
  name: string;
  url: string;
  user: typeof Types.ObjectId;
}
