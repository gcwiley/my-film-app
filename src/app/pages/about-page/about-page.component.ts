import { Component } from '@angular/core';

// import the shared components
import { NavbarComponent, AnnouncementBannerComponent, FooterComponent } from '../../shared/index';

@Component({
   standalone: true,
   selector: 'app-about-page',
   templateUrl: './about-page.component.html',
   styleUrl: './about-page.component.scss',
   imports: [NavbarComponent, AnnouncementBannerComponent, FooterComponent],
})
export class AboutPageComponent {}
