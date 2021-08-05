import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-employee',
  templateUrl: './login-employee.component.html',
  styleUrls: ['./login-employee.component.css'],
})
export class LoginEmployeeComponent implements OnInit {
  isLoading: boolean = false;
  error: string = null;
  passwordReg = /^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/;
  emailReg = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.([a-z]{3})+(\.([a-z]{2,}))?$/;
  empReg = /emp/gi;
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _fb: FormBuilder
  ) {}

  ngOnInit() {}
  emploginForm = this._fb.group({
    Email: ['', [Validators.pattern(this.emailReg), Validators.required]],
    Password: ['', [Validators.pattern(this.passwordReg), Validators.required]],
    emp: ['', [Validators.required, Validators.pattern(this.empReg)]],
  });

  loginUser() {
    if (!this.emploginForm.valid) {
      return;
    }
    // console.log(this.emploginForm);
    this.isLoading = true;
    this._auth.loginEmployee(this.emploginForm.value).subscribe(
      (response) => {
        this.isLoading = false;

        if (response.status) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          // console.log(response.id)
          this._router.navigate([`/`]);
        } else {
          Swal.fire().then((refresh) => {
            this.emploginForm.reset({
              title: 'warning!!',
              showConfirmButton: false,
              timer: 1000,
              text: 'user not found',
              icon: 'error',
            });
          });
        }
      },
      (errorMessage) => {
        this.isLoading = false;

        Swal.fire({
          title: 'warning!!',
          showConfirmButton: false,
          timer: 1000,
          text: 'some internal error',
          icon: 'error',
        }).then(() => {
          this.emploginForm.reset();
        });
      }
    );
  }
}
