import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AllEmployeesComponent } from './All-empleyees/all-employees.component';
// import { DatatableComponent } from './datatable/datatable.component';
import { AuthGuard } from './auth.guard';
import { StudentsGuard } from './students.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ResetEmpPasswordComponent } from './reset-emp-password/reset-emp-password.component';
import { ErrorsComponent } from './Errors/errors.component';
import { StudentPaymentComponent } from './student-payment/student-payment.component';
import { AllStudentsComponent } from './all-students/all-students.component';
// import { AdminDataTableComponent } from './admin-data-table/admin-data-table.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { LoginComponent } from './login/login.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { LoginEmployeeComponent } from './login-employee/login-employee.component';
import { NewdatatableComponent } from './newdatatable/newdatatable.component';
import { EmpProfileComponent } from './emp-profile/emp-profile.component';
// import { }
const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};
const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {path:'admin-panel',component:AdmindashboardComponent},
  { path: 'home', component: HomeComponent },
  { path: 'register', component: StudentRegisterComponent },
  { path: 'employeeregister', component: EmployeeFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'employeelogin', component: LoginEmployeeComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'resetEmployeePassword', component: ResetEmpPasswordComponent },
  { path: 'students', component: NewdatatableComponent },

  {
    path: 's',

    component: AllStudentsComponent,
  },
  {
    path: 'students/:_id',
    component: StudentProfileComponent,
    pathMatch: 'full',
  },
  { path: 'students/:_id/pay', component: StudentPaymentComponent },
  // { path: 'admintable', component: AdminDataTableComponent },
  { path: 'employees', component: AllEmployeesComponent },
  { path: 'employees/:_id', component: EmpProfileComponent },
  { path: 'error', component: ErrorsComponent },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
