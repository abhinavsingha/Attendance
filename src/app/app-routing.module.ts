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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
