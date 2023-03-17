import { Request } from 'express';
import { RowDataPacket } from 'mysql2';

export interface User {
  id: number;
  name: string;
  email: string;
  created_at?: Date;
}

export interface IUser extends RowDataPacket {
  id?: number;
  name: string;
  email: string;
  password?: string;
  created_at: Date;
}

export interface CustomRequestWithUser extends Request {
  user: User;
}
