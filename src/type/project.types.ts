import { RowDataPacket } from 'mysql2';

export interface IProjectWithDatapacket extends RowDataPacket {
  id: number;
  name: string;
  description: string;
  user_id?: number;
  image_url?: string;
  created_at: Date;
}

interface ITechnology {
  id: number;
  name: string;
}

export interface ITechnologyWithDatapacket extends RowDataPacket {
  id: number;
  name: string;
}

export interface IProject extends RowDataPacket {
  id: number;
  name: string;
  description: string;
  user_id?: number;
  image_url?: string;
  created_at: Date;
  technologies: ITechnology[];
}
