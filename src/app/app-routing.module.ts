import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { PersonalDocumentComponent } from './personal-document/personal-document.component';
import { CompanyDocumentComponent } from './company-document/company-document.component';
import {DesignationComponent} from "./designation/designation.component";
import {DepartmentComponent} from "./department/department.component";
import {BloodGroupComponent} from "./blood-group/blood-group.component";
import {GenderComponent} from "./gender/gender.component";
import {RelationComponent} from "./relation/relation.component";
import {MaritalStatusComponent} from "./marital-status/marital-status.component";
import {UploadAttendanceComponent} from "./upload-attendance/upload-attendance.component";
import {SalaryComponent} from "./salary/salary.component";
import { ReportComponent } from './report/report.component';
import { ChatComponent } from './chat/chat.component';
import { NotificationComponent } from './notification/notification.component';
import { EmployeeDirectoryComponent } from './employee-directory/employee-directory.component';
import {DocumentTypeComponent} from "./document-type/document-type.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'employee-dashboard', component: EmployeeDashboardComponent },
  { path: 'all-employee', component: AllEmployeesComponent },
  { path: 'attendence-admin', component: AttendenceAdminComponent },
  { path: 'attendence-employee', component: AttendenceEmployeeComponent },
  { path: 'leaves-admin', component: LeavesAdminComponent },
  { path: 'leaves-employee', component: LeavesEmployeeComponent },
  { path: 'empolyee-salary', component: EmployeeSalaryComponent },
  { path: 'payslip', component: PayslipComponent },
  { path: 'employees-list', component: EmployeesListComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'activities', component: ActivitiesComponent },
  { path: 'personal-document', component: PersonalDocumentComponent },
  { path: 'company-document', component: CompanyDocumentComponent },
  {path:'designation', component:DesignationComponent},
  {path:'department', component:DepartmentComponent},
  {path:'blood-group', component:BloodGroupComponent},
  {path:'document-type', component:DocumentTypeComponent},
  {path:'gender', component:GenderComponent},
  {path:'relation', component:RelationComponent},
  {path:'marital-status', component:MaritalStatusComponent},
  {path:'upload-attendance', component:UploadAttendanceComponent},
  {path:'upload-salary', component:SalaryComponent},
  {path:'report', component:ReportComponent},
  {path:'chat', component:ChatComponent},
  {path: 'notification', component:NotificationComponent},
  {path: 'employee-directory', component:EmployeeDirectoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
