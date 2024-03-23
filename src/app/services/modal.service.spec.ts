import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { ModalService } from './modal.service';

describe('ModalService', () => {
  it('should be created', () => {
    const {modalService} = setup();

    expect(modalService).toBeTruthy();
  });

  it('should render modal dialog', () => {
    const {modalService} = setup();
    modalService.showConfirm().subscribe();
    const modalWindow: Element = document.body.getElementsByClassName('modal-window')[0];

    expect(modalWindow).toBeTruthy();
  });

  it('should render loader window', () => {
    const {modalService} = setup();
    modalService.showLoader();
    let loader: Element = document.body.getElementsByClassName('loader-container')[0];

    expect(loader).toBeTruthy();

    modalService.hideLoader();
    loader = document.body.getElementsByClassName('loader-container')[0];

    expect(loader).not.toBeDefined();
  });
});

function setup() {
  TestBed.configureTestingModule({
    imports: [TranslateModule.forRoot()]
  });

  const modalService: ModalService = TestBed.inject(ModalService);

  return {
    modalService
  };
}
