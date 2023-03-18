/* marvel.service.ts */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ResultCharacter, DataCharacter } from '../models/marvel-character';
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

  getResults(
    type: string,
    limit: number = 5,
    pageIndex?: number
  ): Observable<{
    results:
      | ResultCharacter[]
      | ResultComics[]
      | ResultEvents[]
      | ResultSeries[]
      | ResultStories[]
      | ResultCreators[];
    totalResults: number;
  }> {
    pageIndex = pageIndex || 0;

    const offset = limit * pageIndex;

    let resultObservable: Observable<{
      results:
        | ResultCharacter[]
        | ResultComics[]
        | ResultEvents[]
        | ResultSeries[]
        | ResultStories[]
        | ResultCreators[];
      totalResults: number;
    }> = of({ results: [], totalResults: limit });

    switch (type) {
      case 'characters':
        resultObservable = this.getMarvelData<ResultCharacter>(
          '/marvel?type=' + type + '&limit=' + limit + '&offset=' + offset
        ).pipe(
          map(response => ({
            results: response.results,
            totalResults: response.totalResults
          }))
        );
        break;
      case 'comics':
        resultObservable = this.getMarvelData<ResultComics>(
          '/marvel?type=' + type + '&limit=' + limit + '&offset=' + offset
        ).pipe(
          map(response => ({
            results: response.results,
            totalResults: response.totalResults
          }))
        );
        break;
      case 'events':
       resultObservable = this.getMarvelData<ResultEvents>(
         '/marvel?type='+type+'&limit='+limit+'&offset='+offset).pipe(
           map(response=>({
             results:response.results,
             totalResults:response.totalResults
           }))
         );
       break;
     case 'series':
       resultObservable = this.getMarvelData<ResultSeries>(
         '/marvel?type='+type+'&limit='+limit+'&offset='+offset).pipe(
           map(response=>({
             results:response.results,
             totalResults:response.totalResults
           }))
         );
       break;
     case 'stories':
       resultObservable = this.getMarvelData<ResultStories>(
         '/marvel?type='+type+'&limit='+limit+'&offset='+offset).pipe(
           map(response=>({
             results:response.results,
             totalResults:response.totalResults
           }))
         );
       break;
     case 'creators':
       resultObservable = this.getMarvelData<ResultCreators>(
         '/marvel?type='+type+'&limit='+limit+'&offset='+offset).pipe(
           map(response=>({
             results:response.results,
             totalResults:response.totalResults
           }))
         );
       break;
     }

     return resultObservable;
   }

   private getMarvelData<T>(url:string):Observable<{results:T[],totalResults:number}>{
     return this.http.get<{ data:{results:T[],total:number}}>(url).pipe(
       map(response=>({results:response.data.results,totalResults:response.data.total}))
     );
   }
}