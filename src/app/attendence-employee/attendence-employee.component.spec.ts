import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendenceEmployeeComponent } from './attendence-employee.component';

describe('AttendenceEmployeeComponent', () => {
  let component: AttendenceEmployeeComponent;
  let fixture: ComponentFixture<AttendenceEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendenceEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendenceEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
