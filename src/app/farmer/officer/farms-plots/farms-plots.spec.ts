import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmsPlots } from './farms-plots';

describe('FarmsPlots', () => {
  let component: FarmsPlots;
  let fixture: ComponentFixture<FarmsPlots>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmsPlots]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmsPlots);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
