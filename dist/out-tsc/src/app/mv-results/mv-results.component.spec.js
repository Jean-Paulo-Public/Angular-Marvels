import { TestBed } from '@angular/core/testing';
import { MvResultsComponent } from './mv-results.component';
describe('MvResultsComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MvResultsComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(MvResultsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=mv-results.component.spec.js.map