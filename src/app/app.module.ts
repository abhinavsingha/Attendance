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
import {ChunkPipe} from "./services/common/chunk.pipe";
import {EpochToDatePipe} from "./services/common/epochToDate.pipe";
import { PersonalDocumentComponent } from './personal-document/personal-document.component';
import { CompanyDocumentComponent } from './company-document/company-document.component';
import { FilesizePipe } from './filesize.pipe';
import { DesignationComponent } from './designation/designation.component';
import { DepartmentComponent } from './department/department.component';
import { GenderComponent } from './gender/gender.component';
import { MaritalStatusComponent } from './marital-status/marital-status.component';
import { RelationComponent } from './relation/relation.component';
import { BloodGroupComponent } from './blood-group/blood-group.component';
import {UploadAttendanceComponent} from "./upload-attendance/upload-attendance.component";
import {SalaryComponent} from "./salary/salary.component";
import { ReportComponent } from './report/report.component';
import { ChatComponent } from './chat/chat.component';
import { NotificationComponent } from './notification/notification.component';
import {KeyValuePipe} from "./services/common/keyValue.pipe";
import {ToastModule} from "primeng/toast";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [
    ChunkPipe,
    KeyValuePipe,
    EpochToDatePipe,
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
    PersonalDocumentComponent,
    CompanyDocumentComponent,
    FilesizePipe,
    DesignationComponent,
    DepartmentComponent,
    GenderComponent,
    MaritalStatusComponent,
    RelationComponent,
    BloodGroupComponent,
    UploadAttendanceComponent,
    SalaryComponent,
    ReportComponent,
    ChatComponent,
    NotificationComponent,


  ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
    }),
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
    AllEmployeesComponent,
    DatePipe,
    { provide: LocationStrategy, useClass: HashLocationStrategy }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
