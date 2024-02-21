import { Name } from '@models/name.model';

export interface User {
  id: number;
  token: string,
  name: Name;
  login: string;
  password: string;
}
