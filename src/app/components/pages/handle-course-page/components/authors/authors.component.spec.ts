import { DebugElement, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { AuthorsComponent } from './authors.component';
import { coursesFeature } from '@store/features/courses-page.feature';
import { coursesInitialState } from '@store/states/courses.state';
import { Author } from '@models/author.model';

describe('AuthorsComponent', () => {
  it('should create', () => {
    const {authorComponent} = setup();

    expect(authorComponent).toBeTruthy();
  });


  it('should display course authors', () => {
    const {fixture, authorComponent} = setup();
    const authors: DebugElement[] = fixture.debugElement.queryAll(By.css('.item'));

    expect(authors.length).toBe(authorComponent.courseAuthors().length);
  });

  it('should delete author from list when user clicks delete button', () => {
    const {fixture, authorComponent} = setup();
    const deleteBtn: DebugElement | null = fixture.debugElement.query(By.css('.btn.btn-link'));
    const courseAuthorsLength: number = authorComponent.courseAuthors().length;

    expect(deleteBtn).not.toBeNull();

    deleteBtn.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(authorComponent.courseAuthors().length).toBe(courseAuthorsLength - 1);
  });

  it('should delete author from list when user clicks wheel on author tag', () => {
    const {fixture, authorComponent} = setup();
    const authorTag: DebugElement | null = fixture.debugElement.query(By.css('.item'));
    const courseAuthorsLength: number = authorComponent.courseAuthors().length;

    expect(authorTag).not.toBeNull();

    authorTag.triggerEventHandler('mousedown', {
      stopPropagation: () => {
      },
      preventDefault: () => {
      },
      button: 1
    });
    fixture.detectChanges();

    expect(authorComponent.courseAuthors().length).toBe(courseAuthorsLength - 1);
  });

  it('should open autocomplete panel when user clicks on input', () => {
    const {fixture, authorComponent} = setup();
    const input: DebugElement | null = fixture.debugElement.query(By.css('input.form-control'));
    authorComponent.courseAuthors.set([]);

    expect(input).not.toBeNull();

    input.triggerEventHandler('click');
    fixture.detectChanges();
    const option: DebugElement | null = fixture.debugElement.query(By.css('mat-option'));

    expect(option).toBeTruthy();
  });

  it('should add author to the course when user choose author from the autocomplete panel', () => {
    const {fixture, authorComponent} = setup();
    authorComponent.courseAuthors.set([]);

    const input: DebugElement | null = fixture.debugElement.query(By.css('input.form-control'));
    input.triggerEventHandler('click');

    fixture.detectChanges();

    const option: DebugElement | null = fixture.debugElement.query(By.css('mat-option'));
    option.triggerEventHandler('click');

    expect(authorComponent.courseAuthors().length).toBe(1);
  });
});

function setup() {
  const author: Author = {
    id: 'id',
    name: 'test name'
  };

  TestBed.configureTestingModule({
    imports: [NoopAnimationsModule],
    providers: [provideMockStore({
      initialState: {
        [coursesFeature.name]: {
          ...coursesInitialState,
          authors: [author]
        }
      }
    })]
  });

  const fixture: ComponentFixture<AuthorsComponent> = TestBed.createComponent(AuthorsComponent);
  const authorComponent: AuthorsComponent = fixture.componentInstance;
  authorComponent.courseAuthors = signal([author]);
  authorComponent.registerOnChange(() => {
  });
  authorComponent.registerOnTouched(() => {
  });

  fixture.detectChanges();

  return {
    fixture,
    authorComponent,
  };
}
