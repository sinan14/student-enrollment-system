import { NewdatatableComponent } from './newdatatable/newdatatable.component';
import { StudentsGuard } from './students.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ResetEmpPasswordComponent } from './reset-emp-password/reset-emp-password.component';
import { ErrorsComponent } from './Errors/errors.component';
import { StudentPaymentComponent } from './student-payment/student-payment.component';
import { AllStudentsComponent } from './all-students/all-students.component';
import { AdminDataTableComponent } from './admin-data-table/admin-data-table.component';
import { DatatableComponent } from './datatable/datatable.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { LoginComponent } from './login/login.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CoursesComponent } from './courses/courses.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { LoginEmployeeComponent } from './login-employee/login-employee.component';

const routes: Routes = [
  { path: '', component: HomeComponent,pathMatch: 'full' },
  {path:'home',component:HomeComponent},
  { path: 'courses', component: CoursesComponent },
  { path: 'register', component: StudentRegisterComponent },
  {path:'employeeregister',component:EmployeeFormComponent},
  { path: 'login', component: LoginComponent },
  {path:'employeelogin',component:LoginEmployeeComponent},
  { path: 'resetPassword', component: ResetPasswordComponent },
  {path:'resetEmployeePassword',component:ResetEmpPasswordComponent},
  { path: 'students', component: AllStudentsComponent },

  { path: 'students/:_id',canActivate:[StudentsGuard], component: StudentProfileComponent,pathMatch: 'full' },
  { path: 'students/:_id/pay', component: StudentPaymentComponent },

  { path: 'studentstable', component: DatatableComponent },
  {path:'new',component:NewdatatableComponent},
  { path: 'admintable', component: AdminDataTableComponent },
  {path:'error',component:ErrorsComponent,},
  {path: '**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
