import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakesInformation } from './makes-information';

describe('MakesInformation', () => {
  let component: MakesInformation;
  let fixture: ComponentFixture<MakesInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakesInformation],
    }).compileComponents();

    fixture = TestBed.createComponent(MakesInformation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
