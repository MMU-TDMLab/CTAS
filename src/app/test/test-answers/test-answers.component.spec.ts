import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAnswersComponent } from './test-answers.component';

describe('TestAnswersComponent', () => {
  let component: TestAnswersComponent;
  let fixture: ComponentFixture<TestAnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAnswersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
