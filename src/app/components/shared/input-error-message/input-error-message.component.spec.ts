import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { InputErrorMessageComponent } from './input-error-message.component';
import { ErrorMessage } from '@tokens/error-message.token';

describe('InputErrorMessageComponent', () => {
  it('should create', () => {
    const {fixture} = setup();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display input errors', () => {
    const message = 'test message';
    const {fixture, error} = setup(message);

    fixture.componentRef.setInput('errors', error);
    fixture.detectChanges();

    const errorElement: DebugElement | null = fixture.debugElement.query(By.css('.error'));

    expect(errorElement).not.toBeNull();
    expect(errorElement.nativeElement.innerText).toContain(message);
  });
});

function setup(message: string = '') {
  const errorKey = 'test key';
  const error: ValidationErrors = {[errorKey]: 'test value'};

  TestBed.configureTestingModule({
    providers: [{
      provide: ErrorMessage,
      useValue: {[errorKey]: (): string => message}
    }]
  });

  const fixture: ComponentFixture<InputErrorMessageComponent> = TestBed.createComponent(InputErrorMessageComponent);

  fixture.detectChanges();

  return {
    fixture,
    error
  };
}
