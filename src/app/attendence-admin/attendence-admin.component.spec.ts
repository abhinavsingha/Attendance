import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendenceAdminComponent } from './attendence-admin.component';

describe('AttendenceAdminComponent', () => {
  let component: AttendenceAdminComponent;
  let fixture: ComponentFixture<AttendenceAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendenceAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendenceAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
