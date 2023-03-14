import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/marvel-character';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  constructor(private http: HttpClient) {}

  getResults(): Observable<Result[]> {
    return this.http.get<{ data: { results: Result[] } }>('/marvel').pipe(
      map(response => response.data.results)
    );
  }
}