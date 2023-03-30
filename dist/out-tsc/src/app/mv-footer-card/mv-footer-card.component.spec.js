import { TestBed } from '@angular/core/testing';
import { MvFooterCardComponent } from './mv-footer-card.component';
describe('MvFooterCardComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MvFooterCardComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(MvFooterCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=mv-footer-card.component.spec.js.map