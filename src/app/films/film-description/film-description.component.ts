import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

// import the film interface
import { FilmDto } from '../../types/film.interface';

// import the film service
import { FilmService } from '../../services/film.service';

@Component({
    selector: 'app-film-description',
    templateUrl: './film-description.component.html',
    styleUrl: './film-description.component.scss',
    imports: [NgIf]
})
export class FilmDescriptionComponent implements OnInit {
   film!: FilmDto;

   constructor(private route: ActivatedRoute, private filmService: FilmService) {}

   ngOnInit(): void {
      this.getFilm();
   }

   // GET film by Id
   getFilm(): void {
      const id = this.route.snapshot.paramMap.get('id')!;
      this.filmService.getFilmById(id).subscribe((film) => {
         this.film = film
      })
   }
}
