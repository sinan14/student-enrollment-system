import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    },
  ];

  constructor(private http: HttpClient, private router: Router) {}
  getStudents() {
    return this.http.get('http://localhost:3000/students');
  }
  ngOnInit(){
    this.getStudents().subscribe((data)=>{
      this.Students = JSON.parse(JSON.stringify(data));
    })
  }
  onSendEmail(id) {
    console.log(id);
    return this.http.get('http://localhost:3000/sendmail/' + id).subscribe((data) => {
        // console.log(data);
      });
  }
}
