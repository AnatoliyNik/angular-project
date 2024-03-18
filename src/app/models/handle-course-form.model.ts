import { FormControl } from '@angular/forms';
import { Author } from '@models/author.model';

export interface HandleCourseForm {
  title: FormControl<string>;
  description: FormControl<string>;
  duration: FormControl<number>;
  creationDate: FormControl<Date | null>;
  authors: FormControl<Author[]>;
}
