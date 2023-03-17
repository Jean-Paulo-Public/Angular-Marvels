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

  getResults(type: string): Observable<ResultCharacter[]|ResultComics[]|ResultEvents[]|ResultSeries[]|ResultStories[]|ResultCreators[]> {
    const resultTypes = {
      characters: () => this.getMarvelData<ResultCharacter>('/marvel?type=' + type),
      comics: () => this.getMarvelData<ResultComics>('/marvel?type=' + type),
      events: () => this.getMarvelData<ResultEvents>('/marvel?type=' + type),
      series: () => this.getMarvelData<ResultSeries>('/marvel?type=' + type),
      stories: () => this.getMarvelData<ResultStories>('/marvel?type=' + type),
      creators: () => this.getMarvelData<ResultCreators>('/marvel?type=' + type)
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

/*
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

  getResults(type: string): Observable<ResultCharacter[]|ResultComics[]|ResultEvents[]|ResultSeries[]|ResultStories[]|ResultCreators[]> {
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
      case 'events': {
        return this.http.get<{ data: { results: ResultEvents[] } }>('/marvel?type=' + type).pipe(
          map(response => response.data.results)
        );
      }
      case 'series': {
        return this.http.get<{ data: { results: ResultSeries[] } }>('/marvel?type=' + type).pipe(
          map(response => response.data.results)
        );
      }
      case 'stories': {
        return this.http.get<{ data: { results: ResultStories[] } }>('/marvel?type=' + type).pipe(
          map(response => response.data.results)
        );
      }
      case 'creators': {
        return this.http.get<{ data: { results: ResultCreators[] } }>('/marvel?type=' + type).pipe(
          map(response => response.data.results)
        );
      }
      default: {
        return of([]);
      }
    }
  }
}
*/