import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillSurveyComponent } from './fill-survey.component';

describe('FillSurveyComponent', () => {
  let component: FillSurveyComponent;
  let fixture: ComponentFixture<FillSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillSurveyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
