import { ShowErrorDirective } from './show-error.directive';
import { Component, DebugElement } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { InputErrorMessageComponent } from '@component/shared/input-error-message/input-error-message.component';

describe('ShowErrorDirective', () => {
  it('should create an instance', () => {
    const {showErrorDirective} = setup();
    expect(showErrorDirective).toBeTruthy();
  });

  it('should not render InputErrorMessageComponent if formControl has no errors', () => {
    const {fixture, testDebugEl, triggerTouched} = setup();
    fixture.detectChanges();
    testDebugEl.triggerEventHandler('input', {target: {value: 'test'}});
    triggerTouched();
    fixture.detectChanges();

    const errorComponentDebugEl: DebugElement | null = fixture.debugElement.query(By.directive(InputErrorMessageComponent));

    expect(errorComponentDebugEl).toBeNull();
  });

  it('should render InputErrorMessageComponent if formControl has an error and touched', () => {
    const {fixture, triggerTouched} = setup();
    fixture.detectChanges();
    triggerTouched();

    fixture.detectChanges();

    const errorComponentDebugEl: DebugElement | null = fixture.debugElement.query(By.directive(InputErrorMessageComponent));

    expect(errorComponentDebugEl).toBeTruthy();
  });

  it('should not render InputErrorMessageComponent if formControl has attribute [notDisplayError]', () => {
    const {fixture, testDebugEl, triggerTouched} = setup();
    testDebugEl.nativeElement.setAttribute('notDisplayError', '');
    triggerTouched();

    fixture.detectChanges();

    const errorComponentDebugEl: DebugElement | null = fixture.debugElement.query(By.directive(InputErrorMessageComponent));

    expect(errorComponentDebugEl).toBeNull();
  });
});

function setup() {
  @Component({
    standalone: true,
    imports: [
      ReactiveFormsModule,
      ShowErrorDirective
    ],
    template: `<input id="test" type="text" [formControl]="control">`
  })
  class HostTestComponent {
    control: FormControl<string> = new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required
    });
  }

  TestBed.configureTestingModule({
    imports: [TranslateModule.forRoot()],
    providers: [provideMockStore()]
  });

  const fixture: ComponentFixture<HostTestComponent> = TestBed.createComponent(HostTestComponent);
  const testDebugEl: DebugElement = fixture.debugElement.query(By.css('#test'));
  const showErrorDirective: ShowErrorDirective = testDebugEl.injector.get(ShowErrorDirective);

  const triggerTouched = (): void => {
    testDebugEl.triggerEventHandler('blur');
    testDebugEl.triggerEventHandler('focusout');
  };

  return {
    fixture,
    testDebugEl,
    showErrorDirective,
    triggerTouched
  };
}
