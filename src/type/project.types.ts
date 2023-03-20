import { RowDataPacket } from 'mysql2';

export interface IProjectWithDatapacket extends RowDataPacket {
  id: number;
  name: string;
  description: string;
  user_id: number;
  image_url?: string;
  created_at: Date;
}
