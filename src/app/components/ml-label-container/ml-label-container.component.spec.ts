import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlLabelContainerComponent } from './ml-label-container.component';

describe('MlLabelContainerComponent', () => {
  let component: MlLabelContainerComponent;
  let fixture: ComponentFixture<MlLabelContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlLabelContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlLabelContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
