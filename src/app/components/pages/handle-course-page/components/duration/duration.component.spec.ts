import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { DurationComponent } from './duration.component';

describe('DurationComponent', () => {
  it('should create', () => {
    const {durationComponent, durationInput} = setup();

    expect(durationComponent).toBeTruthy();
    expect(durationInput).not.toBeNull();
  });

  it('should display empty string if minutes = 0', () => {
    const {durationComponent, changeDetectorRef, durationInput} = setup();
    durationComponent.minutes = 0;
    changeDetectorRef.detectChanges();

    expect(durationInput.nativeElement.value).toBe('');
  });

  it('should accept only digits', () => {
    const {durationComponent, durationInput} = setup();
    const initValue = 10;
    const newValue = 3;
    const stringValue = 'string';

    durationComponent.minutes = initValue;

    durationInput.nativeElement.value = stringValue;
    durationInput.nativeElement.dispatchEvent(new Event('input'));

    expect(durationInput.nativeElement.value).toBe(String(initValue));

    durationInput.nativeElement.value = newValue;
    durationInput.nativeElement.dispatchEvent(new Event('input'));

    expect(durationInput.nativeElement.value).toBe(String(newValue));
  });

  it('should accept less than 10 digit', () => {
    const nine = '1'.repeat(9);
    const ten = '1'.repeat(10);
    const {durationInput} = setup()

    durationInput.nativeElement.value = nine;
    durationInput.nativeElement.dispatchEvent(new Event('input'));

    expect(durationInput.nativeElement.value).toBe(String(nine));

    durationInput.nativeElement.value = ten;
    durationInput.nativeElement.dispatchEvent(new Event('input'));

    expect(durationInput.nativeElement.value).toBe(String(nine));
  });
});

function setup() {
  const fixture: ComponentFixture<DurationComponent> = TestBed.createComponent(DurationComponent);
  const durationComponent: DurationComponent = fixture.componentInstance;
  const durationInput: DebugElement = fixture.debugElement.query(By.css('input.form-control'));
  const changeDetectorRef: ChangeDetectorRef = fixture.componentRef.injector.get(ChangeDetectorRef);

  durationComponent.registerOnChange(() => {
  });
  durationComponent.registerOnTouched(() => {
  });

  fixture.detectChanges();

  return {
    fixture,
    durationComponent,
    durationInput,
    changeDetectorRef
  };
}
