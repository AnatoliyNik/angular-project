import { TestBed } from '@angular/core/testing';

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
});

function setup() {
  const modalService: ModalService = TestBed.inject(ModalService);

  return {
    modalService
  };
}
