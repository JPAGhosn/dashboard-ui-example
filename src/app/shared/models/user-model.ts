export interface User {
  id: string;
  fullName: string;
  email: string;
  lastLogin: Date | null;
  roles: string[];
}
