import { Component } from '@angular/core';

// import the shared components
import { NavbarComponent, AnnouncementBannerComponent, FooterComponent } from '../../shared/index';

@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.component.html',
    styleUrl: './error-page.component.scss',
    imports: [NavbarComponent, AnnouncementBannerComponent, FooterComponent]
})
export class ErrorPageComponent {}
