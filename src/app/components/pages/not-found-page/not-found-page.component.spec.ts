import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

import { NotFoundPageComponent } from './not-found-page.component';
import { RoutePath } from '@data/constants';

describe('NotFoundPageComponent', () => {
  it('should create', () => {
    const {component} = setup();

    expect(component).toBeTruthy();
  });

  it('should had link to courses page', () => {
    const {fixture, router} = setup();
    const link: DebugElement | null = fixture.debugElement.query(By.css('.btn'));

    expect(link).toBeTruthy();

    spyOn(router, 'navigate');
    link.triggerEventHandler('click');

    expect(router.navigate).toHaveBeenCalledWith([RoutePath.Courses]);
  });
});

function setup() {
  TestBed.configureTestingModule({
    imports: [RouterTestingModule, TranslateModule.forRoot()]
  });
  const fixture: ComponentFixture<NotFoundPageComponent> = TestBed.createComponent(NotFoundPageComponent);
  const component: NotFoundPageComponent = fixture.componentInstance;
  const router: Router = TestBed.inject(Router);

  fixture.detectChanges();
  return {
    fixture,
    component,
    router
  };
}
