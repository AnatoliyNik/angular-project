import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

import { DateComponent } from './date.component';

describe('DateComponent', () => {
  it('should create', () => {
    const {dateComponent} = setup();

    expect(dateComponent).toBeTruthy();
  });

  it('should open date picker if user clicks on calendar button', () => {
    const {fixture} = setup();
    const openCalendarButton: DebugElement | null = fixture.debugElement.query(By.css('.btn.calendar'));

    expect(openCalendarButton).not.toBeNull();

    openCalendarButton.triggerEventHandler('click');
    const datePicker: DebugElement | null = fixture.debugElement.query(By.css('mat-calendar'));

    expect(datePicker).toBeTruthy();
  });
});

function setup() {
  TestBed.configureTestingModule({
    imports: [NoopAnimationsModule],
    providers: [provideMomentDateAdapter()]
  });

  const fixture: ComponentFixture<DateComponent> = TestBed.createComponent(DateComponent);
  const dateComponent: DateComponent = fixture.componentInstance;

  fixture.detectChanges();

  return {
    fixture,
    dateComponent
  };
}
