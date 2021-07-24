import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
})
export class StudentProfileComponent implements OnInit {
  Student = {
    _id: '',
    Name: '',
    Email: '',
    Phone: '',
    State: '',
    HighestQualification: '',
    PassOfYear: '',
    SkillSet: '',
    EmploymentStatus: '',
    Course: '',
    DOB: '',
    // Year: '',
  };
  id: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  readonly: boolean = true;
  update() {
    this.readonly = !this.readonly;
  }
  editProfile(item: any) {
    return this.http
      .put(`http://localhost:3000/students/${this.id}`, { Student: item })
      .subscribe((data) => {
        console.log(data);
      });
  }
  updateProfile() {
    this.editProfile(this.Student);
    this.router.navigate([`/students/${this.id}`]);
    this.readonly = !this.readonly;
    window.location.reload();
  }

  discard() {
    this.readonly = !this.readonly;
  }
  getStudentById() {
    return this.http.get<any>(`http://localhost:3000/students/${this.id}`);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['_id'];
    console.log(`param is ${this.id}`);
    // the id is the one we specified in our routing module
    this.getStudentById().subscribe((data: any) => {
      this.Student = JSON.parse(JSON.stringify(data));
      console.log(this.Student);
    });
  }

  destroyProfile() {
    return this.http.delete(`http://localhost:3000/students/${this.id}`);
  }
  deleteProfile() {
    this.deleteProfile();
    this.router.navigate(['/books']);
  }
}
