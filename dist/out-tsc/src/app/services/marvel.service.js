/* marvel.service.ts */
import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
let MarvelService = class MarvelService {
    constructor(http) {
        this.http = http;
    }
    getResults(type, limit = 5, pageIndex) {
        pageIndex = pageIndex || 0;
        const offset = limit * pageIndex;
        let resultObservable = of({ results: [], totalResults: limit });
        switch (type) {
            case 'characters':
                resultObservable = this.getMarvelData('/marvel?type=' + type + '&limit=' + limit + '&offset=' + offset).pipe(map(response => ({
                    results: response.results,
                    totalResults: response.totalResults
                })));
                break;
            case 'comics':
                resultObservable = this.getMarvelData('/marvel?type=' + type + '&limit=' + limit + '&offset=' + offset).pipe(map(response => ({
                    results: response.results,
                    totalResults: response.totalResults
                })));
                break;
            case 'events':
                resultObservable = this.getMarvelData('/marvel?type=' + type + '&limit=' + limit + '&offset=' + offset).pipe(map(response => ({
                    results: response.results,
                    totalResults: response.totalResults
                })));
                break;
            case 'series':
                resultObservable = this.getMarvelData('/marvel?type=' + type + '&limit=' + limit + '&offset=' + offset).pipe(map(response => ({
                    results: response.results,
                    totalResults: response.totalResults
                })));
                break;
            case 'stories':
                resultObservable = this.getMarvelData('/marvel?type=' + type + '&limit=' + limit + '&offset=' + offset).pipe(map(response => ({
                    results: response.results,
                    totalResults: response.totalResults
                })));
                break;
            case 'creators':
                resultObservable = this.getMarvelData('/marvel?type=' + type + '&limit=' + limit + '&offset=' + offset).pipe(map(response => ({
                    results: response.results,
                    totalResults: response.totalResults
                })));
                break;
        }
        return resultObservable;
    }
    getMarvelData(url) {
        return this.http.get(url).pipe(map(response => ({ results: response.data.results, totalResults: response.data.total })));
    }
};
MarvelService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], MarvelService);
export { MarvelService };
//# sourceMappingURL=marvel.service.js.map