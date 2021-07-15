import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildTestComponent } from './build-test.component';

describe('BuildTestComponent', () => {
  let component: BuildTestComponent;
  let fixture: ComponentFixture<BuildTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
