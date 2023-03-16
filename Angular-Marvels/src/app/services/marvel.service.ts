/* marvel.service.ts */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ResultCharacter/* , ResultHistory, ResultEvent ... */ } from '../models/marvel-character';
import { map } from 'rxjs/operators';
import { ResultComics } from '../models/marvel-comics';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  constructor(private http: HttpClient) {}

  getResults(type: string): Observable<ResultCharacter[]|ResultComics[]/*| ResultHistory[] | ResultEvent[] ... */> {
    switch (type) {
      case 'characters': {
        return this.http.get<{ data: { results: ResultCharacter[] } }>('/marvel?type=' + type).pipe(
          map(response => response.data.results)
        );
      }
      case 'comics': {
        return this.http.get<{ data: { results: ResultComics[] } }>('/marvel?type=' + type).pipe(
          map(response => response.data.results)
        );
      }
      /*
      case 'history': {
        return this.http.get<{ data: { results: ResultHistory[] } }>('/marvel?type=' + type).pipe(
          map(response => response.data.results)
        );
      }
      case 'events': {
        return this.http.get<{ data: { results: ResultEvent[] } }>('/marvel?type=' + type).pipe(
          map(response => response.data.results)
        );
      }
      // adicione aqui os outros cases para os outros valores de type
      */
      default: {
        return of([]);
      }
    }
  }
}