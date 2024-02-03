import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  readonly okButtonText = 'Ok';
  readonly cancelButtonText = 'Cancel';

  title = '';
  text = '';

  @Output()
  answer: EventEmitter<boolean> = new EventEmitter<boolean>();

  onAnswer(answer: boolean): void {
    this.answer.emit(answer);
  }
}
