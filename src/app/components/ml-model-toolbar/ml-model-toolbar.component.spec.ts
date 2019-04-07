import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlModelToolbarComponent } from './ml-model-toolbar.component';

describe('MlModelToolbarComponent', () => {
  let component: MlModelToolbarComponent;
  let fixture: ComponentFixture<MlModelToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlModelToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlModelToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
