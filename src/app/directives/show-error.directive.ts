import {
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
