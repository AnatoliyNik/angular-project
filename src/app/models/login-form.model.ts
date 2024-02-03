import { FormControl } from '@angular/forms';

type loginFormFields = 'name' | 'password';

export type LoginForm = {
  [key in loginFormFields]: FormControl<string>
}
