import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {DatePipe, HashLocationStrategy, LocationStrategy, NgOptimizedImage} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './login/login.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { AllEmployeesComponent } from './all-employees/all-employees.component';
import { AttendenceAdminComponent } from './attendence-admin/attendence-admin.component';
import { AttendenceEmployeeComponent } from './attendence-employee/attendence-employee.component';
import { LeavesAdminComponent } from './leaves-admin/leaves-admin.component';
import { LeavesEmployeeComponent } from './leaves-employee/leaves-employee.component';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { PayslipComponent } from './payslip/payslip.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { ProfileComponent } from './profile/profile.component';
import { ActivitiesComponent } from './activities/activities.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgxSpinnerModule} from "ngx-spinner";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    AdminDashboardComponent,
    LoginComponent,
    EmployeeDashboardComponent,
    AllEmployeesComponent,
    AttendenceAdminComponent,
    AttendenceEmployeeComponent,
    LeavesAdminComponent,
    LeavesEmployeeComponent,
    EmployeeSalaryComponent,
    PayslipComponent,
    EmployeesListComponent,
    ProfileComponent,
    ActivitiesComponent,

  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    FormsModule,
    NgSelectModule,
    NgOptimizedImage,
  ],
  providers: [
    DatePipe,
    { provide: LocationStrategy, useClass: HashLocationStrategy }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
