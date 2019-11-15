import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlFilemenuComponent } from './ml-filemenu.component';

describe('MLFilemenuComponent', () => {
  let component: MlFilemenuComponent;
  let fixture: ComponentFixture<MlFilemenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlFilemenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlFilemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
