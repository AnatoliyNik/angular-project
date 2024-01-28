import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ColorDirective } from './color.directive';
import { Course } from '../models/course.model';

describe('ColorDirective', () => {
  it('should create an instance', () => {
    const {colorDirective} = setup();

    expect(colorDirective).toBeTruthy();
  });

  it('should add blue border to element if course is upcoming', () => {
    const {fixture, colorDirective, getBorderColor} = setup();
    const second = 1000;

    colorDirective.course = {creationDate: new Date(Date.now() + second)} as Course;
    fixture.detectChanges();

    const borderColor: string = getBorderColor();

    expect(borderColor).toBe('blue');
  });

  it('should add lime border to element if course is fresh', () => {
    const {fixture, colorDirective, getBorderColor} = setup();

    colorDirective.course = {creationDate: new Date()} as Course;
    fixture.detectChanges();

    const borderColor: string = getBorderColor();

    expect(borderColor).toBe('lime');
  });

  it('should not change border on element if course is older than 14 days from now', () => {
    const {fixture, colorDirective, getBorderColor} = setup();
    const currentDate: Date = new Date();
    const amountOfDays = 14;
    const currentYear: number = currentDate.getFullYear();
    const currentMonth: number = currentDate.getMonth();
    const currentDay: number = currentDate.getDate();
    const oldDate: Date = new Date(currentYear, currentMonth, currentDay - amountOfDays);

    colorDirective.course = {creationDate: oldDate} as Course;
    fixture.detectChanges();

    const borderColor: string = getBorderColor();

    expect(borderColor).not.toBe('lime');
    expect(borderColor).not.toBe('blue');
  });
});

function setup() {
  @Component({
    template: '<article data-id="course" #test>test</article>',
    standalone: true,
    hostDirectives: [ColorDirective]
  })
  class HostTestComponent {
    @ViewChild('test') article!: ElementRef;
  }

  const fixture: ComponentFixture<HostTestComponent> = TestBed.createComponent(HostTestComponent);
  const colorDirective: ColorDirective = fixture.debugElement.injector.get(ColorDirective);
  const getBorderColor = (): string => (fixture.componentInstance.article.nativeElement as HTMLElement).style.borderColor;

  return {
    fixture,
    colorDirective,
    getBorderColor
  };
}
