import { TestBed } from '@angular/core/testing';
import { MvButtonToggleGroupComponent } from './mv-button-toggle-group.component';
describe('MvButtonToggleGroupComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MvButtonToggleGroupComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(MvButtonToggleGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=mv-button-toggle-group.component.spec.js.map