import Swal from 'sweetalert2';
import { StudentServiceService } from './../student.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css'],
})
export class AllStudentsComponent implements OnInit {
  isLoading: boolean = false;
  backendUrl = '/api';
  // backendUrl = 'http://localhost:3000';

  Students = [
    {
      _id: '',
      Name: '',
      Email: '',
      Phone: '',
      Sex: '',
      DOB: '',
      Course: '',
      HighestQualification: '',
      PassOutYear: '',
      SkillSet: '',
      EmploymentStatus: '',
      State: '',
      District: '',
      Post: '',
      PinCode: '',
      Status: '',
      PaymentDate: '',
      ApprovalDate: '',
      CreationDate: '',
    },
  ];

  constructor(
    private _http: HttpClient,
    private router: Router,
    private _studentService: StudentServiceService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this._studentService.fetchStudents().subscribe(
      (data) => {
        this.isLoading = false;
        this.Students = JSON.parse(JSON.stringify(data));
      },
      (error) => {
        this.isLoading = false;
        Swal.fire({
          title: 'error!!!🤦‍♂️🤦‍♂️🤦‍♂️',
          text: 'server refused to connect',
          timer: 800,
          icon: 'error',
          showConfirmButton: false,
        });
      }
    );
  }

  onApprove(id, Course, Email) {
    this.isLoading = true;
    forkJoin([
      this._http.post(`${this.backendUrl}/students/${id}/approve`, {
        Student: { Email: `${Email}`, Course: `${Course}` },
      }),
      this._http.put(`${this.backendUrl}/students/${id}`, {
        Student: { ApprovalDate: new Date(), Status: `payment remaining` },
      }),
    ])
      .pipe(tap(console.log))
      .subscribe(
        (response: any) => {
          this.isLoading = false;
          this.ngOnInit();
          Swal.fire({
            title: 'Approved',
            text: '😀😀',
            icon: 'success',
            timer: 500,
            showConfirmButton: false,
          });
        },
        (errorMessage) => {
          this.isLoading = false;
          Swal.fire({
            title: '🤦‍♂️🤦‍♂️🤦‍♂️🤦‍♂️',
            text: 'server refused to respond',
            timer: 500,
          });
        }
      );
  }
}
