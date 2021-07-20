import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css'],
})
export class AllStudentsComponent implements OnInit {
  Students = [{
    Id: '',
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
    Pincode: '',
  }];

  constructor(private http:HttpClient) {}
  getStudents(){
    return this.http.get("http://localhost:3000/students");
  }

  ngOnInit(): void {
    this.getStudents().subscribe((data)=>{
      
      this.Students=JSON.parse(JSON.stringify(data));
      console.log(this.Students)
  })
  }
}
