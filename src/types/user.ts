export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  area: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 
  | 'ADMIN'
  | 'MANAGER'
  | 'USER'
  | 'READONLY';