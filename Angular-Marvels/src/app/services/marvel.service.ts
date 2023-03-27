/* marvel.service.ts */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ResultCharacter, DataCharacter } from '../models/marvel-character';
import { map } from 'rxjs/operators';
import { ResultComics } from '../models/marvel-comics';
import { ResultEvents } from '../models/marvel-events';
import { ResultSeries } from '../models/marvel-series';
import { ResultCreators } from '../models/marvel-creators';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  constructor(private http: HttpClient) {}
  getResults(type: string, limit: number = 5, pageIndex?: number): Observable<{ results: ResultCharacter[] | 
                                                                                         ResultComics[] | 
                                                                                         ResultEvents[] | 
                                                                                         ResultSeries[] | 
                                                                                         ResultCreators[]; 
                                                                                totalResults: number;}> {
    // Inicio dos comandos da função "getResults"
    pageIndex = pageIndex || 0;
    const offset = limit * pageIndex;
    let resultObservable: Observable<{
      results:
        | ResultCharacter[]
        | ResultComics[]
        | ResultEvents[]
        | ResultSeries[]
        | ResultCreators[];
      totalResults: number;
    }> = of({ results: [], totalResults: limit });

    switch (type) {
      case 'characters':
        resultObservable = this.getMarvelData<ResultCharacter>(
          '/marvel?type=' + type + '&limit=' + limit + '&offset=' + offset
        ).pipe( // Função que canaliza dos dados
          // Mapeia cada elemento
          map(response => ({
            results: response.results,
            totalResults: response.totalResults
          }))
        );
        break;
      case 'comics':
        resultObservable = this.getMarvelData<ResultComics>(
          '/marvel?type=' + type + '&limit=' + limit + '&offset=' + offset
        ).pipe( // Função que canaliza dos dados
        // Mapeia cada elemento
          map(response => ({
            results: response.results,
            totalResults: response.totalResults
          }))
        );
        break;
      case 'events':
       resultObservable = this.getMarvelData<ResultEvents>(
         '/marvel?type='+type+'&limit='+limit+'&offset='+offset
         ).pipe( // Função que canaliza dos dados
         // Mapeia cada elemento
           map(response=>({
             results:response.results,
             totalResults:response.totalResults
           }))
         );
       break;
     case 'series':
       resultObservable = this.getMarvelData<ResultSeries>(
         '/marvel?type='+type+'&limit='+limit+'&offset='+offset)
         .pipe( // Função que canaliza dos dados
         // Mapeia cada elemento
           map(response=>({
             results:response.results,
             totalResults:response.totalResults
           }))
         );
       break;
     case 'creators':
       resultObservable = this.getMarvelData<ResultCreators>(
         '/marvel?type='+type+'&limit='+limit+'&offset='+offset
         ).pipe( // Função que canaliza dos dados
         // Mapeia cada elemento
           map(response=>({
             results:response.results,
             totalResults:response.totalResults
           }))
         );
       break;
     }

     return resultObservable;
   }

   // Função genérica, para trazer os dados já no formato correto.
   private getMarvelData<T>(url:string):Observable<{results:T[],totalResults:number}>{
     return this.http.get<{ data:{results:T[],total:number}}>(url).pipe(
       map(response=>({results:response.data.results,totalResults:response.data.total}))
     );
   }
}