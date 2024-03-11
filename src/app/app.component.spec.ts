import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AppComponent } from './app.component';
import { loginPageActions } from '@store/actions/login-page.actions';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()]
    });

    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should init app', () => {
    expect(store.dispatch).toHaveBeenCalledWith(loginPageActions.init());
  });
});
