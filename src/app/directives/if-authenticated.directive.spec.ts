import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { IfAuthenticatedDirective } from './if-authenticated.directive';
import { loginFeature } from '@store/features/login-page.feature';
import { loginInitialState } from '@store/states/login.state';

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
  })
  class HostTestComponent {
  }

  TestBed.configureTestingModule({
    providers: [provideMockStore({
      initialState: {
        [loginFeature.name]: {
          ...loginInitialState,
          isAuth
        }
      }
    })]
  })

  const fixture: ComponentFixture<HostTestComponent> = TestBed.createComponent(HostTestComponent);
  fixture.detectChanges();
  const testDebugEl: DebugElement = fixture.debugElement.query(By.css('#test'));
  const ifAuthenticatedDirective: IfAuthenticatedDirective = testDebugEl?.injector.get(IfAuthenticatedDirective);
  const store: MockStore = TestBed.inject(MockStore);

  return {
    fixture,
    testDebugEl,
    ifAuthenticatedDirective,
    store
  };
}
