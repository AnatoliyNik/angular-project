import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  title = '';
  text = '';

  @Output()
  answer: EventEmitter<boolean> = new EventEmitter<boolean>();

  onAnswer(answer: boolean): void {
    this.answer.emit(answer);
  }
}
