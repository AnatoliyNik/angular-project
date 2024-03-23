import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  it('should create', () => {
    const {modalDebugEl} = setup();

    expect(modalDebugEl.componentInstance).toBeTruthy();
  });

  it('should emit "true" if user click "ok" button', () => {
    const {modalDebugEl, fixture} = setup();
    const okButtonDebugEl: DebugElement | undefined = modalDebugEl.query(By.css('.btn-success'));

    okButtonDebugEl?.triggerEventHandler('click');

    expect(fixture.componentInstance.answer).toBe(true);
  });

  it('should emit "false" if user click "cancel" button', () => {
    const {modalDebugEl, fixture} = setup();
    const cancelButtonDebugEl: DebugElement | undefined = modalDebugEl.query(By.css('.cancel'));

    cancelButtonDebugEl?.triggerEventHandler('click');
    expect(fixture.componentInstance.answer).toBe(false);
  });

  it('should emit "false" if user click "close" button', () => {
    const {modalDebugEl, fixture} = setup();
    const closeButtonDebugEl: DebugElement | undefined = modalDebugEl.query(By.css('.close'));

    closeButtonDebugEl?.triggerEventHandler('click');
    expect(fixture.componentInstance.answer).toBe(false);
  });

  it('should render title and text on modal window', () => {
    const {modalDebugEl, changeDetectorRef,} = setup();
    const title = 'mock title';
    const text = 'mock text';

    (modalDebugEl.componentInstance as ModalComponent).title = title;
    (modalDebugEl.componentInstance as ModalComponent).text = text;

    const titleDebugEl: DebugElement | undefined = modalDebugEl.query(By.css('.title'));
    const textDebugEl: DebugElement | undefined = modalDebugEl.query(By.css('.content'));

    changeDetectorRef.detectChanges();

    expect((titleDebugEl?.nativeElement as HTMLElement).innerText).toContain(title);
    expect((textDebugEl?.nativeElement as HTMLElement).innerText).toContain(text);
  });

});

function setup() {
  @Component({
    standalone: true,
    imports: [ModalComponent],
    template: '<app-modal (answer)="answer = $event"/>'
  })
  class HostTestComponent {
    answer!: boolean;
  }

  TestBed.configureTestingModule({
    imports: [TranslateModule.forRoot()]
  })

  const fixture: ComponentFixture<HostTestComponent> = TestBed.createComponent<HostTestComponent>(HostTestComponent);
  const modalDebugEl: DebugElement = fixture.debugElement.query(By.directive(ModalComponent));
  const changeDetectorRef: ChangeDetectorRef = modalDebugEl.injector.get(ChangeDetectorRef);

  fixture.detectChanges();

  return {
    fixture,
    modalDebugEl,
    changeDetectorRef
  };
}
