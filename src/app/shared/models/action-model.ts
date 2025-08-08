import { User } from './user-model';

export interface Action {
  id: string;
  name: string;
  user: User;
  date: Date;
}
