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
    this._studentService.fetchStudents().subscribe((data) => {
      this.Students = JSON.parse(JSON.stringify(data));
    });
  }

  onApprove(id, Course, Email) {
    forkJoin([
      this._http.post(`http://localhost:3000/students/${id}/approve`, {
        Student: { Email: `${Email}`, Course: `${Course}` },
      }),
      this._http.put(`http://localhost:3000/students/${id}`, {
        Student: { ApprovalDate: new Date() },
      }),
    ])
      .pipe(tap(console.log))
      .subscribe();
  }
}
