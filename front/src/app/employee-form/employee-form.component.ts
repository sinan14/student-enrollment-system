import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent {
  
  emailReg = /^[a-z0-9.%+]+@[a-z09.-]+.[a-z]{2,4}/;
  phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;


  constructor(private _auth: AuthService, private _fb: FormBuilder) {}
  employeeForm = this._fb.group({
    Name: ['', Validators.required],
    Email: ['', Validators.required],
    Phone: ['', Validators.required],
    Gender: ['Male', Validators.required],
    DOB: ['', Validators.required],
    HighestQualification: ['', Validators.required],
    SkillSet: ['HTML,CSS,JS,PYTHON,C#,JAVA'],
    State: ['', Validators.required],
    District: ['', Validators.required],
    Post: ['', Validators.required],
    PinCode: ['', Validators.required],
    Password: ['sinan@66A', Validators.required],
    PassOfYear:['',[Validators.required,Validators.min(2000),Validators.max(2020)]]
  });

  registerEmployee() {
    // if (this.employeeForm.invalid) {
    //   return;
    // }
    console.log(this.employeeForm);
    this._auth.registerEmployee(this.employeeForm.value).subscribe(
      (response) => {
        if (response) {
          Swal.fire({
            title: 'Good Job',
            timer: 1000,
            text: 'successfully registered',
            icon: 'success',
          }).then(() => {
            this.employeeForm.reset();
          });
        } else {
          Swal.fire({
            title: 'Oops...',
            timer: 1500,
            text: 'Something went wrong!',
            icon: 'error',
          }).then(() => {
            this.employeeForm.reset();
          });
        }
      },
      (errorMessage) => {
        Swal.fire({
          title: 'warning!!',
          showConfirmButton: false,
          timer: 1000,
          text: 'some internal error',
          icon: 'error',
        }).then(() => {
          this.employeeForm.reset();
        });
      }
    );
  }

  //******************************************************************** */
}
