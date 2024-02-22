import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef, ElementRef, EventEmitter,
  inject,
  OnInit,
  Output, ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs';
import { SearchQueryFilter } from '@helpers/searchQueryFilter';

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
  readonly searchPlaceholderText = 'Type to search';

  search: FormControl<string> = new FormControl<string>('', {nonNullable: true});
  isShowClearButton = false;

  destroyRef: DestroyRef = inject(DestroyRef);

  @ViewChild('searchInput')
  searchInput!: ElementRef;

  @Output()
  searchText: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      tap((value) => this.isShowClearButton = Boolean(value.length)),
      filter(SearchQueryFilter),
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((value: string) => {
      this.searchText.emit(value);
    });
  }

  clearSearch(): void {
    this.search.reset();
    (this.searchInput.nativeElement as HTMLInputElement).focus();
  }
}
