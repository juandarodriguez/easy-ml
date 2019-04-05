import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlTestModelComponent } from './ml-test-model.component';

describe('TestModelComponent', () => {
  let component: MlTestModelComponent;
  let fixture: ComponentFixture<MlTestModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlTestModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlTestModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
