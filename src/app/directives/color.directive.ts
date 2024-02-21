import { Directive, ElementRef, inject, Input, Renderer2 } from '@angular/core';
import { Course } from '@models/course.model';

@Directive({
  standalone: true,
})
export class ColorDirective {
  private renderer: Renderer2 = inject(Renderer2);
  private elementRef: ElementRef = inject(ElementRef);

  @Input({required: true})
  set course(course: Course) {
    const element = this.elementRef.nativeElement.querySelector('[data-id="course"]');
    const property = 'border';
    const fresh = '1px solid lime';
    const upcoming = '1px solid blue';
    const creationDate: Date = course.creationDate;
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
