import { TestBed } from '@angular/core/testing';
import { MvSectionComponent } from './mv-section.component';
describe('MvSectionComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MvSectionComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(MvSectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=mv-section.component.spec.js.map