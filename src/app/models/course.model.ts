import { Author } from '@models/author.model';

export interface Course {
  id: string;
  title: string;
  creationDate: Date;
  duration: number;
  description: string;
  topRated: boolean;
  authors: Author[]
}
