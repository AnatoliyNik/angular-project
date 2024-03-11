import { createFeature } from '@ngrx/store';
import { loginReducer } from '@store/reducers/login.reducer';

export const loginFeature = createFeature({
  name: 'login',
  reducer: loginReducer
});
