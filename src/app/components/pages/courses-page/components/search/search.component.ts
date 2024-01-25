import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  readonly searchButtonText = 'Search';
  readonly searchPlaceholderText = 'Type to search';

  search: FormControl<string> = new FormControl<string>('', {nonNullable: true});
  isShowClearButton = false;

  destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((value: string) => {
      this.isShowClearButton = Boolean(value.length);
    })
  }

  clearSearch(): void {
    this.search.reset();
  }

  onSearch(): void {
    console.log(this.search.value)
  }
}
