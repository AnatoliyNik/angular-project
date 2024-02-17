import { FormControl } from '@angular/forms';

export interface HandleCourseForm {
  title: FormControl<string>;
  description: FormControl<string>;
  duration: FormControl<number>;
  creationDate: FormControl<Date | null>;
}
