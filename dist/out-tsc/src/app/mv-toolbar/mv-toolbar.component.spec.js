import { TestBed } from '@angular/core/testing';
import { MvToolbarComponent } from './mv-toolbar.component';
describe('MvToolbarComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MvToolbarComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(MvToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=mv-toolbar.component.spec.js.map