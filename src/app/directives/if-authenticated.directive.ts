import { ChangeDetectorRef, Directive, effect, inject, Signal, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginFeature } from '@store/features/login-page.feature';

@Directive({
  selector: '[appIfAuthenticated]',
  standalone: true
})
export class IfAuthenticatedDirective {
  private store: Store = inject(Store);
  private viewContainerRef: ViewContainerRef = inject(ViewContainerRef);
  private templateRef: TemplateRef<unknown> = inject(TemplateRef);
  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  private isAuth: Signal<boolean> = this.store.selectSignal(loginFeature.selectIsAuth);

  constructor() {
    effect(() => {
      if (this.isAuth()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        this.changeDetectorRef.detectChanges();
      } else {
        this.viewContainerRef.clear();
      }
    });
  }
}
