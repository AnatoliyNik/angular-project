import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting, TestRequest } from '@angular/common/http/testing';

import { loaderInterceptor } from '@interceptors/loader.interceptor';
import { ModalService } from '@services/modal.service';

describe('loaderInterceptor', () => {
  it('should show and hide loader', fakeAsync(() => {
    const {httpClient, modalService, url, httpTestingController} = setup();

    httpClient.get(url).subscribe({
      complete: () => {
        expect(modalService.hideLoader).toHaveBeenCalled();
      }
    });

    expect(modalService.showLoader).toHaveBeenCalled();

    tick(1000);
    const req: TestRequest = httpTestingController.expectOne(url);

    req.flush({});
    httpTestingController.verify();
  }));
});

function setup() {
  TestBed.configureTestingModule({
    providers: [
      provideHttpClient(withInterceptors([loaderInterceptor])),
      provideHttpClientTesting(),
      {
        provide: ModalService,
        useValue: {
          showLoader: (): void => {
          },
          hideLoader: (): void => {
          }
        }
      }
    ]
  });

  const httpTestingController: HttpTestingController = TestBed.inject(HttpTestingController);
  const httpClient: HttpClient = TestBed.inject(HttpClient);
  const modalService: ModalService = TestBed.inject(ModalService);
  const url = '/api/test';

  spyOn(modalService, 'showLoader');
  spyOn(modalService, 'hideLoader');

  return {
    httpTestingController,
    httpClient,
    url,
    modalService
  };
}
