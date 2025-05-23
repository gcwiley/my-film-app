import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, catchError, of } from 'rxjs';

// angular material
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

// film service and interface
import { FilmService } from '../../services/film.service';
import { Film } from '../../types/film.interface';

@Component({ 
  standalone: true,
  selector: 'app-recent-films',
  templateUrl: './recent-films.component.html',
  styleUrl: './recent-films.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatListModule, MatIconModule],
})
export class RecentFilmsComponent implements OnInit {
  public recentFilms$!: Observable<Film[]>;

  constructor(private filmService: FilmService) {}

  public ngOnInit(): void {
    // get the observable stream of recently added films
    this.recentFilms$ = this.filmService.getRecentlyAddedFilms().pipe(
      catchError((error) => {
        console.error('Error getting recent films.', error);
        return of([]);
      })
    );
  }
}
