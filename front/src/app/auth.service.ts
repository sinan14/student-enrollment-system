import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  constructor(private _http: HttpClient) {}
  //*************** register employee and student ***************/

  registerUser(item: any) {
    return this._http.post('http://localhost:3000/students/register', {
      user: item,
    });
  }
  registerEmployee(item: any) {
    return this._http.post('http://localhost:3000/employee/register', {
      user: item,
    });
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
