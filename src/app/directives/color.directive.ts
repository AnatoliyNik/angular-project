import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Course } from '../models/course.model';

@Directive({
  standalone: true,
})
export class ColorDirective implements AfterViewInit {
  @Input({required: true})
  course!: Course;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
  }

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement.querySelector('[data-id="course"]');
    const property = 'border';
    const fresh = '1px solid lime';
    const upcoming = '1px solid blue';
    const creationDate: Date = this.course.creationDate;
    const currentDate: Date = new Date();
    const amountOfDays = 14;
    const currentYear: number = currentDate.getFullYear();
    const currentMonth: number = currentDate.getMonth();
    const currentDay: number = currentDate.getDate();
    const oldDate: Date = new Date(currentYear, currentMonth, currentDay - amountOfDays);

    if (creationDate > currentDate) {
      this.renderer.setStyle(element, property, upcoming);
      return;
    }

    if (creationDate > oldDate) {
      this.renderer.setStyle(element, property, fresh);
    }
  }
}
