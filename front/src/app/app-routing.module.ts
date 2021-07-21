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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: StudentRegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'students', component: AllStudentsComponent },

  { path: 'students/:_id', component: StudentProfileComponent },
  { path: 'pay/:_id', component: StudentPaymentComponent },

  { path: 'datatable', component: DatatableComponent },
  { path: 'admintable', component: AdminDataTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
