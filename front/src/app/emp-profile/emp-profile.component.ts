import { AuthService } from './../auth.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-emp-profile',
  templateUrl: './emp-profile.component.html',
  styleUrls: ['./emp-profile.component.css'],
})
export class EmpProfileComponent implements OnInit {
  id: string;
  phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  passwordReg =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
  emailReg = /^[a-z0-9.%+]+@[a-z09.-]+.[a-z]{2,4}/;
  showEditButton: boolean;
  showDeleteButton: boolean;
  readonly: boolean;
  update(): void {
    this.readonly = !this.readonly;
  }
  discard(): void {
    this.readonly = !this.readonly;
    this.ngOnInit();
  }
  isAllowedToEdit(): void {
    if (
      this._auth.loggedIn() &&
      (this._auth.getUser() == 'admin' || this._auth.getUser() == 'employee')
    ) {
      console.log('true');
      this.showEditButton = true;
    } else {
      this.showDeleteButton = false;
    }
  }

  isAdmin(): void {
    if (this._auth.loggedIn() && this._auth.getUser() == 'admin') {
      this.showDeleteButton = true;
    } else {
      this.showDeleteButton = false;
    }
  }

  employeeUpdateForm: FormGroup;
  employee = {
    _id: '',
    Name: '',
    Email: '',
    Phone: '',
    Gender: '',
    DOB: '',
    HighestQualification: '',
    SkillSet: '',
    State: '',
    District: '',
    Post: '',
    PinCode: '',
    PassOfYear: '',
    Password: '',
  };

  constructor(
    private _http: HttpClient,
    private _ActivatedRoute: ActivatedRoute,
    private _router: Router,
    private _employeeService: EmployeeService,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this.isAllowedToEdit();
    this.isAdmin();
    this.readonly = true;
    this.id = this._ActivatedRoute.snapshot.params['_id'];

    this.getStudentById().subscribe(
      (employeesData: any) => {
        console.log(employeesData);
        if (employeesData.error) {
          this._router.navigate(['/error'], { state: employeesData });
        }

        this.employee = JSON.parse(JSON.stringify(employeesData));
        this.employeeUpdateForm = new FormGroup({
          Sex: new FormControl(this.employee.Gender, [Validators.required]),
          Name: new FormControl(this.employee.Name, [Validators.required]),
          Email: new FormControl(this.employee.Email, [
            Validators.required,
            Validators.pattern(this.emailReg),
          ]),
          Phone: new FormControl(this.employee.Phone, [
            Validators.required,
            Validators.pattern(this.phoneReg),
          ]),
          State: new FormControl(this.employee.State, [Validators.required]),
          HighestQualification: new FormControl(
            this.employee.HighestQualification,
            [Validators.required]
          ),
          PassOfYear: new FormControl(this.employee.PassOfYear, [
            Validators.required,
            Validators.min(2010),
            Validators.max(2023),
          ]),
          SkillSet: new FormControl(this.employee.SkillSet, [
            Validators.required,
          ]),

          DOB: new FormControl(this.employee.DOB, [Validators.required]),
          Password: new FormControl(this.employee.Password, [
            Validators.required,
            Validators.pattern(this.passwordReg),
          ]),
        });
      },
      (errorMessage) => {
        this._router.navigate([`/employee`]);
        Swal.fire('danger!!', 'some internal error', 'error').then(
          (refresh) => {
            this._router.navigate([`/`]);
          }
        );
      }
    );
  }
  editProfile(changedDetails) {
    return this._http.put(
      `http://localhost:3000/employee/${this.employee._id}`,

      changedDetails
    );
  }
  updateProfile() {
    this.editProfile(this.employeeUpdateForm.value).subscribe(
      (employeesData: any) => {
        if (employeesData.error) {
          Swal.fire({
            title: 'warning!!',
            text: 'something went wrong',
            icon: 'error',
            timer: 500,
            showConfirmButton: false,
          }).then((refresh) => {
            this.readonly = !this.readonly;
            this._router.navigate(['/error'], { state: employeesData });
          });
        }
        Swal.fire({
          title: 'Good Job!!',
          text: 'profile updated successfully',
          icon: 'success',
          timer: 500,
          showConfirmButton: false,
        }).then((refresh) => {
          this.readonly = !this.readonly;
          this.ngOnInit();
        });
      },
      (errorMessage) => {
        Swal.fire({
          title: 'danger!!',
          text: 'some internal error',
          icon: 'error',
          timer: 1000,
          showConfirmButton: false,
        }).then((refresh) => {
          this.readonly = !this.readonly;
        });
      }
    );
  }

  //***************************************don't touch */

  getStudentById() {
    return this._http.get<any>(`http://localhost:3000/employee/${this.id}`);
  }

  deleteProfile() {
    return this._http
      .delete(`http://localhost:3000/employee/${this.employee._id}`)
      .subscribe(
        (employeesData) => {
          this._router.navigate([`/employee`]);
        },
        (errorMessage) => {
          Swal.fire('danger!!', 'some internal error', 'error').then(
            (refresh) => {}
          );
        }
      );
  }
}
