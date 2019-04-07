import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlModelComponent } from './ml-model.component';

describe('ModelComponent', () => {
  let component: MlModelComponent;
  let fixture: ComponentFixture<MlModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
