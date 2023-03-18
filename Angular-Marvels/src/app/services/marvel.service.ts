/* marvel.service.ts */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ResultCharacter } from '../models/marvel-character';
import { map } from 'rxjs/operators';
import { ResultComics } from '../models/marvel-comics';
import { ResultEvents } from '../models/marvel-events';
import { ResultSeries } from '../models/marvel-series';
import { ResultStories } from '../models/marvel-stories';
import { ResultCreators } from '../models/marvel-creators';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  constructor(private http: HttpClient) {}

  getResults(type: string, limit: number): Observable<ResultCharacter[]|ResultComics[]|ResultEvents[]|ResultSeries[]|ResultStories[]|ResultCreators[]> {
    const resultTypes = {
      characters: () => this.getMarvelData<ResultCharacter>('/marvel?type=' + type + '&limit=' + limit),
      comics: () => this.getMarvelData<ResultComics>('/marvel?type=' + type + '&limit=' + limit),
      events: () => this.getMarvelData<ResultEvents>('/marvel?type=' + type + '&limit=' + limit),
      series: () => this.getMarvelData<ResultSeries>('/marvel?type=' + type + '&limit=' + limit),
      stories: () => this.getMarvelData<ResultStories>('/marvel?type=' + type + '&limit=' + limit),
      creators: () => this.getMarvelData<ResultCreators>('/marvel?type=' + type+ '&limit=' + limit)
    };

    if (type in resultTypes) {
      return resultTypes[type as keyof typeof resultTypes]();
    }

    return of([]);
  }

  private getMarvelData<T>(url: string): Observable<T[]> {
    return this.http.get<{ data: { results: T[] } }>(url).pipe(
      map(response => response.data.results)
    );
  }
}