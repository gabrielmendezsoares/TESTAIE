import { Prisma } from '@prisma/client';

export interface IUser {
  id: number;
  application_type: string;
  username: string;
  password: string;
  role_list: Prisma.JsonValue;
  is_user_active: boolean;
  created_at: Date;
  updated_at: Date;
}
