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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: StudentRegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'students', component: AllStudentsComponent },

  { path: 'students/:_id', component: StudentProfileComponent },

  { path: 'datatable', component: DatatableComponent },
  { path: 'admintable', component: AdminDataTableComponent },
  { path: 'pay', component: StudentPaymentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
