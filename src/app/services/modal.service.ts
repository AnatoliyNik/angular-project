import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  Type,
} from '@angular/core';
import {
  first,
  Observable,
  ReplaySubject,
  switchMap,
  tap
} from 'rxjs';

import { ModalComponent } from '@component/shared/modal/modal.component';
import { LoaderComponent } from '@component/shared/loader/loader.component';
import { ConfirmWindow } from '@models/confirm-window.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private applicationRef: ApplicationRef = inject(ApplicationRef);
  private injector: EnvironmentInjector = inject(EnvironmentInjector);

  private confirmQueue: ConfirmWindow[] = [];
  private isConfirmWindowOpened = false;
  private loaderComponentRef: ComponentRef<LoaderComponent> | null = null;
  private loaderQueue = 0;

  showLoader(): void {
    this.loaderQueue++;

    if (this.loaderComponentRef) {
      return;
    }

    this.loaderComponentRef = this.createComponent(LoaderComponent);
  }

  hideLoader(): void {
    if (!this.loaderComponentRef) {
      return;
    }

    this.loaderQueue--;

    if (this.loaderQueue < 0) {
      this.loaderQueue = 0;
    }

    if (this.loaderQueue === 0) {
      this.loaderComponentRef.destroy();
      this.loaderComponentRef = null;
    }
  }

  showConfirm(title = '', text = ''): Observable<boolean> {
    const result$: ReplaySubject<Observable<boolean>> = new ReplaySubject<Observable<boolean>>(1);
    const confirmData: ConfirmWindow = {title, text, result$};

    this.confirmQueue.push(confirmData);

    if (!this.isConfirmWindowOpened) {
      this.openConfirm();
    }

    return result$.asObservable().pipe(
      switchMap((value: Observable<boolean>) => value),
      first()
    );
  }

  private openConfirm(): void {
    if (!this.confirmQueue.length) {
      return;
    }

    this.isConfirmWindowOpened = true;

    const componentRef: ComponentRef<ModalComponent> = this.createComponent(ModalComponent);
    const component: ModalComponent = componentRef.instance;
    const confirmData: ConfirmWindow = this.confirmQueue.shift() as ConfirmWindow;

    component.title = confirmData.title;
    component.text = confirmData.text;

    const confirmResult$: Observable<boolean> = component.answer.pipe(
      tap(() => {
        componentRef.destroy();
        this.isConfirmWindowOpened = false;
        this.openConfirm();
      }),
      first()
    );

    confirmData.result$.next(confirmResult$);
  }

  private createComponent<T>(component: Type<T>): ComponentRef<T> {
    const hostModalElement: HTMLDivElement = document.createElement('div');
    document.body.append(hostModalElement);

    const componentRef: ComponentRef<T> = createComponent(component, {
      environmentInjector: this.injector,
      hostElement: hostModalElement
    });

    this.applicationRef.attachView(componentRef.hostView);

    return componentRef;
  }
}
