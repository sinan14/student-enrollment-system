import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isLoading: boolean=false;
  passwordReg =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
  emailReg = /^[a-z0-9.%+]+@[a-z09.-]+.[a-z]{2,4}/;
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _fb: FormBuilder
  ) {}


  loginForm = this._fb.group({
    Email: ['', [Validators.pattern(this.emailReg), Validators.required]],
    Password: ['', [Validators.pattern(this.passwordReg), Validators.required]],
  });

  loginUser() {
    this.isLoading = true;
    this._auth.loginUser(this.loginForm.value).subscribe(
      (response) => {
        this.isLoading = false;
        if (response.status) {
          this.isLoading = false;

          const id = response.id;
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          this._router.navigate([`/students/${id}`]);
        } else {
          this.isLoading=false;
          Swal.fire('Warning!!', 'User not found!', 'error').then((refresh) => {
            this.loginForm.reset();
          });
        }
      },
      (error) => {
        this.isLoading = false;
        Swal.fire({
          title: 'internal error',
          text: 'server failed to respond',
          timer: 1500,
          icon: 'error',
        });
      }
    );
  }
}
