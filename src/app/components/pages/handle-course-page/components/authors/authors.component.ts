import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  Input,
  signal,
  Signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Author } from '@models/author.model';
import { OnChangeFn } from '@models/on-change-fn.model';
import { OnTouchedFn } from '@models/on-touched-fn.model';
import { Store } from '@ngrx/store';
import { coursesFeature } from '@store/features/courses-page.feature';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption
} from '@angular/material/autocomplete';
import { appearance } from '@animations/appearance.animation';
import { provideNgValueAccessor } from '@providers/ng-value-accessor.provider';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger,
  ],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideNgValueAccessor(AuthorsComponent),
  ],
  animations: [appearance]
})
export class AuthorsComponent implements ControlValueAccessor {
  private store: Store = inject(Store);

  onChange!: OnChangeFn;
  onTouched!: OnTouchedFn;
  isDisabled = false;
  isDisplayAuthors = true;

  findAuthorText: WritableSignal<string> = signal<string>('');
  courseAuthors: WritableSignal<Author[]> = signal<Author[]>([]);
  allAuthors: Signal<Author[]> = this.store.selectSignal(coursesFeature.selectAuthors);

  filteredAuthors: Signal<Author[]> = computed(() =>
    this.allAuthors()
      .filter((author) =>
        !this.courseAuthors().some((currentAuthor) => currentAuthor.id === author.id)
      )
      .filter((author) => author.name.toLowerCase().includes(this.findAuthorText().toLowerCase()))
  );

  @Input()
  placeholder = '';

  @ViewChild('input')
  input!: ElementRef<HTMLInputElement>;

  writeValue(authors: Author[]): void {
    this.courseAuthors.set(authors);
  }

  registerOnChange(fn: OnChangeFn): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedFn): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onInput(): void {
    const inputData: string = this.input.nativeElement.value;

    this.findAuthorText.set(inputData);
    this.isDisplayAuthors = false;
  }

  onBlur(): void {
    this.onTouched();
    this.isDisplayAuthors = true;
  }

  onSelectAuthor(event: MatAutocompleteSelectedEvent): void {
    const authors: Author[] = [...this.courseAuthors(), event.option.value];

    this.courseAuthors.set(authors);
    this.onChange(this.courseAuthors());
    this.input.nativeElement.value = '';
    this.findAuthorText.set('');
    this.isDisplayAuthors = true;
  }

  deleteAuthor(event: MouseEvent, id: string): void {
    event.stopPropagation();
    event.preventDefault();

    if (event.button === 1) {
      event.target?.dispatchEvent(new Event('focusout', {bubbles: true}));
    }

    const authors: Author[] = this.courseAuthors().filter((author) => author.id !== id);

    this.courseAuthors.set(authors);
    this.onChange(this.courseAuthors());
    this.onTouched();
  }

  hideAuthor(): void {
    this.input.nativeElement.focus();
    this.isDisplayAuthors = false;
  }
}
