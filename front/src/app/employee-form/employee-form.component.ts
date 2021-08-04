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
  states = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Dadra and Nagar Haveli',
    'Daman and Diu',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Orissa',
    'Puducherry',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
  ];

  constructor(private _auth: AuthService, private _fb: FormBuilder) {}
  employeeForm = this._fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    gender: ['male', Validators.required],
    dob: ['', Validators.required],
    highestQualification: ['', Validators.required],
    skillSet: ['HTML,CSS,JS,PYTHON,C#,JAVA', Validators.required],
    state: ['', Validators.required],
    district: ['', Validators.required],
    post: ['', Validators.required],
    pinCode: ['', Validators.required],
    password: ['', Validators.required],
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
