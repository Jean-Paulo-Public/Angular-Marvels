import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MvOptionsComponent } from './mv-options.component';

describe('MvOptionsComponent', () => {
  let component: MvOptionsComponent;
  let fixture: ComponentFixture<MvOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MvOptionsComponent ]
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
