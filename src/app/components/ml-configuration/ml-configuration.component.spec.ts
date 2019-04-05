import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlConfigurationComponent } from './ml-configuration.component';

describe('MlConfigurationComponent', () => {
  let component: MlConfigurationComponent;
  let fixture: ComponentFixture<MlConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
