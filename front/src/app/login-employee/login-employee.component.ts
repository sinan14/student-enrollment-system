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
    this.isLoading = true;
    this._auth.loginEmployee(this.emploginForm.value).subscribe(
      (response) => {
        this.isLoading = false;
        if (response.status) {
          this.isLoading = false;
          const id = response.id;

          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('navigator', response.id);
          if (response.Name == 'Admin') {
            const Name = 'Admin';
            localStorage.setItem('Name', 'Admin');
            Swal.fire({
              title: `welcome ${Name}  🙏🏻🙏🏻🙏🏻`,
              icon: 'success',
              timer: 600,
              showConfirmButton: false,
            }).then(() => {
              this._router.navigate(['/admin-panel']);
            });
          }

          if (response.Name != 'Admin') {
            localStorage.setItem('Name', response.Name);
            const Name = response.Name;
            Swal.fire({
              title: `welcome ${Name}  🥰`,
              icon: 'success',
              timer: 600,
              showConfirmButton: false,
            }).then(() => {
              this._router.navigate([`/employee-panel}`]);
            });
          }
        } else {
          this.isLoading = false;
          Swal.fire('Warning!!', 'User not found🤷‍♂️🤷‍♂️🤷‍♀️!', 'error').then(
            (refresh) => {
              this.emploginForm.reset();
            }
          );
        }
      },
      (errorMessage) => {
        this.isLoading = false;

        Swal.fire({
          title: '🤦‍♂️🤦‍♂️🤦‍♂️warning!!',
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
