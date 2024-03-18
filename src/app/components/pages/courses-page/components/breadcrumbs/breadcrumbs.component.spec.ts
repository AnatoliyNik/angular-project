import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

import { BreadcrumbsComponent } from './breadcrumbs.component';

describe('BreadcrumbsComponent', () => {
  it('should create', () => {
    const {component} = setup();

    expect(component).toBeTruthy();
  });

  it('should display breadcrumbs', () => {
    const {component, fixture} = setup();
    const segments = ['test1', 'test2'];
    component.segments.set(segments);
    fixture.detectChanges();
    const breadcrumbs: DebugElement | null = fixture.debugElement.query(By.css('.segments'));

    expect(breadcrumbs).toBeTruthy();
    expect(breadcrumbs.nativeElement.innerText.toLowerCase()).toContain(segments[0].toLowerCase());
    expect(breadcrumbs.nativeElement.innerText.toLowerCase()).toContain(segments[1].toLowerCase());
  });

  it('should navigate to address in breadcrumbs if user clicks on it except last piece', () => {
    const {component, router, fixture} = setup();
    const segments = ['test1', 'test2', 'test3'];
    component.segments.set(segments);
    fixture.detectChanges();

    spyOn(router, 'navigate');

    const clickable: DebugElement[] = fixture.debugElement.queryAll(By.css('.btn'));
    const last: DebugElement | null = fixture.debugElement.query(By.css('.active'));

    expect(clickable.length).toBe(segments.length - 1);
    expect(last).toBeTruthy();

    last.triggerEventHandler('click');

    expect(router.navigate).not.toHaveBeenCalled();

    clickable.forEach((btn) => {
      btn.triggerEventHandler('click');
      const index: number = segments.findIndex(segment => segment.toLowerCase() === btn.nativeElement.innerText.toLowerCase());
      const path: string = segments.slice(0, index + 1).join('/');

      expect(router.navigate).toHaveBeenCalledWith([path]);
    });
  });
});

function setup() {
  TestBed.configureTestingModule({
    imports: [RouterTestingModule]
  });

  const fixture: ComponentFixture<BreadcrumbsComponent> = TestBed.createComponent(BreadcrumbsComponent);
  const component: BreadcrumbsComponent = fixture.componentInstance;
  const router: Router = TestBed.inject(Router);

  fixture.detectChanges();

  return {
    fixture,
    component,
    router
  };
}
