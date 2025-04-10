import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
   standalone: true,
   selector: 'app-error-page',
   templateUrl: './error-page.component.html',
   styleUrl: './error-page.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPageComponent {}
