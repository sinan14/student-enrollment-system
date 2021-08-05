

import  Swal from 'sweetalert2';
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
  isLoading:boolean = false;
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
    this.isLoading=true;
    this._studentService.fetchStudents().subscribe((data) => {
      this.isLoading = false;
      this.Students = JSON.parse(JSON.stringify(data));
    },(error) => {
      this.isLoading = false;
      Swal.fire({title:'error!!!🤦‍♂️🤦‍♂️🤦‍♂️',text:'server refused to connect',timer:800, icon:'error',showConfirmButton:false})
    }
    );
  }

  onApprove(id, Course, Email) {
    this.isLoading = true;
    forkJoin([
      this._http.post(`http://localhost:3000/students/${id}/approve`, {
        Student: { Email: `${Email}`, Course: `${Course}` },
      }),
      this._http.put(`http://localhost:3000/students/${id}`, {
        Student: { ApprovalDate: new Date() },
      }),
    ])
      .pipe(tap(console.log))
      .subscribe((response)=>{
        this.isLoading = false;
        Swal.fire({title:'Good',text:'😀😀',icon:'success',timer:500,showConfirmButton:false})

      },(errorMessage)=>{
        this.isLoading = false;
        Swal.fire({title:'🤦‍♂️🤦‍♂️🤦‍♂️🤦‍♂️',text:'server refused to respond',timer:500})
      });
  }
}
