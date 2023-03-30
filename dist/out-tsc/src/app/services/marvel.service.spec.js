/* marvel.service.spec.ts  */
import { TestBed } from '@angular/core/testing';
import { MarvelService } from './marvel.service';
describe('MarvelService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MarvelService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=marvel.service.spec.js.map