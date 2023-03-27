/* marvel.search.service.ts */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface MarvelSearchResult {
  results: any[];
  totalResults: number;
}

@Injectable({
  providedIn: 'root',
})
export class MarvelSearchService {
  constructor(private http: HttpClient) {}

  search(type: string, title: string, limit: number, offset: number) {
    return this.http
      // obtem os dados da API, formato "data: { results: {...}, total: number}"
      .get<{ data: { results: any[]; total: number } }>(
        `/marvel?type=${type}&title=${title}&limit=${limit}&offset=${offset}`
      )
      // Canaliza os dados para aplicar uma transformação
      .pipe(
        // Mapeia cada elemento
        map((data) => ({
          results: data.data.results,
          totalResults: data.data.total,
        }))
      );
  }
}