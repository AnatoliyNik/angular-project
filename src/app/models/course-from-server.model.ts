import { Author } from '@models/author.model';

export interface CourseFromServer {
  id: number;
  name: string;
  date: string;
  length: number;
  description: string;
  isTopRated: boolean;
  authors: Author[];
}
