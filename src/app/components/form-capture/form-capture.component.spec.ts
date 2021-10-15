import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCaptureComponent } from './form-capture.component';

describe('FormCaptureComponent', () => {
  let component: FormCaptureComponent;
  let fixture: ComponentFixture<FormCaptureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCaptureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
