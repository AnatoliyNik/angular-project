import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  it('should create the app', () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })

    const fixture = TestBed.createComponent(AppComponent);

    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
