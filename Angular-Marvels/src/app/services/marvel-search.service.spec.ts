/* marvel-search.service.spec.ts  */

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MarvelSearchService } from './marvel-search.service';

describe('MarvelSearchService', () => {
  let service: MarvelSearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MarvelSearchService],
    });
    service = TestBed.inject(MarvelSearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return search results', () => {
    const mockResponse = {
      data: {
        results: [{ id: 1, name: 'Iron Man' }],
        total: 1,
      },
    };

    service.search('characters', 'Iron Man', 10, 0).subscribe((response) => {
      expect(response.results.length).toBe(1);
      expect(response.results[0].name).toBe('Iron Man');
      expect(response.totalResults).toBe(1);
    });

    const req = httpMock.expectOne(
      `/marvel?type=characters&title=Iron Man&limit=10&offset=0`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});