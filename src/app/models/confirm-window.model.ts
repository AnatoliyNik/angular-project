import { Observable, Subject } from 'rxjs';

export interface ConfirmWindow {
  title: string;
  text: string;
  result$: Subject<Observable<boolean>>;
}
