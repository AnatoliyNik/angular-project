import { Component, DebugElement, Signal, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@services/auth.service';
import { IfAuthenticatedDirective } from './if-authenticated.directive';

describe('IfAuthenticatedDirective', () => {
  it('should create an instance', () => {
    const {ifAuthenticatedDirective} = setup();

    expect(ifAuthenticatedDirective).toBeTruthy();
  });

  it('should render element if authenticated', () => {
    const {testDebugEl} = setup();

    expect(testDebugEl).toBeTruthy();
  });

  it('should not render element if not authenticated', () => {
    const {testDebugEl} = setup(false);

    expect(testDebugEl).toBeNull();
  });
});

function setup(isAuth: boolean = true) {
  @Component({
    template: '<div id="test" *appIfAuthenticated>test</div>',
    imports: [
      IfAuthenticatedDirective
    ],
    standalone: true,
    providers: [{
      provide: AuthService,
      useValue: {
        isAuthenticated: (): Signal<boolean> => signal(isAuth).asReadonly()
      }
    }]
  })
  class HostTestComponent {
  }

  const fixture: ComponentFixture<HostTestComponent> = TestBed.createComponent(HostTestComponent);
  fixture.detectChanges();
  const testDebugEl: DebugElement = fixture.debugElement.query(By.css('#test'));
  const ifAuthenticatedDirective: IfAuthenticatedDirective = testDebugEl?.injector.get(IfAuthenticatedDirective);

  return {
    fixture,
    testDebugEl,
    ifAuthenticatedDirective
  };
}
