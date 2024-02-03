import { ChangeDetectorRef, Directive, effect, inject, Signal, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Directive({
  selector: '[appIfAuthenticated]',
  standalone: true
})
export class IfAuthenticatedDirective {
  private isAuth: Signal<boolean> = inject(AuthService).isAuthenticated();
  private viewContainerRef: ViewContainerRef = inject(ViewContainerRef);
  private templateRef: TemplateRef<unknown> = inject(TemplateRef);
  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

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
