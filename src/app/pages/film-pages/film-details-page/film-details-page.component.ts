import { ChangeDetectionStrategy, Component } from '@angular/core';

// shared components
import { NavbarComponent, AnnouncementBarComponent, FooterComponent } from '../../../components';

// film components
import { FilmDetailsComponent, FilmDescriptionComponent } from '../../../films';

@Component({
    standalone: true,
    selector: 'app-film-details-page',
    templateUrl: './film-details-page.component.html',
    styleUrl: './film-details-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NavbarComponent,
        AnnouncementBarComponent,
        FooterComponent,
        FilmDetailsComponent,
        FilmDescriptionComponent,
    ]
})
export class FilmDetailsPageComponent {}
