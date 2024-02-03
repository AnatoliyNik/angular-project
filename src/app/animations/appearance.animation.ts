import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';

export const appearance: AnimationTriggerMetadata = trigger('appearance', [
  transition(':enter', [
    style({
      transform: 'translateX(-50px)',
      opacity: 0
    }),
    animate('.5s ease-out', style({
        transform: 'translateX(0)',
        opacity: 1
      })
    )
  ]),
  transition(':leave', [
    animate('.5s ease-out', style({
        transform: 'translateX(-50px)',
        opacity: 0
      })
    )
  ])
]);
