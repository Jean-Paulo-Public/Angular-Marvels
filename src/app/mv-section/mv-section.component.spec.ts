import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MvSectionComponent } from './mv-section.component';

describe('MvSectionComponent', () => {
  let component: MvSectionComponent;
  let fixture: ComponentFixture<MvSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MvSectionComponent ]
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
