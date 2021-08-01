import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { Router } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { AuthGuard } from './auth.guard';
import { CommonModule } from '@angular/common';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';

import { StudentProfileComponent } from './student-profile/student-profile.component';
import { AdminDataTableComponent } from './admin-data-table/admin-data-table.component';
import { AllStudentsComponent } from './all-students/all-students.component';
import { StudentPaymentComponent } from './student-payment/student-payment.component';
import { FooterComponent } from './footer/footer.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CoursesComponent } from './courses/courses.component';
import { ErrorsComponent } from './Errors/errors.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { LoginEmployeeComponent } from './login-employee/login-employee.component';
import { ResetEmpPasswordComponent } from './reset-emp-password/reset-emp-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentRegisterComponent,
    NavHeaderComponent,
    HomeComponent,
    FooterComponent,
    StudentProfileComponent,
    SafePipe,
    
    AdminDataTableComponent,
    AllStudentsComponent,
    StudentPaymentComponent,
    ResetPasswordComponent,
    CoursesComponent,
    EmployeeFormComponent,
    LoginEmployeeComponent,
    ResetEmpPasswordComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
