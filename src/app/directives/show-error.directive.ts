import {
  ChangeDetectorRef,
  ComponentRef,
  DestroyRef,
  Directive,
  HostListener,
  inject,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { combineLatestWith, first, startWith, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InputErrorMessageComponent } from '@component/shared/input-error-message/input-error-message.component';
import { Store } from '@ngrx/store';
import { loginFeature } from '@store/features/login-page.feature';

@Directive({
  selector: `
    [appDisplayError]:not([notDisplayError]),
    [formControlName]:not([notDisplayError]),
    [formControl]:not([notDisplayError]),
    [ngModel]:not([notDisplayError])
  `,
  standalone: true,
})
export class ShowErrorDirective implements OnInit {
  private control: NgControl | null = inject(NgControl, {self: true, optional: true});
  private destroyRef: DestroyRef = inject(DestroyRef);
  private viewContainerRef: ViewContainerRef = inject(ViewContainerRef);
  private store: Store = inject(Store);

  private touched: Subject<void> = new Subject<void>();
  private component: ComponentRef<InputErrorMessageComponent> | null = null;

  @HostListener('focusout')
  blur(): void {
    this.touched.next();
  }

  ngOnInit(): void {
    if (!this.control) {
      return;
    }

    this.store.select(loginFeature.selectLanguage).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      if (this.component) {
        this.component.injector.get(ChangeDetectorRef).markForCheck();
      }
    });

    this.control.statusChanges?.pipe(
      startWith(this.control.status),
      combineLatestWith(this.touched.pipe(first())),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      if (this.control!.errors && this.control!.touched) {
        if (!this.component) {
          this.component = this.viewContainerRef.createComponent(InputErrorMessageComponent);
        }
        this.component.setInput('errors', this.control!.errors);
      } else {
        this.component?.destroy();
        this.component = null;
      }
    });
  }
}
