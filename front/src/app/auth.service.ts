import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class AuthService {
  constructor(private _http: HttpClient,private _router:Router) {}
  //*************** register employee and student ***************/
  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('role')
    // localStorage.clear()
    Swal.fire('we will miss you').then(() => {
      this._router.navigate(['/login']);
    });
  }

  registerUser(StudentDetails: any) {
    return this._http.post('http://localhost:3000/students/register', StudentDetails);
  }
  registerEmployee(EmployeeDetails: any) {
    return this._http.post('http://localhost:3000/employee/register', EmployeeDetails);
  }

  //************************** login employee and student *******************/

  loginUser(user: any) {
    return this._http.post<any>('http://localhost:3000/students/login', user);
  }
  loginEmployee(user: any) {
    return this._http.post<any>('http://localhost:3000/employee/login', user);
  }

  //************************** reset employee and student password  ********************/

  resetStudentPassword(user: any) {
    return this._http.put<any>('http://localhost:3000/students/reset', user);
  }
  resetEmployeePassword(user: any) {
    return this._http.put<any>('http://localhost:3000/employee/reset', user);
  }

  //************************** checking authentication  *******************/

  loggedIn() {
    return !!localStorage.getItem('token');
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getUser() {
    return localStorage.getItem('role');
  }
}
