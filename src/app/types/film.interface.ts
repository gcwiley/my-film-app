// define the film interface data transfer object
export interface FilmDto {
    id: string;
    title: string;
    director: string;
    releaseDate: string;
    genre: string;
    summary: string;
 }

// FilmInputDto represents a type that is essentially identical to FilmDto, but without the id property
// this is often used when creating or updating film records
// when creating a new film, the id is usally generated by the system and should not be included in the input data.
export type FilmInputDto = Omit<FilmDto, 'id'>