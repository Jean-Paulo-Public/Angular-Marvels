import { TestBed } from '@angular/core/testing';
import { MvOptionsComponent } from './mv-options.component';
describe('MvOptionsComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MvOptionsComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(MvOptionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=mv-options.component.spec.js.map