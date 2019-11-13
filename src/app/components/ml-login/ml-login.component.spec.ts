import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlLoginComponent } from './ml-login.component';

describe('MlLoginComponent', () => {
  let component: MlLoginComponent;
  let fixture: ComponentFixture<MlLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
